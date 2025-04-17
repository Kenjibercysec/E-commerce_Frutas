import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
  }),
  
  getters: {
    totalItems: (state) => state.items.reduce((total, item) => total + item.quantity, 0),
    totalPrice: (state) => {
      const total = state.items.reduce((total, item) => {
        const itemPrice = parseFloat(item.price) || 0;
        const itemQuantity = parseInt(item.quantity) || 0;
        return total + (itemPrice * itemQuantity);
      }, 0);
      return parseFloat(total.toFixed(2));
    },
  },
  
  actions: {
    addToCart(product) {
      const existingItem = this.items.find(item => item.id === product.id)
      
      if (existingItem) {
        existingItem.quantity++
      } else {
        this.items.push({
          ...product,
          quantity: 1
        })
      }
    },
    
    removeFromCart(productId) {
      this.items = this.items.filter(item => item.id !== productId)
    },
    
    updateQuantity(productId, quantity) {
      const item = this.items.find(item => item.id === productId)
      if (item) {
        item.quantity = Math.max(1, parseInt(quantity) || 1)
      }
    },
    
    clearCart() {
      this.items = []
    }
  },
  
  persist: true
}) 