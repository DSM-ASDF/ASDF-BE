const router = require("express")();
//()가 router 객체를 생성
const logic = require("../routes/user");

router.post("/signup", logic.signup);
router.post("/login", logic.login);
router.delete("/logout", logic.logout);

module.exports = router;
