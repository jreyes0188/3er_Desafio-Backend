import express from "express"
import ProductManager from "./Componentes/ProductManager.js"

const PORT = 8080;
const app = express()
app.use(express.urlencoded({extended:true}))

const productos = new ProductManager();
const readProducts = productos.readProducts();

app.get("/products", async (Request, Response) => { // Ruta para mostrar todos los productos  /products
    let limit = parseInt (Request.query.limit);
    if(!limit) return Response.send(await readProducts)
    let allProducts = await readProducts
    let productLimit = allProducts.slice (0, limit) // Limite de productos /products?limit=5
    Response.send(productLimit);
});

app.get("/products/:id", async (Request, Response) => {
    let id = parseInt(Request.params.id);
    let allProducts = await readProducts;
    let productById = allProducts.find(product => product.id === id) // Encontrar producto por ID /products/2
    if(!productById) return Response.send({ERROR: "El Producto no existe"}) // El producto No existe /products/34123123
    Response.send(productById)
});

const server = app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})
server.on("error", (error) => console.log(`Error del servidor ${error}`))