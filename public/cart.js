let cartItems = document.getElementById('cart-items')

function getCart(){
    axios.get('http://localhost:8008/ies/cart').then((res) => {
        let orderTotal = 0;

        for(let i = 0; i < res.data.length; i++){
            let {id, name, amount, choice, imageURL, price} = res.data[i]
            orderTotal += Number(price.split('').splice(1,price.split('').length -1).join(''))
            let cartCard = document.createElement('div')
            cartCard.setAttribute('id', `cart-${id}`)
            cartCard.setAttribute('class', 'cart-card')
            cartCard.innerHTML = `
                <img id='cart-img' src='${imageURL}'/>

                <h1 id='cart-title'>${name}</h1>

                <div id='cart-a-c'>
                    <p id='cart-amount'>${amount}pcs</p>
                    <p id='cart-choice'>${choice}</p>
                </div>

                <p id='cart-price'>${price}</p>
            `
            cartItems.appendChild(cartCard)
        }

        document.getElementById('order-total').textContent = orderTotal
        let tax = orderTotal*.087
        document.getElementById('order-tax').textContent = tax.toFixed(2)
    })
}

getCart()