const { User, Team } = require("../model");
const sendEmail = require("../utils/sendEmail");

const inviteMember = async (req, res) => {
  try {
    const { email } = req.body;

    const exist = User.findAll({
      where: email,
    });

    if (exist) {
      return res.status(409).send("이미 초대가 발송된 사용자입니다.");
    }

    const inviteLink = `https://yourapp.com/invite/${teamId}/${email}/accept`;
    const rejectLink = `https://yourapp.com/invite/${teamId}/${email}/reject`;

    const emailContent = `
      안녕하세요. 팀에 초대가 되었습니다.
      <a href="${inviteLink}">수락</a>
      <a href="${rejectLink}">거절</a>
    `;

    await sendEmail({
      to: email,
      subject: "팀에 초대가 되었습니다.",
      text: emailContent,
    });
    res.status(200).send("초대 이메일이 성공적으로 발송되었습니다.");
  } catch (error) {
    res
      .status(500)
      .json({ error: "팀원 초대 이메일 발송 중 오류가 발생하였습니다." });
  }
};

const acceptInvite = async (req, res) => {
  const { teamId, email } = req.body;
  try {
    const team = await Team.findByPk(teamId);
    if (!team) {
      return res.status(404).send("해당 팀을 찾을 수 없습니다.");
    }

    const user = await User.findAll({
      where: { email },
    });
    if (!user) {
      return res.status(404).send("해당 사용자를 찾을 수 없습니다.");
    }

    await team.addUser(user);
    res.status(200).send("초대가 수락되어 팀에 추가되었습니다.");
  } catch (error) {
    res.status(500).send("초대 수락 중 오류가 발생하였습니다.");
  }
};

const rejectInvite = async (req, res) => {
  const { teamId, email } = req.body;
  try {
    res.status(200).send("초대가 거절되었습니다.");
  } catch (error) {
    res.status(500).send("초대 거절 중 오류가 발생하였습니다.");
  }
};

module.exports = {
  inviteMember,
  acceptInvite,
  rejectInvite
}