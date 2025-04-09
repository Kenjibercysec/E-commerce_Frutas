let products = [];
let filteredProducts = [];
let currentPage = 1;
let productsPerPage = 16;

fetch('products.json')
    .then(response => response.json())
    .then(data => {
        products = data.products;
        filteredProducts = products;
        createPagination();
        displayProducts();
        cart.updateCartUI(); // Initialize cart count
    });

function displayProducts(page = 1) {
    const productContainer = document.getElementById('product-list');
    productContainer.innerHTML = '';
    const start = (page - 1) * productsPerPage;
    const end = start + productsPerPage;
    const paginatedProducts = filteredProducts.slice(start, end);

    paginatedProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${JSON.stringify(product).replace(/"/g, '&quot;')})" class="add-to-cart">Add to Cart</button>
        `;
        productContainer.appendChild(productCard);
    });
}

function addToCart(product) {
    cart.addItem(product);
    showNotification(`${product.name} added to cart!`);
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

function createPagination() {
    const pagination = document.getElementById('pagination');
    const totalProducts = filteredProducts.length;
    const totalPages = Math.ceil(totalProducts / productsPerPage);

    pagination.innerHTML = '';
    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.onclick = () => {
            currentPage = i;
            displayProducts(i);
        };
        pagination.appendChild(button);
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    function filterProducts(category) {
        if (category === 'all') {
            filteredProducts = products;
        } else {
            filteredProducts = products.filter(product => product.category === category);
        }
        currentPage = 1;
        createPagination();
        displayProducts();
    }
  
    const categoryLinks = document.querySelectorAll('.category');
    categoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const category = e.target.getAttribute('data-category');
            filterProducts(category);
        });
    });

    // Setup cart link
    const cartLink = document.querySelector('.cart-link');
    cartLink.addEventListener('click', (e) => {
        e.preventDefault();
        if (cart.items.length > 0) {
            window.location.href = 'checkout.html';
        } else {
            showNotification('Your cart is empty!');
        }
    });
});

function setActiveButton(clickedButton) {
    const buttons = document.querySelectorAll('.filter button, .dropdown-content a');
    buttons.forEach(button => {
        button.classList.remove('active');
    });
    clickedButton.classList.add('active');
}

function filterProducts(category, button) {
    if (category === 'all') {
        filteredProducts = products;
    } else {
        filteredProducts = products.filter(product => product.category === category);
    }
    currentPage = 1;
    createPagination();
    displayProducts();
    setActiveButton(button); 
}

function sortProductsByName(button) {
    filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
    displayProducts(currentPage);
    setActiveButton(button); 
}

function sortProductsByPrice(button) {
    filteredProducts.sort((a, b) => b.price - a.price);
    displayProducts(currentPage);
    setActiveButton(button); 
}

function updateProductsPerPage() {
    const select = document.getElementById('productsPerPage');
    productsPerPage = parseInt(select.value);
    currentPage = 1;
    createPagination();
    displayProducts();
}

function validateEmail(event) {
    event.preventDefault();
    const emailInput = document.getElementById('email');
    const email = emailInput.value;
    const errorMessage = document.getElementById('error-message');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        errorMessage.style.display = 'block';
        emailInput.focus();
    } else {
        errorMessage.style.display = 'none';
        alert('Subscription successful!');
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('newsletter-form').addEventListener('submit', validateEmail);
});

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.footer-feature').forEach(feature => {
        feature.addEventListener('click', () => {
            alert(`You clicked on ${feature.querySelector('p').textContent}`);
        });
    });

    document.getElementById('resource1').addEventListener('click', (event) => {
        event.preventDefault();
        alert('Resource 1 functionality');
    });

    document.getElementById('resource2').addEventListener('click', (event) => {
        event.preventDefault();
        alert('Resource 2 functionality');
    });

    document.getElementById('resource3').addEventListener('click', (event) => {
        event.preventDefault();
        alert('Resource 3 functionality');
    });
});