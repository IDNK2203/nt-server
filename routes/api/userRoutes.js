const router = require("express").Router();

const userController = require("../../controllers/api/authControllers");

router.post("/signup", userController.signup);

module.exports = router;
