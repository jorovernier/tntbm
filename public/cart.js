let executed = false

let cartItems = document.getElementById('cart-items')

function getCart(){
    cartItems.innerHTML = ''

    axios.get('http://localhost:8008/ies/cart').then((res) => {
        let orderTotal = 0;

        if(res.data.length < 1){
            cartItems.innerHTML = `
                <p class='jura' id='empty-cart'>Add some items to your cart!</p>
            `
        }

        for(let i = 0; i < res.data.length; i++){
            let {name, amount, choice, imageURL, price} = res.data[i]
            orderTotal += price
            let cartCard = document.createElement('div')
            cartCard.setAttribute('class', 'cart-card')
            if(name.split(' ').length > 2){
                name = name.split(' ').splice(0, 2).join(' ') + '...'
            }
            cartCard.innerHTML = `
                <img class='cart-img' src='${imageURL}'/>

                <h1 class='cart-title jura'>${name}</h1>

                <div class='cart-a-c'>
                    <p class='jura'>${amount}</p>
                    <p class='jura'>${choice}</p>
                </div>

                <p class='cart-price inter'>${price}</p>

                <button class='delete' id='delete-${i}'>x</button>
            `

            cartCard.addEventListener('mouseover', () => {
                document.getElementById(`delete-${i}`).style.display = 'block'
            })
            cartCard.addEventListener('mouseout', () => {
                document.getElementById(`delete-${i}`).style.display = 'none'
            })
            cartItems.appendChild(cartCard)

            document.getElementById(`delete-${i}`).addEventListener('click', deleteFromCart)
        }

        let tax = orderTotal*.087
        orderTotal += +tax.toFixed(2)
        let totalElem = document.getElementById('order-total')
        totalElem.textContent = orderTotal.toFixed(2)
        document.getElementById('order-tax').innerHTML = `
            Tax: <span class='inter' id='tax-num'>${tax.toFixed(2)}</span>
        `

        let oneDay = document.getElementById('ship-2')
        oneDay.addEventListener('click', () => {
            if(oneDay.attributes.selected === undefined && res.data.length > 0){
                oneDay.setAttribute('selected', true)
                let toAdd = +totalElem.textContent
                toAdd += 9.99
                totalElem.textContent = toAdd.toFixed(2)
            }
        })

        let econ = document.getElementById('ship-1')
        econ.addEventListener('click', () => {
            if(oneDay.attributes.selected && res.data.length > 0){
                oneDay.removeAttribute('selected')
                let toSub = +totalElem.textContent
                toSub -= 9.99
                totalElem.textContent = toSub.toFixed(2)
            }
        })

        let orderBtn = document.getElementById('finish')
        orderBtn.addEventListener('click', () => {
            if(res.data.length > 0){
                finishOrder()
            } else {
                alert('Please add items to your cart.')
            }
        })
    })
}

function deleteFromCart(event){
    axios.delete(`http://localhost:8008/ies/cart/${event.target.id.split('-')[1]}`).then(() => {
        document.getElementById('ship-2').removeAttribute('selected')
        getCart()
    })
}

function finishOrder(){
    if(executed === false){
        executed = true
        axios.delete('http://localhost:8008/ies/cart').then((res) => {
            alert(res.data)
            window.location.href = 'http://127.0.0.1:5500/public/home.html'
        })
    }
}

getCart()