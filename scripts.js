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
        `;
        productContainer.appendChild(productCard);
    });
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

function sortProductsByName() {
    filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
    displayProducts(currentPage);
}

function sortProductsByPrice() {
    filteredProducts.sort((a, b) => b.price - a.price);
    displayProducts(currentPage);
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
    const emailError = document.getElementById('emailError');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailPattern.test(emailInput.value)) {
        emailError.textContent = '';
        alert('Thank you for subscribing!');
    } else {
        emailError.textContent = 'Please enter a valid email address.';
    }
}
document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('newsletter-form').addEventListener('submit', validateEmail);
});

function validateEmail(event) {
    event.preventDefault();
    const emailInput = document.getElementById('email');
    const email = emailInput.value;
    const errorMessage = document.getElementById('error-message');

    // Expressão regular para validar o email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        errorMessage.style.display = 'block';
        emailInput.focus();
    } else {
        errorMessage.style.display = 'none';
        alert('Subscription successful!'); // substituir isso pelo código de inscrição real caso necessario
        // document.getElementById('newsletter-form').submit(); // Submete o formulário se a validação for bem-sucedida
    }
}



// Adicionar funcionalidades interativas no footer
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
