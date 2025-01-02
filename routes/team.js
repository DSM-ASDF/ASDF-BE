const router = require("express")()
const logic = require("../controller/team")

router.get("/inquiry", logic.inquiryTeam)
router.post("/create", logic.createTeam)
router.delete("/delete", logic.deleteTeam)
router.post("/invite", logic.inviteMember);
router.post("/accept", logic.acceptInvite);
router.post("/reject", logic.rejectInvite);
router.delete("/leave/:teamId/:userId", logic.leaveTeam)