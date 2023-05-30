import { promises as fs } from "fs"

export default class ProductManager {
    constructor() {
        this.patch = "./productos.txt"
        this.products = []
    }
    static id = 0

    addProduct = async (title, description, price, thumbnail, code, stock) => {

        ProductManager.id++

        let newProduct = {
            id: ProductManager.id,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }

        this.products.push(newProduct)

        await fs.writeFile(this.patch, JSON.stringify(this.products))
    }

    readProducts = async () => {
        let respuesta = await fs.readFile(this.patch, "utf-8")
        return JSON.parse(respuesta)
    }

    getProducts = async () => {
        let respuesta2 = await this.readProducts()
        return console.log(respuesta2)
    }
    
    // Para encontrar el producto mediante el ID

    getProductsById = async (id) => {
        try {
            let respuesta3 = await this.readProducts();
            const product = respuesta3.find((product) => product.id === id);
            if (!product) {
                console.log(`Producto con el ID ${id} No Encontrado`);
            } else {
                console.log(`Se encontro el ID ${id}`);
            }
        } catch (error) {
            console.log(`Error al obtener el producto por ID: ${id}`);
        }
    }
    
    // Para borrar el producto del archivo txt
    
    deleteProductsById = async (id) => {
        try {
            let respuesta3 = await this.readProducts();
            let productFilter = respuesta3.filter((products) => products.id != id);
            await fs.writeFile(this.patch, JSON.stringify(productFilter));
            console.log(`Producto con el ID número ${id} eliminado`);
        } catch (error) {
            console.log(`Error al eliminar el producto por ID: ${error}`);
        }
    }

    // Para modificar o actualizar alguno de los productos (en este caso se cambio el price del producto 3)
    
    updateProducts = async ({id, ...producto}) => {
        await this.deleteProductsById(id)
        let productOld = await this.readProducts()
        let productoModificado = [{...producto, id}, ...productOld]
        await fs.writeFile(this.patch, JSON.stringify(productoModificado))
    }
}

//const productos = new ProductManager();

/*productos.addProduct("Titulo1", "Description1", 1000, "Imagen1", "abc123", 10)
productos.addProduct("Titulo2", "Description2", 2000, "Imagen2", "abc124", 15)
productos.addProduct("Titulo3", "Description3", 3000, "Imagen3", "abc125", 20)
productos.addProduct("Titulo4", "Description4", 4000, "Imagen4", "abc126", 25)
productos.addProduct("Titulo5", "Description5", 5000, "Imagen5", "abc127", 30)
productos.addProduct("Titulo6", "Description6", 6000, "Imagen6", "abc128", 35)
productos.addProduct("Titulo7", "Description7", 7000, "Imagen7", "abc129", 40)
productos.addProduct("Titulo8", "Description8", 8000, "Imagen8", "abc130", 45)
productos.addProduct("Titulo9", "Description9", 9000, "Imagen9", "abc131", 50)
productos.addProduct("Titulo10", "Description10", 10000, "Imagen10", "abc132", 55)*/


//productos.getProducts() 

//productos.getProductsById(2) 

//productos.deleteProductsById(1)

/*productos.updateProducts({
    id: 3,
    title: 'Titulo3',
    description: 'Description3',
    price: 8000,
    thumbnail: 'Imagen3',
    code: 'abc125',
    stock: 4
})*/