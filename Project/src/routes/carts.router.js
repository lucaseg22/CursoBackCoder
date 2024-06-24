const express = require('express');
const router = express.Router();
const cartsParth = "./src/data/carts.json";
const productsPath = "./src/data/products.json";
const fs = require("fs/promises")
let carts = []

const getCarts = async () => {
    products = await fs.readFile(cartsParth, "utf-8");
    products = JSON.parse(products)
    console.log(products)
}

const getProducts = async () => {
    products = await fs.readFile(productsPath, "utf-8");
    products = JSON.parse(products)
    console.log(products)
}

const saveCarts = async () => {
    await fs.writeFile(cartsParth, JSON.stringify(products, null, 2))
}

router.get('/:cid', (req, res) => {
    const { cid } = req.params;
    getCarts()
    const searchedCart = carts.find(cart => cart.id == cid)

    
    res.send(searchedCart.products)
})

router.post('/', (req, res) => {
    getCarts()
    let newCart = {
        id: 0,
        products:[]
    }

    if(carts.length == 0)
        {
            newCart.id = 1;
        }
        else
        {
            newCart.id = carts[carts.length -1].id + 1;
        }

    carts.push(newCart);
    res.send("Carrito agregado correctamente")
})

router.post('/:cid/product/:pid', (req, res) => {
    const { cid, pid } = req.params;
    getCarts()
    getProducts()
    
    const cartIndex = carts.findIndex(cart => cart.id == cid)
    let product = products.find(product => product.id == pid)
    let cartProduct = {
       
        id:product.id,
        quantity: 1
        
    }
    let searchedCart = carts[cartIndex]
    res.send(product)
    const exists = searchedCart.products.find(sc => sc.id == pid)
    if(exists)
        {
            const inCart = searchedCart.products.findIndex(sc => sc.id == pid)
            searchedCart.products[inCart].quantity = searchedCart.products[inCart].quantity + 1
        }
        else
        {
            searchedCart.products.push(cartProduct)
        }
    saveCarts()
    console.log(searchedCart.products)
    
})

module.exports = router;