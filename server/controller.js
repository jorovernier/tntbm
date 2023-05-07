const items = require('./items.json')
let cart = []

module.exports = {
    getItems: (req, res) => {
        res.status(200).send(items)
    },
    addToCart: (req, res) => {
        cart.push(req.body)
        console.log(cart)
        res.sendStatus(200)
    },
    deleteFromCart: (req, res) => {
        console.log(req.params)
    }
}