import {
  createProductService,
  deleteProductService,
  listProductsByCategoryService,
  listProductService,
  listProductsService,
  updateProductService,
} from "../services/products.services"

const createProductController = async (req, res) => {
  const { name, price, category_id } = req.body

  try {
    const createProduct = await createProductService(name, price, category_id)

    return res.status(201).json(createProduct)
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

const listProductsController = async (req, res) => {
  try {
    const listProducts = await listProductsService()
    return res.status(200).json(listProducts)
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

const listProductController = async (req, res) => {
  const { id } = req.params

  try {
    const listProduct = await listProductService(id)
    return res.status(200).json(listProduct)
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

const updateProductController = async (req, res) => {
  try {
    const { id } = req.params
    const data = req.body
    const product = await updateProductService(id, data)
    return res.status(200).json(product)
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

const deleteProductController = async (req, res) => {
  const { id } = req.params

  try {
    const deletedProduct = await deleteProductService(id)
    return res.status(204).json(deletedProduct)
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

const listProductsByCategoryController = async (req, res) => {
  const { id } = req.params

  try {
    const productCategory = await listProductsByCategoryService(id)

    return res.status(200).json(productCategory)
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

export {
  createProductController,
  listProductsController,
  listProductController,
  updateProductController,
  deleteProductController,
  listProductsByCategoryController,
}
