const products = [
    { id: 1, name: "Mini Oreo", price: 10.99, image: "iconSrc/product1.png" },
    { id: 2, name: "Pure de tomate", price: 15.99, image: "iconSrc/product2.png" },
    { id: 3, name: "Leche condensada", price: 20.99, image: "iconSrc/product3.png" },
    { id: 4, name: "Pure de papa", price: 5.99, image: "iconSrc/product4.png" },
    { id: 5, name: "Spaguetti", price: 12.99, image: "iconSrc/product5.png" },
    { id: 6, name: "Aceitunas con hueso", price: 9.99, image: "iconSrc/product6.png" },
    { id: 7, name: "Maiz", price: 8.99, image: "iconSrc/product7.png" },
    { id: 8, name: "Ensalada de verduras", price: 19.99, image: "iconSrc/product8.png" },
    { id: 9, name: "Marmelada de fresa", price: 25.99, image: "iconSrc/product9.png" },
    { id: 10, name: "Salsa catsup", price: 30.99, image: "iconSrc/product10.png" },
];



function openProductModal() {
    const modal = document.getElementById('productModal');
    const productList = document.getElementById('productList');
    productList.innerHTML = '';

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}" style="width: 100px; height: 100px;">
            <p>${product.name} - $${product.price.toFixed(2)}</p>
            <button class="remove-product-button" onclick="addToCart(${product.id})">Añadir al carrito</button>
        `;
        productList.appendChild(productElement);
    });

    modal.style.display = 'flex';
    modal.classList.add('show');
}

function closeProductModal() {
    const modal = document.getElementById('productModal');
    modal.style.display = 'none';
    modal.classList.remove('show');
}
const cart = JSON.parse(localStorage.getItem('cart')) || [];


function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart)); // Guardar carrito en localStorage

    const addToCartModal = document.getElementById('addToCartModal');
    addToCartModal.style.display = 'flex';
    addToCartModal.classList.add('show');

    setTimeout(() => {
        closeAddToCartModal();
    }, 2000);

    updateCartUI();
}


function updateCartUI() {
    const cartContainer = document.getElementById('cartContainer');
    cartContainer.innerHTML = '';

    cart.forEach((product, index) => {
        const productElement = document.createElement('div');
        productElement.innerHTML = `
            <p>${product.name} - $${product.price.toFixed(2)}</p>
            <button class="remove-product-button" onclick="removeFromCart(${index})">Eliminar</button>
        `;
        cartContainer.appendChild(productElement);
    });
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart)); // Actualizar localStorage
    updateCartUI();
}


function closeAddToCartModal() {
    const modal = document.getElementById('addToCartModal');
    modal.style.display = 'none';
    modal.classList.remove('show');
}

function proceedToCheckout() {
    const modal = document.getElementById('productModal');
    modal.style.display = 'none';
    modal.classList.remove('show');
    showInvoice();
    showPaymentMethods();
}