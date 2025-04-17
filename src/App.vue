<template>
  <div class="min-h-screen bg-gradient-to-b from-green-50 to-white">
    <nav class="fixed w-full bg-white shadow-lg z-50 transition-all duration-300">
      <div class="container mx-auto px-4 py-4">
        <div class="flex justify-between items-center">
          <router-link to="/" class="text-2xl font-bold text-green-600 hover:text-green-700 transition-colors">
            Fruit Store
          </router-link>
          <div class="flex items-center space-x-6">
            <router-link to="/" class="nav-link">Home</router-link>
            <router-link to="/cart" class="nav-link relative">
              <i class="fas fa-shopping-cart"></i>
              <span class="cart-badge">{{ cartCount }}</span>
            </router-link>
          </div>
        </div>
      </div>
    </nav>

    <main class="pt-20">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <footer class="bg-green-900 text-white mt-20">
      <div class="container mx-auto px-4 py-12">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div class="footer-feature" v-for="feature in features" :key="feature.title">
            <i :class="feature.icon" class="text-3xl mb-4"></i>
            <h3 class="text-xl font-semibold mb-2">{{ feature.title }}</h3>
            <p class="text-green-200">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()
const cartCount = computed(() => cartStore.totalItems)

const features = [
  {
    icon: 'fas fa-award',
    title: 'High Quality',
    description: 'Crafted from top materials'
  },
  {
    icon: 'fas fa-shield-alt',
    title: 'Warranty Protection',
    description: 'Over 2 years'
  },
  {
    icon: 'fas fa-truck',
    title: 'Free Shipping',
    description: 'Order over 150 $'
  },
  {
    icon: 'fas fa-headset',
    title: '24/7 Support',
    description: 'Dedicated support'
  }
]
</script>

<style scoped>
.nav-link {
  @apply text-gray-600 hover:text-green-600 transition-colors;
}

.cart-badge {
  @apply absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.footer-feature {
  @apply text-center p-6 bg-green-800 rounded-lg hover:bg-green-700 transition-colors;
}
</style> 