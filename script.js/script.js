let productos = [
    { id: 25, producto: "Chance", precio: 3500, sorteo: "La Culona día", premio: 10000000, imagen: "chance.png" },
    { id: 2, producto: "Super Astro", precio: 1500, sorteo: "Astro Luna", premio: 26000000, imagen: "super-astro.png" },
    { id: 15, producto: "Billonario 4C", precio: 5000, sorteo: "El Siriano", premio: 36500000, imagen: "billonario.png" },
    { id: 7, producto: "Lotería", precio: 3000, sorteo: "Del Huila", premio: 96000000, imagen: "loteria.png" },
    { id: 9, producto: "Play 4C", precio: 6000, sorteo: "Boyacá", premio: 65000000, imagen: "play-4c.png" }
];

console.log(JSON.stringify(productos));

let opcionesCanje = [
    { id: 1, nombre: "Viaje a San Andrés", puntos: 100 },
    { id: 2, nombre: "Recarga de $50,000", puntos: 50 },
    { id: 3, nombre: "Entrada a cine", puntos: 10 },
    { id: 4, nombre: "Cena para dos", puntos: 30 },
    { id: 5, nombre: "Día de spa", puntos: 40 },
    { id: 6, nombre: "Curso de fotografía", puntos: 60 },
    { id: 7, nombre: "Bono de compras", puntos: 25 },
    { id: 8, nombre: "Concierto VIP", puntos: 80 },
    { id: 9, nombre: "Clase de cocina", puntos: 20 },
    { id: 10, nombre: "Tour en helicóptero", puntos: 150 }
];


let usuarioActual = null;
let saldoUsuario = 0;
let cart = {}; 
let historialCompra = [];

// Los elementos del DOM - Tratarlo con cariño 
const loginSection = document.getElementById('login-section');
const registerSection = document.getElementById('register-section');
const storeSection = document.getElementById('store-section');
const rechargeSection = document.getElementById('recharge-section');
const redeemPointsSection = document.getElementById('redeem-points-section');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const rechargeForm = document.getElementById('recharge-form');
const showRegister = document.getElementById('show-register');
const showLogin = document.getElementById('show-login');
const logoutButton = document.getElementById('logout');
const productContainer = document.getElementById('product-container');
const rechargeButton = document.getElementById('recharge-button');
const backToStoreButton = document.getElementById('back-to-store');
const backToStoreFromRedeemButton = document.getElementById('back-to-store-from-redeem');
const checkoutButton = document.getElementById('checkout-button');
const redeemPointsButton = document.getElementById('redeem-points-button');
const popup = document.getElementById('popup');
const popupMessage = document.getElementById('popup-message');
const popupClose = document.getElementById('popup-close');

function showPopup(message) {
    popupMessage.textContent = message;
    popup.style.display = 'flex';
}
// APARTADO DE FUNCIONES
function showSection(section) {
    loginSection.style.display = 'none';
    registerSection.style.display = 'none';
    storeSection.style.display = 'none';
    rechargeSection.style.display = 'none';
    redeemPointsSection.style.display = 'none';
    section.style.display = 'block';
}

function updateBalanceDisplay() {
    const balanceElement = document.getElementById('balance');
    balanceElement.textContent = saldoUsuario.toLocaleString();
}

