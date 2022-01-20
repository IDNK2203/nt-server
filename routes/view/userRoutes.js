const router = require("express").Router();

const authControllers = require("../../controllers/view/authControllers");
const authControllersApi = require("../../controllers/api/authControllers");
const userControllers = require("../../controllers/view/userControllers");

router.get("/signup", authControllers.signup);
router.get("/signin", authControllers.signin);
router.get("/profile", authControllersApi.protect, userControllers.profile);

module.exports = router;
