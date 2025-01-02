const Team = require("../model/team");
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

    const emailContent = `안녕하세요. 팀에 초대가 되었습니다.`;

    await sendEmail({
      to: email,
      subject: "팀에 초대가 되었습니다.",
      text: emailContent,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "팀원 초대 이메일 발송 중 오류가 발생하였습니다." });
  }
};

const inquiryTeam = async (req, res) => {
  try {
    const teams = await Team.findAll();

    if (!teams || teams.length === 0) {
      return res.status(404).send("소속된 팀이 없습니다.");
    }

    res.status(200).json(teams);
  } catch (error) {
    res.status(500).json({ error: "팀을 찾지 못하였습니다." });
  }
};

const createTeam = async (req, res) => {
  const { teamName, teamOwner } = req.body;

  try {
    const existTeam = await Team.findOne({
      where: { teamName },
    });
    if (existTeam) {
      return res
        .status(409)
        .send("이미 존재하는 팀입니다. 다른 이름으로 생성해주세요.");
    }
    const newTeam = await Team.create({
      teamName,
      teamOwner,
    });

    return res.status(201).json({
      message: "팀이 성공적으로 생성되었습니다!",
      id: newTeam.teamId,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("팀 생성 중 오류가 발생하였습니다.");
  }
};

const deleteTeam = async (req, res) => {
  try {
    const { teamId } = req.params;
    const team = await Team.findByPk(teamId);

    if (!team) {
      return res.status(404).send("해당하는 팀을 찾을 수 없습니다.");
    }

    await team.destroy();
    res.status(204).send("팀이 성공적으로 삭제되었습니다.");
  } catch (error) {
    console.error(error);
    return res.status(500).send("팀 삭제 중 오류가 발생했습니다.");
  }
};

module.exports = {
  inviteMember,
  inquiryTeam,
  createTeam,
  deleteTeam,
};
