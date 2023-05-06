const itemHolder = document.getElementById('item-holder')

function getItems(){
    axios.get('http://localhost:8008/ies/items').then((res) => {
        for(let i = 0; i < res.data.length; i++){
            let item = res.data[i]
            let itemCard = document.createElement('div')
            itemCard.setAttribute('id', `item-${item.id}`)
            itemCard.setAttribute('class', `item-card`)
            itemCard.innerHTML = `
                <img class='card-img' src='${item.imageURL}'/>
                <h1 class='card-title' id='title-${item.id}'>${item.name}</h1>
            `
            itemHolder.appendChild(itemCard)
            itemCard.addEventListener('click', () => {
                renderItemInfo(item)
            })
        }
    })
}

function renderItemInfo(item){
    document.title = item.name
    itemHolder.textContent = ''

    let currAmount = ''
    let currChoice = ''

    let {id, name, amounts, choices, imageURL} = item

    itemHolder.innerHTML = `
        <div>
            <img class='item-img' src='${imageURL}'/>
            <section>
                <h1>${name}</h1>

                <section>
                    <p>Size Selection</p>
                    <div id='sizes'></div>
                </section>

                <section>
                    <p>Choices</p>
                    <div id='choices'></div>
                </section>

                <p id='price'></p>

                <button id='add-to-cart'>Add To Cart</button>

            </section>
        </div>
    `


    for(let i = 0; i < amounts.length; i++){
        let keyName = Object.keys(amounts[i])

        let amount = document.createElement('div')
        amount.setAttribute('id', `${keyName}`)
        amount.textContent = keyName

        document.getElementById('sizes').appendChild(amount)
        amount.addEventListener('click', () => {
            currAmount = keyName[0]
            document.getElementById('price').textContent = amounts[i][keyName]
            if(currAmount && currChoice){
                document.getElementById('add-to-cart').addEventListener('click',() => {
                    console.log(item)
                })
            }
        })

    }

    for(let i = 0; i < choices.length; i++){
        let choice = document.createElement('div')
        choice.textContent = choices[i]

        document.getElementById('choices').appendChild(choice)
        choice.addEventListener('click', () => {
            currChoice = choices[i]
            if(currAmount && currChoice){
                let toSend = {
                    id,
                    name,
                    amount: currAmount,
                    choice: currChoice,
                    imageURL
                }
                document.getElementById('add-to-cart').addEventListener('click',() => {
                    addToCart(toSend)
                })
            }
        })
    }

}

function addToCart(item){
    console.log(item)
    axios.post('http://localhost:8008/ies/cart', item).then((res) => {
        window.location.reload()
    })
}

getItems()