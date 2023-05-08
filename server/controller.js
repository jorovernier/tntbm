const items = require('./items.json')
let cart = []

module.exports = {
    getItems: (req, res) => {
        res.status(200).send(items)
    },
    getCart: (req, res) => {
        res.status(200).send(cart)
    },
    addToCart: (req, res) => {
        cart.push(req.body)
        console.log(cart)
        res.sendStatus(200)
    },
    deleteFromCart: (req, res) => {
        cart.splice(+req.params.id, 1)
        res.sendStatus(200)
    }
}