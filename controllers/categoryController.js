import Category from '../models/Category.js';
import slugify from 'slugify';
export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({ message: 'Name of category is required' });
    }
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(200).send({
        success: true,
        message: 'Category Already Exists',
      });
    }
    const category = await new Category({ name, slug: slugify(name) }).save();
    res.status(201).send({
      success: true,
      message: 'New Category created',
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: 'Error in category',
    });
  }
};
export const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const category = await Category.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: 'Category Updated Successfully',
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: 'Error while updating category',
    });
  }
};

//get all categories

export const categoryController = async (req, res) => {
  try {
    const category = await Category.find({});
    res.status(200).send({
      success: true,
      message: 'All Categories List',
      category,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: 'Error while getting all categories',
    });
  }
};
//single category
export const singleCategoryController = async (req, res) => {
  try {
    const { slug } = req.params;
    const category = Category.findOne({ slug });
    res.status(200).send({
      success: true,
      message: 'Get Single Category Successfully',
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: 'Error while getting single Category',
    });
  }
};
//delete category
export const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    await Category.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: 'Category Deleted Successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: 'Error while deleting Category',
    });
  }
};
