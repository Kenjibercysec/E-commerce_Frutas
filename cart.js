class ShoppingCart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('cart')) || [];
    }

    addItem(product, quantity = 1) {
        const existingItem = this.items.find(item => item.name === product.name);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push({
                ...product,
                quantity
            });
        }
        
        this.saveCart();
        this.updateCartUI();
    }

    removeItem(productName) {
        this.items = this.items.filter(item => item.name !== productName);
        this.saveCart();
        this.updateCartUI();
    }

    updateQuantity(productName, quantity) {
        const item = this.items.find(item => item.name === productName);
        if (item) {
            item.quantity = quantity;
            if (item.quantity <= 0) {
                this.removeItem(productName);
            } else {
                this.saveCart();
            }
        }
        this.updateCartUI();
    }

    getTotal() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    getItemCount() {
        return this.items.reduce((count, item) => count + item.quantity, 0);
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.items));
    }

    updateCartUI() {
        const cartCount = document.getElementById('cart-count');
        if (cartCount) {
            cartCount.textContent = this.getItemCount();
        }
    }

    clearCart() {
        this.items = [];
        this.saveCart();
        this.updateCartUI();
    }
}

const cart = new ShoppingCart();

// Export the cart instance
window.cart = cart; 