import database from "../database"

const createCategoryService = async (name) => {
  try {
    const checkCategoryExists = await database.query(
      "SELECT name FROM categories WHERE name = $1",
      [name]
    )
    if (checkCategoryExists.rows.length > 0) {
      throw new Error(err)
    }

    const res = await database.query(
      "INSERT INTO categories(name) VALUES($1) RETURNING *",
      [name]
    )

    return { message: "Category created", category: res.rows[0] }
  } catch (err) {
    throw new Error(err)
  }
}

const listCategoriesService = async () => {
  try {
    const res = await database.query("SELECT name FROM categories")

    return res.rows
  } catch (err) {
    throw new Error(err)
  }
}

const listCategoryService = async (id) => {
  try {
    const res = await database.query("SELECT * FROM categories WHERE id = $1", [
      id,
    ])

    if (res.rowCount === 0) {
      throw "Category not found"
    }

    return res.rows[0]
  } catch (error) {
    throw new Error(error)
  }
}

const updateCategoryService = async (id, name) => {
  try {
    // const categoryId = await database.query("SELECT id FROM categories;")
    // const idExists = categoryId.rows.find((row) => row.id === id)

    // if (idExists === undefined) {
    //   throw "Category not found"
    // }

    const res = await database.query(
      "UPDATE categories SET name = $1 WHERE id = $2 RETURNING *",
      [name, id]
    )

    if (res.rows.length === 0) {
      throw "Category not found"
    }

    return { message: "Category updated", category: res.rows[0] }
  } catch (error) {
    throw new Error(error)
  }
}

const deleteCategoryService = async (id) => {
  try {
    // const categoryId = await database.query("SELECT id FROM categories;")
    // const idExists = categoryId.rows.find((row) => row.id === id)

    // if (idExists === undefined) {
    //   throw "Category not found"
    // }

    const res = await database.query(
      "DELETE FROM categories WHERE id = $1 RETURNING *",
      [id]
    )

    if (res.rows.length === 0) {
      throw "Category not found"
    }
    return { message: "category deleted", category: res.rows[0] }
  } catch (error) {
    throw new Error(err)
  }
}

export {
  createCategoryService,
  listCategoriesService,
  listCategoryService,
  updateCategoryService,
  deleteCategoryService,
}
