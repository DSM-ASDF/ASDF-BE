const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/user");

const signup = async (req, res) => {
  const { name, email, accountId, password, profile } = req.body;

  try {
    const existingUser = await User.findOne({
      where: { accountId },
    });
    if (existingUser) {
      return res.status(409).send("이미 가입된 아이디입니다.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      accountId,
      password: hashedPassword,
      profile,
    });

    return res.status(201).json({
      id: newUser.userId,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("회원가입 중 오류가 발생했습니다.");
  }
};

const login = async (req, res) => {
  try {
    const { accountId, password } = req.body;

    const foundUser = await User.findOne({
      where: { accountId },
    });

    if (!foundUser) {
      return res.status(404).send("가입되어 있지 않은 아이디입니다.");
    }

    const isMatch = await bcrypt.compare(password, foundUser.password);
    if (!isMatch) {
      return res.status(400).send("비밀번호가 틀렸습니다.");
    }

    const accessToken = jwt.sign(
      { id: foundUser.userId },
      process.env.SECRET_OR_PRIVATE,
      {
        algorithm: "HS256",
        expiresIn: "1h",
      }
    );

    return res.status(200).json({
      id: foundUser.userId,
      accessToken: accessToken,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).send("로그인 중 오류가 발생했습니다.");
  }
};

const logout = async (req, res) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(401).json({
        error: "Authorization header가 없습니다.",
      });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        error: "토큰이 없습니다.",
      });
    }
    const key = process.env.SECRET_OR_PRIVATE;
    const decoded = jwt.verify(token, key);
    const { id } = decoded;

    if (!id) {
      return res.status(401).json({
        error: "토큰에 유효한 ID가 포함되어 있지 않습니다.",
      });
    }

    const thisUser = await User.findOne({ where: { userId: id } });

    if (thisUser.accessToken === null) {
      return res.status(200).send("이미 로그아웃 상태입니다.");
    }

    const [affectedRows] = await User.update(
      { accessToken: null },
      { where: { userId: id } }
    );

    if (affectedRows === 0) {
      return res.status(500).send("토큰이 삭제되지 않았습니다.");
    }

    return res.status(200).send("로그아웃이 되었습니다");
  } catch (e) {
    console.error(e);
    return res.status(500).send("로그아웃 중 오류가 발생했습니다.");
  }
};

module.exports = {
  signup,
  login,
  logout,
};
