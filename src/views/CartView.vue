<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold mb-8 text-gradient">Your Cart</h1>

    <div v-if="cartStore.items.length === 0" class="text-center py-12">
      <i class="fas fa-shopping-cart text-6xl text-gray-300 mb-4"></i>
      <p class="text-xl text-gray-600">Your cart is empty</p>
      <router-link to="/" class="btn btn-primary mt-4 inline-block">
        Continue Shopping
      </router-link>
    </div>

    <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div class="lg:col-span-2">
        <div class="space-y-4">
          <div 
            v-for="item in cartStore.items" 
            :key="item.id"
            class="card p-4 flex items-center"
          >
            <img 
              :src="item.image" 
              :alt="item.name"
              class="w-24 h-24 object-cover rounded-lg"
            >
            
            <div class="ml-4 flex-grow">
              <h3 class="text-xl font-semibold">{{ item.name }}</h3>
              <p class="text-gray-600">${{ item.price }} each</p>
            </div>
            
            <div class="flex items-center space-x-4">
              <div class="flex items-center border rounded-lg">
                <button 
                  @click="updateQuantity(item.id, item.quantity - 1)"
                  class="px-3 py-1 hover:bg-gray-100"
                  :disabled="item.quantity <= 1"
                >
                  -
                </button>
                <span class="px-4">{{ item.quantity }}</span>
                <button 
                  @click="updateQuantity(item.id, item.quantity + 1)"
                  class="px-3 py-1 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
              
              <button 
                @click="removeItem(item.id)"
                class="text-red-500 hover:text-red-700"
              >
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div class="lg:col-span-1">
        <div class="card p-6">
          <h2 class="text-2xl font-bold mb-4">Order Summary</h2>
          
          <div class="space-y-4">
            <div class="flex justify-between">
              <span>Subtotal</span>
              <span>${{ cartStore.totalPrice }}</span>
            </div>
            
            <div class="flex justify-between">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            
            <div class="border-t pt-4">
              <div class="flex justify-between font-bold text-xl">
                <span>Total</span>
                <span>${{ cartStore.totalPrice }}</span>
              </div>
            </div>
            
            <button 
              @click="checkout"
              class="btn btn-primary w-full mt-4"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '@/stores/cart'
import { useRouter } from 'vue-router'

const cartStore = useCartStore()
const router = useRouter()

const updateQuantity = (productId, quantity) => {
  if (quantity > 0) {
    cartStore.updateQuantity(productId, quantity)
  }
}

const removeItem = (productId) => {
  cartStore.removeFromCart(productId)
}

const checkout = () => {
  router.push('/checkout')
}
</script> 