document.addEventListener('DOMContentLoaded', () => {
    const logoutBtn = document.getElementById('logoutBtn');
    const username = sessionStorage.getItem('username');

    if (username) {
        logoutBtn.textContent = `Cerrar Sesión (${username})`;
    } else {
        logoutBtn.style.display = 'none';
    }
});

function login(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Obtener usuarios guardados
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Verificar credenciales
    const user = users.find(user => user.username === username && user.password === password);
    
    if (user) {
        sessionStorage.setItem('loggedIn', 'true');
        sessionStorage.setItem('username', username); // Opcional, si quieres mostrar el nombre del usuario
        window.location.href = 'tienda.html';
    } else {
        showLoginErrorModal();
    }
}


function register(event) {
    event.preventDefault();
    const newUsername = document.getElementById('newUsername').value;
    const newEmail = document.getElementById('newEmail').value;
    const newPassword = document.getElementById('newPassword').value;

    // Obtener usuarios existentes
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Verificar si el usuario ya existe
    const userExists = users.some(user => user.username === newUsername);
    if (userExists) {
        alert('El nombre de usuario ya está en uso.');
        return;
    }

    // Agregar nuevo usuario
    users.push({ username: newUsername, email: newEmail, password: newPassword });
    localStorage.setItem('users', JSON.stringify(users));

    showRegistrationSuccessModal();
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 3000);
}

function logout() {
    sessionStorage.removeItem('loggedIn');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('email');
    window.location.href = 'index.html';
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