const API_URL = 'http://localhost:3000/api';

// Auth API
export const authAPI = {
    register: async (userData) => {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        return response.json();
    },

    login: async (credentials) => {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        });
        return response.json();
    },

    getProfile: async (token) => {
        const response = await fetch(`${API_URL}/auth/profile`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.json();
    },

    updateProfile: async (token, userData) => {
        const response = await fetch(`${API_URL}/auth/profile`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        return response.json();
    }
};

// Products API
export const productsAPI = {
    getAll: async (params = {}) => {
        const queryString = new URLSearchParams(params).toString();
        const response = await fetch(`${API_URL}/products?${queryString}`);
        return response.json();
    },

    getById: async (id) => {
        const response = await fetch(`${API_URL}/products/${id}`);
        return response.json();
    }
};

// Orders API
export const ordersAPI = {
    create: async (token, orderData) => {
        const response = await fetch(`${API_URL}/orders`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        });
        return response.json();
    },

    getMyOrders: async (token) => {
        const response = await fetch(`${API_URL}/orders/my-orders`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.json();
    },

    getById: async (token, id) => {
        const response = await fetch(`${API_URL}/orders/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.json();
    }
};

// Stripe API
export const stripeAPI = {
    createPaymentIntent: async (token, orderId) => {
        const response = await fetch(`${API_URL}/stripe/create-payment-intent`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ orderId })
        });
        return response.json();
    }
}; 