const items = require('./items.json')
let cart = [{
    id: 2,
    name: 'Inconspicuous Sushi',
    amount: '12',
    choice: 'Salmon Roll',
    price: '$13.49',
    imageURL: 'https://images.unsplash.com/photo-1553621042-f6e147245754?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2050&q=80'
  }]

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
        console.log(req.params)
    }
}