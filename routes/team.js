const Team = require("../model/team");

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

module.exports = {
  inquiryTeam,
  createTeam,
};
