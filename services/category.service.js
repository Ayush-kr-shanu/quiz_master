const { Category } = require("../models");

const addCategory = async (data) => {
  const category = new Category(data);
  await category.save();
  return category;
};

const getAllCategories = async (params) => {
  const { name, id } = params;
  const categories = await Category.find({
    ...(name && { name: { $regex: name, $options: "i" } }),
    ...(id && { _id: id }),
  });
  return categories;
};

const updateCategory = async (id, data) => {
  const category = await Category.findByIdAndUpdate(id, data, { new: true });
  if (!category) throw new Error("Category not found");
  return category;
};

const deleteCategory = async (id) => {
  return await Category.findByIdAndDelete(id);
};

module.exports = {
  addCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
};
