import database from "../database"

const createProductService = async (name, price, category_id) => {
  try {
    const checkProductExists = await database.query(
      "SELECT * FROM products WHERE name = $1",
      [name]
    )

    if (!checkProductExists) {
      throw new Error(error)
    }

    const res = await database.query(
      "INSERT INTO products (name, price, category_id) VALUES ($1, $2, $3) RETURNING *",
      [name, price, category_id]
    )

    return { message: "Product created", product: res.rows[0] }
  } catch (error) {
    throw new Error(error)
  }
}

const listProductsService = async () => {
  try {
    const res = await database.query("SELECT * FROM products")

    return res.rows
  } catch (error) {
    throw new Error(error)
  }
}

const listProductService = async (id) => {
  try {
    const res = await database.query(
      "SELECT name FROM products WHERE id = $1",
      [id]
    )

    return res.rows[0]
  } catch (error) {
    throw new Error(error)
  }
}

const updateProductService = async (id, data) => {
  try {
    if (data.id) {
      delete data["id"]
    }
    let query = "UPDATE products SET "
    const keys = Object.keys(data)
    const values = Object.values(data)

    keys.forEach((key, index) => {
      query += `${key} = \$${(index += 1)}, `
    })

    query = query.slice(0, -2)

    query += ` WHERE id = \$${(keys.length += 1)} RETURNING *`

    const res = await database.query(query, [...values, id])

    if (res.rowCount === 0) {
      throw new Error("Product not found")
    }

    return { message: "Atualizado", product: res.rows[0] }
  } catch (error) {
    throw new Error(error)
  }
}

const deleteProductService = async (id) => {
  try {
    const res = await database.query(
      "DELETE FROM products WHERE id = $1 RETURNING *",
      [id]
    )

    if (res.rowCount === 0) {
      throw new Error("Product not found")
    }

    return { message: "Product deleted", category: res.rows[0] }
  } catch (error) {
    throw new Error(error)
  }
}

const listProductsByCategoryService = async (id) => {
  try {
    const res = await database.query(
      "SELECT products.name, products.price, categories.name category FROM products RIGHT JOIN categories ON products.category_id = categories.id WHERE categories.id = $1",
      [id]
    )

    return res.rows
  } catch (error) {
    throw new Error(error)
  }
}

export {
  createProductService,
  listProductsService,
  listProductService,
  updateProductService,
  deleteProductService,
  listProductsByCategoryService,
}
