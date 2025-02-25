const { userAnswerService } = require("../services");
const { userDetail } = require("../utils/helper");

const addAnswer = async (request, response) => {
  try {
    const { questionId, selectedAnswer } = request.body;
    const userId = userDetail(request.headers.authorization)

    if (!questionId || !userId || !selectedAnswer) {
      return response.status(400).json({ message: "Missing required fields" });
    }
    const result = await userAnswerService.submitAnswer(userId, request.body);
    response.status(201).json(result);
  } catch (error) {
    response.status(400).json({ message: error.message });
  }
};

const getAnswer = async (request, response) => {
  try {
    const userId = userDetail(request.headers.authorization)
    if (!userId) {
      return response.status(400).json({ message: "Missing required fields" });
    }
    const result = await userAnswerService.submittedQuestion(request.query, userId);
    response.status(200).json(result);
  } catch (error) {
    response.status(400).json({ message: error.message });
  }
};

module.exports = {
  addAnswer,
  getAnswer,
};
