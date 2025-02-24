const { questionService } = require("../services");

const createQuestion = async (request, response) => {
    try {
      if (!request.body) {
        return response.status(400).json({ message: "Question data required" });
      }
      const question = await questionService.createQuestion(request.body);
      response.status(201).json(question);
    } catch (error) {
      response.status(400).json({ message: error.message });
    }
}

const getQuestions = async (request, response) => {
    try {
      const questions = await questionService.get(request.query);
      response.status(200).json(questions);
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
}

module.exports = {
  createQuestion,
  getQuestions,
};