function updateUserPoints(amount) {
    if (amount >= 5000) {
        usuarioActual.points = (usuarioActual.points || 0) + 1;
        document.getElementById('user-points').textContent = usuarioActual.points;
        
        const users = JSON.parse(localStorage.getItem('users'));
        const userIndex = users.findIndex(u => u.username === usuarioActual.username);
        users[userIndex].points = usuarioActual.points;
        localStorage.setItem('users', JSON.stringify(users));
    }
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <img src="${product.imagen}" alt="${product.producto}" class="product-image">
        <h3>${product.producto}</h3>
        <p>Precio: $${product.precio.toLocaleString()}</p>
        <p>Sorteo: ${product.sorteo}</p>
        <p>Premio: $${product.premio.toLocaleString()}</p>
        <button class="buy-button" data-id="${product.id}">Comprar</button>
        <button class="add-to-cart-button" data-id="${product.id}">Añadir al Carrito</button>
    `;
    card.querySelector('.buy-button').addEventListener('click', () => buyProduct(product));
    card.querySelector('.add-to-cart-button').addEventListener('click', () => addToCart(product));
    return card;
}

function displayProducts() {
    productContainer.innerHTML = '';
    productos.forEach(product => {
        productContainer.appendChild(createProductCard(product));
    });
}

function addToCart(product) {
    if (cart[product.id]) {
        cart[product.id].quantity += 1;
    } else {
        cart[product.id] = { ...product, quantity: 1 };
    }
    updateCartDisplay();
    showPopup(`${product.producto} añadido al carrito`);
}

function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    cartItems.innerHTML = '';
    let total = 0;
    
    Object.values(cart).forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${item.producto} - $${item.precio.toLocaleString()} x ${item.quantity}</span>
            <button class="remove-item" data-id="${item.id}">-</button>
            <button class="add-item" data-id="${item.id}">+</button>
        `;
        li.querySelector('.remove-item').addEventListener('click', () => removeFromCart(item.id));
        li.querySelector('.add-item').addEventListener('click', () => addToCart(item));
        cartItems.appendChild(li);
        total += item.precio * item.quantity;
    });
    
    cartTotal.textContent = total.toLocaleString();
}
function removeFromCart(productId) {
    if (cart[productId].quantity > 1) {
        cart[productId].quantity -= 1;
    } else {
        delete cart[productId];
    }
    updateCartDisplay();
}

function buyProduct(product) {
    if (saldoUsuario >= product.precio) {
        saldoUsuario -= product.precio;
        updateBalanceDisplay();
        
        const purchase = {
            date: new Date().toLocaleString(),
            items: [product],
            total: product.precio
        };
        
        historialCompra.push(purchase);
        updatePurchaseHistory();
        
        if (product.precio >= 10000) {
            updateUserPoints(product.precio);
        }
        
        showPopup(`Has comprado ${product.producto} por $${product.precio.toLocaleString()}. ¡Buena suerte!`);
    } else {
        showPopup('Saldo insuficiente. Por favor, recarga tu saldo.');
    }
}

