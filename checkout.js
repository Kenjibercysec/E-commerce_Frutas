document.addEventListener('DOMContentLoaded', () => {
    displayCartItems();
    setupCheckoutForm();
});

function displayCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    const orderTotalElement = document.getElementById('order-total');
    
    if (cart.items.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty</p>';
        orderTotalElement.textContent = '0.00';
        return;
    }

    cartItemsContainer.innerHTML = cart.items.map(item => `
        <div class="cart-item">
            <div class="item-info">
                <h4>${item.name}</h4>
                <p>$${item.price.toFixed(2)} x ${item.quantity}</p>
            </div>
            <div class="item-total">
                $${(item.price * item.quantity).toFixed(2)}
            </div>
        </div>
    `).join('');

    orderTotalElement.textContent = cart.getTotal().toFixed(2);
}

function setupCheckoutForm() {
    const checkoutForm = document.getElementById('checkout-form');
    
    checkoutForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = {
            shipping: {
                fullName: document.getElementById('full-name').value,
                email: document.getElementById('email').value,
                address: document.getElementById('address').value,
                city: document.getElementById('city').value,
                state: document.getElementById('state').value,
                zip: document.getElementById('zip').value
            },
            payment: {
                cardNumber: document.getElementById('card-number').value,
                expiry: document.getElementById('expiry').value,
                cvv: document.getElementById('cvv').value
            },
            items: cart.items,
            total: cart.getTotal()
        };

        try {
            // In a real application, you would send this to your backend API
            // For now, we'll simulate a successful order
            const response = await simulateOrderProcessing(formData);
            
            if (response.success) {
                cart.clearCart();
                alert('Order placed successfully! Thank you for your purchase.');
                window.location.href = 'index.html';
            } else {
                alert('There was an error processing your order. Please try again.');
            }
        } catch (error) {
            console.error('Error processing order:', error);
            alert('There was an error processing your order. Please try again.');
        }
    });
}

// Simulated API call - replace with actual API endpoint
async function simulateOrderProcessing(orderData) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real application, you would:
    // 1. Validate the payment information
    // 2. Process the payment through a payment gateway
    // 3. Save the order to your database
    // 4. Send confirmation emails
    
    return {
        success: true,
        orderId: Math.random().toString(36).substr(2, 9),
        timestamp: new Date().toISOString()
    };
} 