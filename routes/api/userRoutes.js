const router = require("express").Router();

const authController = require("../../controllers/api/authControllers");

router.post("/signup", authController.signup);
router.post("/signin", authController.signin);

module.exports = router;
