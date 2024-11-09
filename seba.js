document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname;

    if (currentPage === '/tienda.html') {
        const loggedIn = sessionStorage.getItem('loggedIn');
        if (!loggedIn) {
            showLoginAlert('Debes iniciar sesión para acceder a la tienda.');
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000); // Redirigir después de mostrar el mensaje por un corto tiempo
        }
    }

    const logoutBtn = document.getElementById('logoutBtn');
    const username = sessionStorage.getItem('username');

    if (username) {
        logoutBtn.textContent = `Cerrar Sesión (${username})`;
    } else {
        logoutBtn.style.display = 'none';
    }
});

function showLoginAlert(message) {
    const modal = document.getElementById('loginAlertModal');
    const messageElement = document.getElementById('loginAlertMessage');
    messageElement.textContent = message;
    modal.style.display = 'flex';
    modal.classList.add('show');
}

function closeLoginAlertModal() {
    const modal = document.getElementById('loginAlertModal');
    modal.style.display = 'none';
    modal.classList.remove('show');
}

    
    
// Función para mostrar instrucciones en una ventana flotante
function showInstructions() {
    const instructions = `
        <div class="modal show" id="instructionsModal">
            <div class="modal-content">
                <span class="close" onclick="closeModal('instructionsModal')">&times;</span>
                <h2>Cómo Funciona</h2>
                <p>1. Navega por las categorías para encontrar tus productos.</p>
                <p>2. Añade productos al carrito con el botón "Añadir al Carrito".</p>
                <p>3. Revisa tu carrito y procede al pago.</p>
                <p>4. Completa la información de envío y realiza tu pago.</p>
                <p>5. ¡Espera a recibir tus productos en casa!</p>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', instructions);
}

// Función para cerrar la ventana flotante
window.closeModal = () => {
    const modal = document.querySelector('.modal.show');
    if (modal) {
        modal.parentNode.removeChild(modal);
    }
}

// Cerrar modal al hacer clic fuera del contenido
window.onclick = function(event) {
    const modal = document.querySelector('.modal.show');
    if (event.target == modal) {
        closeModal();
    }
}


function logout() {
    sessionStorage.removeItem('loggedIn');  // Eliminar el estado de logueo
    sessionStorage.removeItem('username');  // Eliminar el nombre de usuario
    sessionStorage.removeItem('email');     // Eliminar el email del usuario
    window.location.href = 'login.html';    // Redirigir a la página de inicio de sesión
}


function login(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Obtener los datos guardados en sessionStorage
    const storedUsername = sessionStorage.getItem('username');
    const storedPassword = sessionStorage.getItem('password');

    // Validar las credenciales del usuario
    if (username === storedUsername && password === storedPassword) {
        sessionStorage.setItem('loggedIn', 'true');  // Guardar estado de logueo en sessionStorage
        window.location.href = 'tienda.html';  // Redirigir a la tienda después de un inicio de sesión exitoso
    } else {
        // Mostrar el modal de error de login
        var modal = document.getElementById("loginErrorModal");
        modal.style.display = "block";

        // Ocultar la ventana modal después de 3 segundos
        setTimeout(function() {
            modal.style.display = "none";
        }, 3000);
    }
}

function register(event) {
    event.preventDefault();
    const newUsername = document.getElementById('newUsername').value;
    const newEmail = document.getElementById('newEmail').value;
    const newPassword = document.getElementById('newPassword').value;

    // Guardar los datos del usuario en sessionStorage
    sessionStorage.setItem('username', newUsername);
    sessionStorage.setItem('email', newEmail);
    sessionStorage.setItem('password', newPassword);

    // Mostrar la ventana modal del registro exitoso
    var modal = document.getElementById("myModal");
    modal.style.display = "block";

    // Ocultar la ventana modal después de 3 segundos y redirigir al login
    setTimeout(function() {
        modal.style.display = "none";
        window.location.href = 'login.html';
    }, 3000);
}

document.addEventListener('DOMContentLoaded', () => {
    const logoutBtn = document.getElementById('logoutBtn');
    const username = sessionStorage.getItem('username');

    if (username) {
        logoutBtn.textContent = `Cerrar Sesión (${username})`;
    } else {
        logoutBtn.style.display = 'none';
    }

    // Código del resto de tus funcionalidades...
});

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

// Función para abrir el modal de productos
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

// Función para cerrar el modal de productos
function closeProductModal() {
    const modal = document.getElementById('productModal');
    modal.style.display = 'none';
    modal.classList.remove('show');
}

// Carrito de compras
const cart = [];

// Función para añadir al carrito
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);

    const addToCartModal = document.getElementById('addToCartModal');
    addToCartModal.style.display = 'flex';
    addToCartModal.classList.add('show');

    setTimeout(() => {
        closeAddToCartModal();
    }, 2000);

    updateCartUI();
}

function updateCartUI() {
    const cartContainer = document.getElementById('cartContainer'); // Asegúrate de tener este contenedor en tu HTML
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
    updateCartUI();
}

// Función para cerrar el modal de confirmación de adición al carrito
function closeAddToCartModal() {
    const modal = document.getElementById('addToCartModal');
    modal.style.display = 'none';
    modal.classList.remove('show');
}

// Función para proceder al pago y mostrar la factura
function proceedToCheckout() {
    const modal = document.getElementById('productModal');
    modal.style.display = 'none';
    modal.classList.remove('show');
    showInvoice();
}
const purchaseHistory = JSON.parse(localStorage.getItem('purchaseHistory')) ||
[];

function showPurchaseHistoryModal() {
    const purchaseHistoryModal = document.getElementById('purchaseHistoryModal');
    const purchaseList = document.getElementById('purchaseList');
    purchaseList.innerHTML = '';

    purchaseHistory.forEach(purchase => {
        const purchaseElement = document.createElement('div');
        const purchaseDate = new Date(purchase.date);
        purchaseElement.innerHTML = `
            <p>Fecha: ${purchaseDate.toLocaleDateString()}</p>
            <p>Hora: ${purchaseDate.toLocaleTimeString()}</p>
            <p>Cantidad de Productos: ${purchase.items.length}</p>
            <p>Monto Total: $${purchase.total.toFixed(2)}</p>
        `;
        purchaseList.appendChild(purchaseElement);
    });

    purchaseHistoryModal.style.display = 'block';
    purchaseHistoryModal.classList.add('show');  // Añadir la clase 'show' para el modal
}

function closePurchaseHistoryModal() {
    const purchaseHistoryModal = document.getElementById('purchaseHistoryModal');
    purchaseHistoryModal.style.display = 'none';
    purchaseHistoryModal.classList.remove('show');  // Quitar la clase 'show' del modal
}

function clearPurchaseHistory() {
    // Borrar el historial de compras del almacenamiento local
    localStorage.removeItem('purchaseHistory');
    purchaseHistory.length = 0; // Vaciar el arreglo en memoria

    // Actualizar la interfaz del historial de compras
    const purchaseList = document.getElementById('purchaseList');
    purchaseList.innerHTML = '<p>El historial de compras ha sido borrado.</p>';

    // Cerrar el modal después de 2 segundos
    setTimeout(() => {
        closePurchaseHistoryModal();
    }, 2000);
}
// Función para mostrar la factura
function showInvoice() {
    const invoiceModal = document.getElementById('invoiceModal');
    const invoiceDetails = document.getElementById('invoiceDetails');
    invoiceDetails.innerHTML = '<h3>Gracias por tu compra!</h3>';
    let total = 0;

    cart.forEach(product => {
        invoiceDetails.innerHTML += `<p>${product.name} - $${product.price.toFixed(2)}</p>`;
        total += product.price;
    });

    invoiceDetails.innerHTML += `<p>Total: $${total.toFixed(2)}</p>`;

    // Guardar compra en el historial de compras
    const newPurchase = { date: new Date(), items: [...cart], total };
    purchaseHistory.push(newPurchase);
    localStorage.setItem('purchaseHistory', JSON.stringify(purchaseHistory));

    invoiceModal.style.display = 'flex';
    invoiceModal.classList.add('show');
    cart.length = 0;  // Vaciar el carrito después de la compra
}

// Función para cerrar el modal de la factura
function closeInvoiceModal() {
    const modal = document.getElementById('invoiceModal');
    modal.style.display = 'none';
    modal.classList.remove('show');
    cart.length = 0;  // Vaciar el carrito después de la compra
}

// Cerrar modal al hacer clic fuera del contenido
window.onclick = function(event) {
    const productModal = document.getElementById('productModal');
    const invoiceModal = document.getElementById('invoiceModal');
    const addToCartModal = document.getElementById('addToCartModal');
    const purchaseHistoryModal = document.getElementById('purchaseHistoryModal');
    
    if (event.target == productModal) {
        closeProductModal();
    }
    if (event.target == invoiceModal) {
        closeInvoiceModal();
    }
    if (event.target == addToCartModal) {
        closeAddToCartModal();
    }
    if (event.target == purchaseHistoryModal) {
        closePurchaseHistoryModal();
    }
}