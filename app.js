const products = [
    {
        name: 'Modern JavaScript Programming',
        price: 100
    },
    {
        name: 'Introductory Java Programming',
        price: 50
    },
    {
        name: 'PHP for Web Development',
        price: 50
    },
    {
        name: 'MATLAB Masterclass',
        price: 50
    },
    {
        name: 'Data Structures and Algorithms',
        price: 100
    }
];

let cart = {
    items: [],
    totalPrice: 0
}

function renderAllProducts() {
    const productTable = document.getElementById('products');
    productTable.innerHTML = '';
    products.forEach((product, index) => {
        productTable.innerHTML += `
            <tr>
                <td>${product.name}</td>
                <td>$${product.price}</td>
                <td>
                    <button 
                        class="btn btn-success"
                        onClick="addToCart(${index})"
                    >
                        Add to Cart
                    </button>
                </td>
            </tr>
        `
    })
}

function renderAllCartItems() {
    const cartItemTable = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    let totalPrice = 0;
    cartItemTable.innerHTML = '';
    if(cart.items.length === 0) {
        cartItemTable.innerHTML = `
            <tr>
                <td colspan="5">
                    There is no item in the cart yet.
                </td>
            </tr>
        `
    }
    cart.items.forEach((cartItem, index) => {
        totalPrice += cartItem.total;
        cartItemTable.innerHTML += `
            <tr>
                <td>${cartItem.name}</td>
                <td>$${cartItem.price}</td>
                <td>${cartItem.quantity}</td>
                <td>$${cartItem.total}</td>
                <td>
                    <button 
                        class="btn btn-success"
                        onClick="removeFromCart('${cartItem.name}')"
                    >
                        Remove from Cart
                    </button>
                </td>
            </tr>
        `
    })

    totalPriceElement.innerText = `Total: $${totalPrice}`;
}

function addToCart(productIndex) {
    const product = products[productIndex];
    let isAlreadyInCart = false;

    let newCartItems = cart.items.reduce((state, item) => {
        if(item.name === product.name) {
            isAlreadyInCart = true;
            const newItem = {
                ...item,
                quantity: item.quantity + 1,
                total: (item.quantity + 1) * item.price
            }
            return [...state, newItem];
        }
        return [...state, item];
    }, []);

    if(!isAlreadyInCart) {
        newCartItems.push({
            ...product,
            quantity: 1,
            total: product.price
        })
    }

    cart = {
        ...cart,
        items: newCartItems
    }

    renderAllCartItems();
}

function removeFromCart(productName) {
    let newCartItems = cart.items.reduce((state, item) => {
        if(item.name === productName) {
            const newItem = {
                ...item,
                quantity: item.quantity - 1,
                total: (item.quantity - 1) * item.price
            }
            if(newItem.quantity > 0) {
                return [...state, newItem]
            }
            return state
        }
        return [...state, item];
    }, []);

    cart = {
        ...cart,
        items: newCartItems
    }

    renderAllCartItems();
}

renderAllProducts();
renderAllCartItems();