const router = require("express")()
const logic = require("../controller/team")

router.post("/invite", logic.inquiryTeam)
router.get("/inquiry", logic.inquiryTeam)
router.post("/create", logic.createTeam)