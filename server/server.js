const express = require('express')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

const {getItems, getCart, addToCart, deleteFromCart} = require('./controller')

app.get('/ies/items', getItems)
app.get('/ies/cart', getCart)
app.post('/ies/cart', addToCart)
app.delete('/ies/cart/:id', deleteFromCart)

app.listen(8008, () => console.log('Partying hard on port 8008!'))