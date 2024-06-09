const Router = require('express');
const router = Router.Router();
const products = require("../products.js")



router.get('/', (req, res) => {
    res.send(products)
})

router.post('/', (req, res) =>{
    const newProduct = req.body;
    newProduct.id = products[products.length -1].id + 1;

    if(!newProduct.title || !newProduct.description || !newProduct.code || !newProduct.price || !newProduct.stock ||!newProduct.category)
        {
            return res.send("Todos los cambpos deben ser completados!")
        }
    products.push(newProduct);
    res.send("Producto agregada correctamente")
})

router.put('/:pid', (req, res) => {
    const { pid } = req.params;
    const { title, description, code, price, stock, category } = req.body

    const searchedProduct = products.find(product => product.id == pid)

    if(searchedProduct)
        {
            const index = products.findIndex(product => product.id == pid)
            console.log(searchedProduct, index)
            products[index] = {...products[index], title, description, code, price, stock, category }
        }
        else {return res.send("Producto no encontrado", products[index])}

        res.send("Producto actualizado correctamente")
        
})

    router.delete('/:pid', (req, res) => {
        const { pid } = req.params;

    const searchedProduct = products.find(product => product.id == pid)

    if(searchedProduct)
        {
            const index = products.findIndex(product => product.id == pid)
            products.splice(index,1)
            
        }
        else {return res.send("Producto no encontrado", products[index])}

        res.send("Producto id: "+ pid + " eliminado correctamente")
    })

module.exports = router ;