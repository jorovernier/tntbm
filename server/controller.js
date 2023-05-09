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
        res.sendStatus(200)
    },
    deleteFromCart: (req, res) => {
        cart.splice(+req.params.id, 1)
        res.sendStatus(200)
    },
    finishOrder: (req, res) => {
        let tips = ["Make sure to lock your doors at night, just in case.", "Keep a baseball bat nearby, you never know when you'll need it.", "The delivery driver will be wearing blue. If they are not wearing blue, DO NOT answer the door.", "Always check the backseat before you drive away, especially at night.", "If you get a package that says 'FRAGILE' on it, take it and dump it into the nearest river or lake."]
        let randomTip = tips[Math.floor(Math.random() * tips.length)]
        cart = []
        res.status(200).send('Thank you for your order, we really appreciate your business! '+randomTip)
    }
}