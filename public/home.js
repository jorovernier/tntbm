const itemHolder = document.getElementById('item-holder')

function getItems(){
    axios.get('http://localhost:8008/ies/items').then((res) => {
        for(let i = 0; i < res.data.length; i++){
            let item = res.data[i]
            let itemCard = document.createElement('div')
            itemCard.setAttribute('class', `item-card`)
            itemCard.innerHTML = `
                <img class='card-img' src='${item.imageURL}'/>
                <h1 class='card-title jura'>${item.name}</h1>
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
        <div id='clicked-item'>
            <img id='item-img' src='${imageURL}'/>
            <section id='section-section'>
                <h1 class='jura' id='selected-title'>${name}</h1>

                <section class='size-choice'>
                    <h2 class='h2o-just-add-water jura'>Size Selection</h2>
                    <div class='options' id='sizes'></div>
                </section>

                <section class='size-choice'>
                    <h2 class='h2o-just-add-water jura'>Choices</h2>
                    <div class='options' id='choices'></div>
                </section>

                <p class='inter' id='price'></p>

                <button class='jura' id='add-to-cart'>Add To Cart</button>

            </section>
        </div>
    `


    for(let i = 0; i < amounts.length; i++){
        let keyName = Object.keys(amounts[i])

        let amount = document.createElement('div')
        amount.setAttribute('class', `option amount`)
        amount.innerHTML = `
            <p class='option-text inter'>${keyName}</p>
        `

        document.getElementById('sizes').appendChild(amount)
        amount.addEventListener('click', () => {
            currAmount = keyName[0]

            let divs = document.querySelectorAll('.amount')
            for(let j = 0; j < divs.length; j++){
                divs[j].style.boxShadow = ""
            }
            amount.style.boxShadow = "0px 3px 3px 0px grey"

            document.getElementById('price').textContent = `${amounts[i][keyName]}`
            if(currAmount && currChoice){
                let toSend = {
                    id,
                    name,
                    amount: currAmount,
                    choice: currChoice,
                    price: +document.getElementById('price').textContent,
                    imageURL
                }
                document.getElementById('add-to-cart').addEventListener('click',() => {
                    addToCart(toSend)
                })
            }
        })

    }

    for(let i = 0; i < choices.length; i++){
        let choice = document.createElement('div')
        choice.setAttribute('class', `option choice`)
        choice.innerHTML = `
            <p class='option-text inter'>${choices[i]}</p>
        `
        if(choices[i] === 'White Meat'){
            choice.innerHTML = ''
            choice.style.backgroundColor = '#FFDEC7'
            choice.style.width = '50px'
        } else if(choices[i] === 'Dark Meat'){
            choice.innerHTML = ''
            choice.style.backgroundColor = '#C99494'
            choice.style.width = '50px'
        }

        document.getElementById('choices').appendChild(choice)
        choice.addEventListener('click', () => {
            currChoice = choices[i]

            let divs = document.querySelectorAll('.choice')
            for(let j = 0; j < divs.length; j++){
                divs[j].style.boxShadow = ""
            }
            choice.style.boxShadow = "0px 3px 3px 0px grey"

            if(currAmount && currChoice){
                let toSend = {
                    id,
                    name,
                    amount: currAmount,
                    choice: currChoice,
                    price: +document.getElementById('price').textContent,
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
    axios.post('http://localhost:8008/ies/cart', item).then(() => {
        window.location.reload()
    })
}

getItems()