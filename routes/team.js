const router = require("express")()
const logic = require("../controller/team")

router.get("/inquiry", logic.inquiryTeam)
router.post("/create", logic.createTeam)
router.delete("/delete", logic.deleteTeam)