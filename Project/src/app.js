const express = require("express");
const app = express(); 
const PUERTO = 8088; 
const productsRouter = require("./routes/products.router.js");
const cartsRouter = require("./routes/carts.router.js");
const fs = require("fs/promises")
let products = []

const getProducts = async () => {
    products = await fs.readFile("./src/data/products.json", "utf-8");
    products = JSON.parse(products)
    console.log(products)
}

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/", (req, res) => {
    getProducts()
    let limit = req.query.limit;
    let limitedProducts= products.slice(0,limit)

    res.send(limitedProducts);
    res.send(products);

})

app.get("/:pid", (req, res) => {
    let { pid } = req.params;
    getProducts()
    let searchedProduct = products.find(product => product.id == pid)
    
    if(searchedProduct)
        {
            res.send(searchedProduct);
        }
        else {res.send("Producto no entcontrado")}
    

})

app.use("/api/products", productsRouter);

app.use("/api/carts", cartsRouter);
 
app.listen(PUERTO, () => {

    console.log(`Escuchando en el puerto: ${PUERTO}`);

})

app.use(express.static("./src/public"))