function checkout() {
    if (Object.keys(cart).length === 0) {
        showPopup('El carrito está vacío');
        return;
    }
    
    let total = Object.values(cart).reduce((sum, item) => sum + item.precio * item.quantity, 0);
    
    if (saldoUsuario >= total) {
        saldoUsuario -= total;
        updateBalanceDisplay();
        
        const purchase = {
            date: new Date().toLocaleString(),
            items: Object.values(cart).map(item => ({
                producto: item.producto,
                cantidad: item.quantity,
                precio: item.precio
            })),
            total: total
        };
        
        historialCompra.push(purchase);
        updatePurchaseHistory();
        
        if (total >= 10000) {
            updateUserPoints(total);
        }
        
        cart = {};
        updateCartDisplay();
        
        showPopup(`Compra realizada por $${total.toLocaleString()}. ¡Gracias por tu compra!`);
    } else {
        showPopup('Saldo insuficiente. Por favor, recarga tu saldo.');
    }
}
function updatePurchaseHistory() {
    const historyList = document.getElementById('history-list');
    historyList.innerHTML = '';
    
    historialCompra.forEach(purchase => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${purchase.date}</strong><br>
            ${purchase.items.map(item => `${item.producto} x${item.cantidad} - $${(item.precio * item.cantidad).toLocaleString()}`).join('<br>')}<br>
            Total: $${purchase.total.toLocaleString()}
        `;
        historyList.appendChild(li);
    });
}

function displayRedeemOptions() {
    const redeemOptionsContainer = document.getElementById('redeem-options');
    redeemOptionsContainer.innerHTML = '';

    opcionesCanje.forEach(option => {
        const div = document.createElement('div');
        div.className = 'redeem-option';
        div.innerHTML = `
            <h3>${option.nombre}</h3>
            <p>Puntos requeridos: ${option.puntos}</p>
            <button class="redeem-button" data-id="${option.id}">Canjear</button>
        `;
        div.querySelector('.redeem-button').addEventListener('click', () => redeemOption(option));
        redeemOptionsContainer.appendChild(div);
    });
}

function redeemOption(option) {
    if (usuarioActual.points >= option.puntos) {
        usuarioActual.points -= option.puntos;
        document.getElementById('user-points').textContent = usuarioActual.points;

        const users = JSON.parse(localStorage.getItem('users'));
        const userIndex = users.findIndex(u => u.username === usuarioActual.username);
        users[userIndex].points = usuarioActual.points;
        localStorage.setItem('users', JSON.stringify(users));

        showPopup(`Has canjeado "${option.nombre}" por ${option.puntos} puntos.`);
    } else {
        showPopup('No tienes suficientes puntos para canjear esta opción.');
    }
}

function rechargeBalance(amount) {
    saldoUsuario += amount;
    updateBalanceDisplay();
    const users = JSON.parse(localStorage.getItem('users'));
    const userIndex = users.findIndex(u => u.username === usuarioActual.username);
    users[userIndex].balance = saldoUsuario;
    localStorage.setItem('users', JSON.stringify(users));
}

fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(responder => responder.json())
      .then(salidaInfo => console.log(salidaInfo))

        






// lamados de los eventos 
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        usuarioActual = user;
        saldoUsuario = user.balance || 0;
        updateBalanceDisplay();
        document.getElementById('user-points').textContent = user.points || 0;
        showSection(storeSection);
        displayProducts();
        updatePurchaseHistory();
    } else {
        showPopup('Usuario o contraseña incorrectos');
    }
});

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('new-username').value;
    const password = document.getElementById('new-password').value;
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.some(u => u.username === username)) {
        showPopup('El usuario ya existe');
    } else {
        const newUser = { username, password, balance: 0, points: 0 };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        showPopup('Registro exitoso. Por favor, inicia sesión.');
        showSection(loginSection);}
    });
    
    showRegister.addEventListener('click', () => showSection(registerSection));
    showLogin.addEventListener('click', () => showSection(loginSection));
    popupClose.addEventListener('click', () => {
        popup.style.display = 'none';
    });

    logoutButton.addEventListener('click', () => {
        usuarioActual = null;
        saldoUsuario = 0;
        cart = [];
        historialCompra = [];
        showSection(loginSection);
        showPopup('Has cerrado sesión exitosamente.');
    });
    
    rechargeButton.addEventListener('click', () => showSection(rechargeSection));
    
    backToStoreButton.addEventListener('click', () => showSection(storeSection));
    
    backToStoreFromRedeemButton.addEventListener('click', () => showSection(storeSection));
    
    rechargeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const amount = parseInt(document.getElementById('recharge-amount').value);
        const password = document.getElementById('recharge-password').value;
        
        if (password === usuarioActual.password) {
            rechargeBalance(amount);
            updateUserPoints(amount);
            document.getElementById('recharge-amount').value = '';
            document.getElementById('recharge-password').value = '';
            showPopup(`Has recargado $${amount.toLocaleString()} exitosamente.`);
            showSection(storeSection);
        } else {
            showPopup('Contraseña incorrecta. No se pudo realizar la recarga.');
        }
    });
    
    checkoutButton.addEventListener('click', checkout);
    
    redeemPointsButton.addEventListener('click', () => {
        showSection(redeemPointsSection);
        displayRedeemOptions();
    });

    // llamados de las funciones
    showSection(loginSection);
