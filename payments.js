// payments.js
const purchaseHistory = JSON.parse(localStorage.getItem('purchaseHistory')) || [];

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
            <p>Método de Pago: ${purchase.method}</p>
            <p>Cantidad de Productos: ${purchase.items.length}</p>
            <p>Monto Total: $${purchase.total.toFixed(2)}</p>
        `;
        purchaseList.appendChild(purchaseElement);
    });

    purchaseHistoryModal.style.display = 'block';
    purchaseHistoryModal.classList.add('show');
}

function closePurchaseHistoryModal() {
    const purchaseHistoryModal = document.getElementById('purchaseHistoryModal');
    purchaseHistoryModal.style.display = 'none';
    purchaseHistoryModal.classList.remove('show');
}

function clearPurchaseHistory() {
    localStorage.removeItem('purchaseHistory');
    showPurchaseHistoryModal();
}

function showPaymentMethods() {
    const paymentMethodsSection = document.getElementById('paymentMethodsSection');
    if (paymentMethodsSection.style.display === 'none') {
        paymentMethodsSection.style.display = 'block';
        document.getElementById('proceedToCheckoutButton').style.display = 'none';
    } else {
        paymentMethodsSection.style.display = 'none';
    }
}

function proceedToPayment() {
    const selectedPaymentMethod = document.querySelector('input[name="payment-method"]:checked').value;

    switch(selectedPaymentMethod) {
        case 'credit-card':
            processCreditCardPayment();
            break;
        case 'paypal':
            processPayPalPayment();
            break;
        case 'bank-transfer':
            processBankTransferPayment();
            break;
        case 'cryptocurrency':
            processCryptocurrencyPayment();
            break;
        default:
            alert('Por favor, seleccione un método de pago.');
    }
}

function processCreditCardPayment() {
    alert('Procesando el pago con tarjeta de crédito...');
    addToPurchaseHistory('Tarjeta de Crédito');
}

function processPayPalPayment() {
    alert('Redirigiendo a PayPal...');
    addToPurchaseHistory('PayPal');
}

function processBankTransferPayment() {
    alert('Procesando el pago con transferencia bancaria...');
    addToPurchaseHistory('Transferencia Bancaria');
}

function processCryptocurrencyPayment() {
    alert('Procesando el pago con criptomonedas...');
    addToPurchaseHistory('Criptomonedas');
}

function addToPurchaseHistory(paymentMethod) {
    const purchaseHistory = JSON.parse(localStorage.getItem('purchaseHistory')) || [];
    const purchaseItem = {
        method: paymentMethod,
        date: new Date(),
        items: cart,
        total: cart.reduce((total, product) => total + product.price, 0)
    };

    purchaseHistory.push(purchaseItem);
    localStorage.setItem('purchaseHistory', JSON.stringify(purchaseHistory));

    cart.length = 0; // Vaciar el carrito
    updateCartUI();

    alert('Compra realizada con éxito.');
}

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

    const newPurchase = { date: new Date(), items: [...cart], total };
    purchaseHistory.push(newPurchase);
    localStorage.setItem('purchaseHistory', JSON.stringify(purchaseHistory));

    invoiceModal.style.display = 'flex';
    invoiceModal.classList.add('show');
    cart.length = 0; // Vaciar el carrito después de la compra
}

function closeInvoiceModal() {
    const modal = document.getElementById('invoiceModal');
    modal.style.display = 'none';
    modal.classList.remove('show');
    cart.length = 0; // Vaciar el carrito después de la compra
}

