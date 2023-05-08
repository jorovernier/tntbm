let cartItems = document.getElementById('cart-items')

function getCart(){
    axios.get('http://localhost:8008/ies/cart').then((res) => {
        let orderTotal = 0;

        for(let i = 0; i < res.data.length; i++){
            let {id, name, amount, choice, imageURL, price} = res.data[i]
            orderTotal += price
            let cartCard = document.createElement('div')
            cartCard.setAttribute('id', `cart-${id}`)
            cartCard.setAttribute('class', 'cart-card')
            if(name.split(' ').length > 2){
                name = name.split(' ').splice(0, 2).join(' ') + '...'
            }
            cartCard.innerHTML = `
                <img class='cart-img' src='${imageURL}'/>

                <h1 class='cart-title'>${name}</h1>

                <div class='cart-a-c'>
                    <p class='cart-amount'>${amount}pcs</p>
                    <p class='cart-choice'>${choice}</p>
                </div>

                <p class='cart-price'>${price}</p>

                <button class='delete' id='delete-${id}'>x</button>
            `
            cartCard.addEventListener('mouseover', () => {
                document.getElementById(`delete-${id}`).style.display = 'block'
            })
            cartCard.addEventListener('mouseout', () => {
                document.getElementById(`delete-${id}`).style.display = 'none'
            })
            cartItems.appendChild(cartCard)
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
            if(oneDay.attributes.selected === undefined){
                oneDay.setAttribute('selected', true)
                console.log(oneDay.attributes)
                let toAdd = +totalElem.textContent
                toAdd += 9.99
                totalElem.textContent = toAdd
            }
        })

        let econ = document.getElementById('ship-1')
        econ.addEventListener('click', () => {
            if(oneDay.attributes.selected){
                oneDay.removeAttribute('selected')
                let toSub = +totalElem.textContent
                toSub -= 9.99
                totalElem.textContent = toSub.toFixed(2)
            }
        })
    })
}

function selectShip(clicked){
    let toggle = false
    if(clicked === 'One Day'){

    }
}

getCart()