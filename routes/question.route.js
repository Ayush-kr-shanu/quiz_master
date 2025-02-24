const express = require("express");
const { questionController } = require("../controllers");
const auth = require("../middlewares/auth");

const router = express.Router();

router.use(auth);

router.post("/", questionController.createQuestion);
router.get("/", questionController.getQuestions);

module.exports = router;