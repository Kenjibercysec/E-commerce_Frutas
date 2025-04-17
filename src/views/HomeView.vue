<template>
  <div class="container mx-auto px-4 py-8">
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold mb-4 text-gradient">Fresh Fruits</h1>
      <p class="text-gray-600 max-w-2xl mx-auto">
        Discover our selection of premium quality fruits, handpicked for you.
      </p>
    </div>

    <div class="mb-8 flex flex-wrap justify-center gap-4">
      <button 
        v-for="category in categories" 
        :key="category"
        @click="filterByCategory(category)"
        class="btn btn-secondary"
        :class="{ 'bg-green-600 text-white': selectedCategory === category }"
      >
        {{ category }}
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      <ProductCard 
        v-for="product in filteredProducts" 
        :key="product.id"
        :product="product"
        class="animate__animated animate__fadeIn"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import ProductCard from '@/components/ProductCard.vue'
import products from '@/data/products.json'

const categories = ['All', 'Sweet', 'Citrus', 'Exotic', 'Tropical']
const selectedCategory = ref('All')

const filteredProducts = computed(() => {
  if (selectedCategory.value === 'All') {
    return products
  }
  return products.filter(product => product.category === selectedCategory.value)
})

const filterByCategory = (category) => {
  selectedCategory.value = category
}
</script>

<style scoped>
.animate__fadeIn {
  animation-duration: 0.5s;
}
</style> 