<template>
  <div class="card group" @mouseenter="startAnimation" @mouseleave="stopAnimation">
    <div class="relative overflow-hidden">
      <img 
        :src="product.image" 
        :alt="product.name"
        @error="handleImageError"
        class="w-full h-64 object-cover transform transition-transform duration-500 group-hover:scale-110"
      >
      <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
    </div>
    
    <div class="p-6">
      <h3 class="text-xl font-semibold mb-2 text-gradient">{{ product.name }}</h3>
      <p class="text-gray-600 mb-4">{{ product.description }}</p>
      
      <div class="flex justify-between items-center">
        <span class="text-2xl font-bold text-green-600">${{ formatPrice(product.price) }}</span>
        <button 
          @click="addToCart"
          class="btn btn-primary transform transition-transform duration-300 hover:scale-105"
        >
          Add to Cart
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useCartStore } from '@/stores/cart'
import gsap from 'gsap'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const cartStore = useCartStore()
const animation = ref(null)
const imageError = ref(false)

const startAnimation = () => {
  animation.value = gsap.to('.card', {
    y: -10,
    duration: 0.3,
    ease: 'power2.out'
  })
}

const stopAnimation = () => {
  if (animation.value) {
    animation.value.kill()
  }
}

const handleImageError = () => {
  imageError.value = true
  // Use a fallback image if the original fails to load
  props.product.image = 'https://images.unsplash.com/photo-1553279753-9e6e8a0c1d2f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
}

const formatPrice = (price) => {
  return parseFloat(price).toFixed(2)
}

const addToCart = () => {
  cartStore.addToCart(props.product)
  gsap.to('.cart-badge', {
    scale: 1.5,
    duration: 0.2,
    yoyo: true,
    repeat: 1
  })
}
</script>

<style scoped>
.card {
  @apply transform transition-all duration-300;
}

.card:hover {
  @apply shadow-2xl;
}
</style> 