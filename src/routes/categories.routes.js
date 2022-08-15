import { Router } from "express"

import {
  createCategoryController,
  deleteCategoryController,
  listCategoriesController,
  listCategoryController,
  updateCategoryController,
} from "../controllers/categories.controllers"

const router = Router()

router.post("", createCategoryController)
router.get("", listCategoriesController)
router.get("/:id", listCategoryController)
router.patch("/:id", updateCategoryController)
router.delete("/:id", deleteCategoryController)

export default router
