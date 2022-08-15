import express from "express"
import "dotenv/config"
import { startDatabase } from "./database"
import categoriesRouter from "./routes/categories.routes"
import productsRouter from "./routes/products.routes"

const app = express()

app.use(express.json())
app.use("/categories", categoriesRouter)
app.use("/products", productsRouter)

app.get("/", (req, resp) => {
  return resp.json({
    message: "Produtos e Categorias",
  })
})

const PORT = 3000

app.listen(PORT, () => {
  startDatabase()
  console.log("Server running on " + PORT)
})

export default app
