const express = require('express');
const router = express.Router();
const carts = require("../carts.js")
const products = require("../products.js")



router.get('/:cid', (req, res) => {
    const { cid } = req.params;
    const searchedCart = carts.find(cart => cart.id == cid)

    
    res.send(searchedCart.products)
})

router.post('/', (req, res) => {
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
    
    console.log(searchedCart.products)
    
})

module.exports = router;