// fetch('https://fakestoreapi.com/products')
//     .then(res => res.json())
//     .then(json => console.log(json))

const products = [
    {
        id: 1,
        title: 'T-shirt',
        price: 39.99,
        image: './images/1.jpg'
    },
    {
        id: 2,
        title: 'Shoe',
        price: 99.99,
        image: './images/2.jpg'
    },
    {
        id: 3,
        title: 'Shoe Special',
        price: 59.99,
        image: './images/4.jpg'
    },
    {
        id: 4,
        title: 'Jacket',
        price: 65.99,
        image: './images/3.jpg'
    },
]

const productList = document.querySelector('.product__list')
const cartCount = document.querySelector('.cart_count')
const cartOuter = document.querySelector('.cart__outer')
const items = document.querySelector('.items')


const open = document.querySelector('#open')
const close = document.querySelector('#close')
let cartItems = []
let totalProduct = 0

products.forEach(product => {
    const div = document.createElement('div')
    div.classList.add('product')
    div.innerHTML = `
    <div class="img__container">
    <img src="${product.image}" alt="">
    </div>
    <h4 class="title">${product.title}</h4>
    <p class="price">\$${product.price}</p>
    <button class="add__to__cart" data-id="${product.id}">Add To Cart</button>
    `
    productList.appendChild(div)
});

const addToCarts = document.getElementsByClassName('add__to__cart')
Array.from(addToCarts).forEach(btn => {
    btn.addEventListener('click', (e) => {
        addToCart(e.target.dataset.id)
        totalProduct++;
        updateCount()
        renderCart()

    })
})

function renderCart() {
    items.innerHTML = ''
    cartItems.forEach(product => renderCartItems(product))
    if (cartItems.length == 0) {
        items.innerHTML = '<h3 id="empty">Empty Cart!</h3>'
    }

}

function addToCart(id) {
    let result = cartItems.find(val => val.id == id)
    if (result) {
        cartItems.find(val => {
            if (val.id == id) {
                val.qty = val.qty + 1
            }
        })
    } else {
        const product = products.filter(item => item.id == id)
        cartItems.push({ ...product[0], qty: 1 })
    }

}

const updateCount = () => {
    document.querySelector('.cart_count').textContent = totalProduct
}

open.addEventListener("click", () => {
    cartOuter.classList.add('active')
})

close.addEventListener("click", () => {
    cartOuter.classList.remove('active')
})

function renderCartItems({ title, price, qty, id }) {
    const div = document.createElement('div')
    div.classList.add('item')
    div.innerHTML = `
                    <div>
                        <h3>${title}</h3>
                        <p>\$${price}</p>
                    </div>
                    <div>
                        <button class="decrement" onclick="decrementQty(${id})">-</button>
                        <span>${qty}</span>
                        <button class="increment" onclick="incrementQty(${id})">+</button>
                    </div>
                    <button class="remove" onclick="removeItem(${id})">Remove</button>
    `
    items.appendChild(div)
}


function decrementQty(id) {
    let product = cartItems.find(item => item.id == id)
    if (product.qty == 1) {
        removeItem(id)
        return
    }
    cartItems.find(val => {
        if (val.id == id) {
            val.qty = val.qty - 1
        }
    })
    renderCart()
    totalProduct--
    updateCount()
}



function incrementQty(id) {
    cartItems.find(val => {
        if (val.id == id) {
            val.qty = val.qty + 1
        }
    })
    renderCart()
    totalProduct++
    updateCount()
}

function removeItem(id) {
    const result = cartItems.find(item => item.id == id)
    cartItems = cartItems.filter(item => item.id != id)
    renderCart()
    totalProduct = totalProduct - result.qty;
    updateCount()
}
