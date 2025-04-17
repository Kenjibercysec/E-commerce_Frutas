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
        v-for="product in paginatedProducts" 
        :key="product.id"
        :product="product"
        class="animate__animated animate__fadeIn"
      />
    </div>

    <!-- Pagination -->
    <div class="mt-12 flex justify-center items-center space-x-2">
      <button
        @click="previousPage"
        :disabled="currentPage === 1"
        class="btn btn-secondary"
        :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }"
      >
        <i class="fas fa-chevron-left"></i>
      </button>
      
      <button
        v-for="page in totalPages"
        :key="page"
        @click="goToPage(page)"
        class="btn btn-secondary"
        :class="{ 'bg-green-600 text-white': currentPage === page }"
      >
        {{ page }}
      </button>

      <button
        @click="nextPage"
        :disabled="currentPage === totalPages"
        class="btn btn-secondary"
        :class="{ 'opacity-50 cursor-not-allowed': currentPage === totalPages }"
      >
        <i class="fas fa-chevron-right"></i>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import ProductCard from '@/components/ProductCard.vue'
import { products } from '@/data/products.js'

const categories = ['All', 'frutas', 'frutas tropicais', 'frutas cítricas', 'frutas vermelhas', 'frutas exóticas']
const selectedCategory = ref('All')
const currentPage = ref(1)
const itemsPerPage = 8

const filteredProducts = computed(() => {
  if (selectedCategory.value === 'All') {
    return products
  }
  return products.filter(product => product.category === selectedCategory.value)
})

const totalPages = computed(() => {
  return Math.ceil(filteredProducts.value.length / itemsPerPage)
})

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredProducts.value.slice(start, end)
})

const filterByCategory = (category) => {
  selectedCategory.value = category
  currentPage.value = 1 // Reset to first page when changing category
}

const goToPage = (page) => {
  currentPage.value = page
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}
</script>

<style scoped>
.animate__fadeIn {
  animation-duration: 0.5s;
}

.btn {
  @apply px-4 py-2 rounded-md font-medium transition-colors;
}

.btn-secondary {
  @apply bg-gray-200 text-gray-700 hover:bg-gray-300;
}
</style> 