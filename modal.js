document.addEventListener('DOMContentLoaded', () => {
    const logoutBtn = document.getElementById('logoutBtn');
    const username = sessionStorage.getItem('username'); 

    if (username) {
        logoutBtn.textContent = `Cerrar Sesión (${username})`;
    } else {
        logoutBtn.style.display = 'none';
    }
});

function showInstructions() {
    const instructionsModal = document.getElementById('instructionsModal');
    instructionsModal.style.display = 'flex';
    instructionsModal.classList.add('show');
}


function showModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'flex';
    modal.classList.add('show');
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'none';
    modal.classList.remove('show');
}

// Cerrar modal al hacer clic fuera del contenido
window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal.show');
    modals.forEach(modal => {
        if (event.target == modal) {
            closeModal(modal.id);
        }
    });
}
