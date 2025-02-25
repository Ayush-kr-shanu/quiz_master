const mongoose = require("mongoose");
const { Question, Category } = require("../models");
const {readCsvOrExcel, deleteFile} = require("../utils/helper");
const csvHeaders = require("../config/csvHeader");

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

const uploadQuestion = async (file) => {
  const questions = await readCsvOrExcel(file.path, csvHeaders)
  deleteFile(file.path);

  questions.shift();
  let questionsArr = []
  for(let i =0; i<questions.length; i++) {
    let question = questions[i]

    let categoryNames = question.categories.split(',').map(name => name.trim());
    let categoryDocs = await Category.find({ name: { $in: categoryNames } });
    let categoryIds = categoryDocs.map(cat => cat._id);
    let existingCategoryNames = categoryDocs.map(cat => cat.name);

    let missingCategories = categoryNames.filter(name => !existingCategoryNames.includes(name));

    if (missingCategories.length > 0) {
      let newCategories = await Category.insertMany(missingCategories.map(name => ({ name })));
      categoryIds.push(...newCategories.map(cat => cat._id));
    }
    
    questionsArr.push({
      question: question.question,
      options: question.options,
      correctAnswer: question.correctAnswer,
      categories: categoryIds.map(categoryId => new mongoose.Types.ObjectId(categoryId))
    })
  }
  await Question.insertMany(questionsArr);
  return questionsArr;
}

const editQuestion = async (id, data) => {
  const question = await Question.findByIdAndUpdate(id, data, { new: true });
  if (!question) throw new Error("Question not found");
  return question;
}

const deleteQuestion = async (id) => {
  const question = await Question.findByIdAndDelete(id);
  if (!question) throw new Error("Question not found");
  return question;
}

module.exports = {
  createQuestion,
  get,
  uploadQuestion,
  editQuestion,
  deleteQuestion,
};
