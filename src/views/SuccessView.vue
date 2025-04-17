<template>
  <div class="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center py-12">
    <div class="max-w-md w-full mx-auto px-4">
      <div class="card p-8 text-center animate-fade-in">
        <div class="mb-6">
          <i class="fas fa-check-circle text-6xl text-green-500 animate-bounce-slow"></i>
        </div>
        
        <h1 class="text-3xl font-bold mb-4 text-gradient">Payment Successful!</h1>
        <p class="text-gray-600 mb-6">
          Thank you for your purchase. Your order has been confirmed and will be shipped soon.
        </p>
        
        <div class="space-y-4">
          <router-link 
            to="/" 
            class="btn btn-primary w-full"
          >
            Continue Shopping
          </router-link>
          
          <button 
            @click="downloadReceipt"
            class="btn btn-secondary w-full"
          >
            <i class="fas fa-download mr-2"></i>
            Download Receipt
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const downloadReceipt = () => {
  // Here you would typically generate and download a PDF receipt
  alert('Receipt download functionality will be implemented soon!')
}
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style> 