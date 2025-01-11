// modals.js
document.addEventListener('DOMContentLoaded', () => {
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

function showInstructions() {
    const modal = document.getElementById('instructionsModal');
    modal.style.display = 'flex';
    modal.classList.add('show');
}

function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
        modal.classList.add('show');
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        modal.classList.remove('show');
    }
}

// Cerrar modal al hacer clic fuera del contenido
window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal.show');
    modals.forEach(modal => {
        if (event.target === modal) {
            closeModal(modal.id);
        }
    });

    const productModal = document.getElementById('productModal');
    const invoiceModal = document.getElementById('invoiceModal');
    const addToCartModal = document.getElementById('addToCartModal');
    const purchaseHistoryModal = document.getElementById('purchaseHistoryModal');
    
    if (event.target == productModal) {
        closeModal('productModal');
    }
    if (event.target == invoiceModal) {
        closeModal('invoiceModal');
    }
    if (event.target == addToCartModal) {
        closeModal('addToCartModal');
    }
    if (event.target == purchaseHistoryModal) {
        closeModal('purchaseHistoryModal');
    }
}

function showLoginErrorModal() {
    const modal = document.getElementById('loginErrorModal');
    modal.style.display = 'block';
    setTimeout(() => {
        modal.style.display = 'none';
    }, 3000);
}

function showRegistrationSuccessModal() {
    const modal = document.getElementById('myModal');
    modal.style.display = 'block';
    setTimeout(() => {
        modal.style.display = 'none';
    }, 3000);
}