<template>
  <div class="min-h-screen bg-gradient-to-b from-green-50 to-white py-12">
    <div class="container mx-auto px-4">
      <div class="max-w-6xl mx-auto">
        <div class="flex flex-col lg:flex-row gap-8">
          <!-- Left Column - Payment Form -->
          <div class="lg:w-2/3">
            <div class="card p-6 mb-8 animate-slide-up">
              <h2 class="text-3xl font-bold mb-6 text-gradient">Payment Information</h2>
              
              <form id="payment-form" @submit.prevent="handleSubmit" class="space-y-6">
                <!-- Card Element -->
                <div class="space-y-2">
                  <label class="block text-gray-700 font-medium">Card Details</label>
                  <div id="card-element" class="input p-3"></div>
                  <div id="card-errors" class="text-red-500 text-sm"></div>
                </div>

                <!-- Billing Address -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-gray-700 font-medium">First Name</label>
                    <input 
                      v-model="billingDetails.firstName"
                      type="text" 
                      class="input"
                      required
                    >
                  </div>
                  <div>
                    <label class="block text-gray-700 font-medium">Last Name</label>
                    <input 
                      v-model="billingDetails.lastName"
                      type="text" 
                      class="input"
                      required
                    >
                  </div>
                  <div class="md:col-span-2">
                    <label class="block text-gray-700 font-medium">Email</label>
                    <input 
                      v-model="billingDetails.email"
                      type="email" 
                      class="input"
                      required
                    >
                  </div>
                  <div class="md:col-span-2">
                    <label class="block text-gray-700 font-medium">Address</label>
                    <input 
                      v-model="billingDetails.address"
                      type="text" 
                      class="input"
                      required
                    >
                  </div>
                  <div>
                    <label class="block text-gray-700 font-medium">City</label>
                    <input 
                      v-model="billingDetails.city"
                      type="text" 
                      class="input"
                      required
                    >
                  </div>
                  <div>
                    <label class="block text-gray-700 font-medium">Postal Code</label>
                    <input 
                      v-model="billingDetails.postalCode"
                      type="text" 
                      class="input"
                      required
                    >
                  </div>
                </div>

                <!-- Submit Button -->
                <button 
                  type="submit" 
                  class="btn btn-primary w-full"
                  :disabled="processing"
                >
                  <span v-if="processing" class="flex items-center justify-center">
                    <i class="fas fa-spinner fa-spin mr-2"></i>
                    Processing...
                  </span>
                  <span v-else>
                    Pay ${{ cartStore.totalPrice }}
                  </span>
                </button>
              </form>
            </div>

            <!-- Security Badges -->
            <div class="flex items-center justify-center space-x-8">
              <div class="text-center">
                <i class="fas fa-shield-alt text-4xl text-green-600 mb-2"></i>
                <p class="text-sm text-gray-600">Secure Payment</p>
              </div>
              <div class="text-center">
                <i class="fas fa-lock text-4xl text-green-600 mb-2"></i>
                <p class="text-sm text-gray-600">SSL Encrypted</p>
              </div>
              <div class="text-center">
                <i class="fas fa-credit-card text-4xl text-green-600 mb-2"></i>
                <p class="text-sm text-gray-600">Multiple Cards</p>
              </div>
            </div>
          </div>

          <!-- Right Column - Order Summary -->
          <div class="lg:w-1/3">
            <div class="card p-6 sticky top-0 animate-slide-up">
              <h2 class="text-2xl font-bold mb-6 text-gradient">Order Summary</h2>
              
              <div class="space-y-4">
                <!-- Cart Items -->
                <div v-for="item in cartStore.items" :key="item.id" class="flex items-center space-x-4">
                  <img 
                    :src="item.image" 
                    :alt="item.name"
                    class="w-16 h-16 object-cover rounded-lg"
                  >
                  <div class="flex-grow">
                    <h3 class="font-medium">{{ item.name }}</h3>
                    <p class="text-sm text-gray-600">Qty: {{ item.quantity }}</p>
                  </div>
                  <span class="font-medium">${{ (item.price * item.quantity).toFixed(2) }}</span>
                </div>

                <div class="border-t pt-4 space-y-2">
                  <div class="flex justify-between">
                    <span>Subtotal</span>
                    <span>${{ cartStore.totalPrice.toFixed(2) }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div class="flex justify-between font-bold text-xl">
                    <span>Total</span>
                    <span>${{ cartStore.totalPrice.toFixed(2) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useCartStore } from '@/stores/cart'
import { loadStripe } from '@stripe/stripe-js'
import { useRouter } from 'vue-router'

const cartStore = useCartStore()
const router = useRouter()
const stripe = ref(null)
const elements = ref(null)
const card = ref(null)
const processing = ref(false)

const billingDetails = ref({
  firstName: '',
  lastName: '',
  email: '',
  address: '',
  city: '',
  postalCode: ''
})

onMounted(async () => {
  // Initialize Stripe
  stripe.value = await loadStripe('YOUR_PUBLISHABLE_KEY')
  elements.value = stripe.value.elements()
  
  // Create card element
  card.value = elements.value.create('card', {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#9e2146'
      }
    }
  })
  
  // Mount card element
  card.value.mount('#card-element')
  
  // Handle validation errors
  card.value.on('change', (event) => {
    const displayError = document.getElementById('card-errors')
    if (event.error) {
      displayError.textContent = event.error.message
    } else {
      displayError.textContent = ''
    }
  })
})

const handleSubmit = async (event) => {
  event.preventDefault()
  
  if (!stripe.value || !elements.value) {
    return
  }
  
  processing.value = true
  
  try {
    const { error, paymentMethod } = await stripe.value.createPaymentMethod({
      type: 'card',
      card: card.value,
      billing_details: billingDetails.value
    })
    
    if (error) {
      const errorElement = document.getElementById('card-errors')
      errorElement.textContent = error.message
      processing.value = false
    } else {
      // Here you would typically send the paymentMethod.id to your backend
      // to complete the payment
      console.log('PaymentMethod:', paymentMethod)
      
      // Simulate successful payment
      setTimeout(() => {
        cartStore.clearCart()
        router.push('/success')
      }, 2000)
    }
  } catch (err) {
    console.error('Error:', err)
    processing.value = false
  }
}
</script>

<style scoped>
.animate-slide-up {
  animation: slideUp 0.5s ease-out;
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
  }
}
</style>

<style scoped>
.animate-slide-up {
  animation: slideUp 0.5s ease-out;
}
</style> 