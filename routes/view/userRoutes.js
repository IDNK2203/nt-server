const router = require("express").Router();

const userController = require("../../controllers/view/authControllers");

router.get("/signup", userController.signup);
router.get("/profile", userController.profile);

module.exports = router;
