import {
  createCategoryService,
  deleteCategoryService,
  listCategoriesService,
  listCategoryService,
  updateCategoryService,
} from "../services/categories.services"

const createCategoryController = async (req, res) => {
  const { name } = req.body
  try {
    const category = await createCategoryService(name)

    return res.status(201).json(category)
  } catch (err) {
    return res.status(400).json({ message: "Category Already Exists!" })
  }
}

const listCategoriesController = async (req, res) => {
  try {
    const listedCategories = await listCategoriesService()
    return res.status(200).json(listedCategories)
  } catch (error) {
    return res.status(400).json(error.message)
  }
}

const listCategoryController = async (req, res) => {
  const { id } = req.params

  try {
    const listedCategory = await listCategoryService(id)
    return res.status(200).json(listedCategory)
  } catch (error) {
      return res.status(400).json({ message: error.message })
  }
}

const updateCategoryController = async (req, res) => {
  const { id } = req.params
  const { name } = req.body

  try {
    const updatedeCategory = await updateCategoryService(id, name)
    return res.status(200).json(updatedeCategory)
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

const deleteCategoryController = async (req, res) => {
  const { id } = req.params

  try {
    const deletedCategory = await deleteCategoryService(id)
    return res.status(204).json(deletedCategory)
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

export {
  createCategoryController,
  listCategoriesController,
  listCategoryController,
  updateCategoryController,
  deleteCategoryController,
}
