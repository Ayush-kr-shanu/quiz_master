const mongoose = require("mongoose");
const { Question, Category } = require("../models");

const createQuestion = async (questionData) => {
  const question = new Question(questionData);
  await question.save();
  return question;
};

const get = async (params) => {
  const { categoryId, categoryName, questionId } = params;
  const categories = await Category.aggregate([
    {
      $match: {
        ...(categoryId && { _id: new mongoose.Types.ObjectId(questionId) }),
        ...(categoryName && { name: { $regex: categoryName, $options: "i" } }),
      },
    },
    {
      $lookup: {
        from: "questions",
        localField: "_id",
        foreignField: "categories",
        as: "questions",
        pipeline: [
          {
            $match: {
              ...(questionId && {
                _id: new mongoose.Types.ObjectId(questionId),
              }),
            },
          },
        ],
      },
    },
    {
      $match: { questions: { $ne: [] } },
    },
    {
      $addFields: {
        questionCount: { $size: "$questions" },
      },
    },
  ]);
  return categories;
};

module.exports = {
  createQuestion,
  get,
};
