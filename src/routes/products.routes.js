import { Router } from "express"
import {
  createProductController,
  deleteProductController,
  listProductController,
  listProductsByCategoryController,
  listProductsController,
  updateProductController,
} from "../controllers/products.controllers"

const router = Router()

router.post("", createProductController)
router.get("", listProductsController)
router.get("/:id", listProductController)
router.patch("/:id", updateProductController)
router.delete("/:id", deleteProductController)
router.get("/category/:id", listProductsByCategoryController)

export default router
