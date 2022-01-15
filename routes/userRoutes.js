const router = require("express").Router();

const userController = require("../controllers/authControllers");

router.post("/signup", userController.signup);

module.exports = router;
