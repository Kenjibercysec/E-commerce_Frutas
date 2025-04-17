<template>
  <div class="min-h-screen bg-gradient-to-b from-green-50 to-white py-12">
    <div class="container mx-auto px-4">
      <div class="max-w-md mx-auto">
        <div class="text-center mb-12 animate-fade-in">
          <h1 class="text-4xl font-bold text-gradient mb-4">Welcome Back</h1>
          <p class="text-gray-600">Sign in to your account</p>
        </div>

        <div class="card p-8 animate-slide-up">
          <form @submit.prevent="handleLogin" class="space-y-6">
            <div>
              <label class="block text-gray-700 font-medium mb-2">Email</label>
              <input
                v-model="email"
                type="email"
                class="input w-full"
                required
                placeholder="Enter your email"
              >
            </div>

            <div>
              <label class="block text-gray-700 font-medium mb-2">Password</label>
              <input
                v-model="password"
                type="password"
                class="input w-full"
                required
                placeholder="Enter your password"
              >
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                >
                <label for="remember-me" class="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <a href="#" class="text-sm text-green-600 hover:text-green-700">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              class="btn btn-primary w-full"
              :disabled="loading"
            >
              <span v-if="loading" class="flex items-center justify-center">
                <i class="fas fa-spinner fa-spin mr-2"></i>
                Signing in...
              </span>
              <span v-else>Sign In</span>
            </button>

            <div class="text-center">
              <p class="text-gray-600">
                Don't have an account?
                <router-link to="/register" class="text-green-600 hover:text-green-700">
                  Sign up
                </router-link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const email = ref('')
const password = ref('')
const loading = ref(false)

const handleLogin = async () => {
  try {
    loading.value = true
    const response = await axios.post('http://localhost:5000/api/users/login', {
      email: email.value,
      password: password.value
    })

    localStorage.setItem('token', response.data.token)
    router.push('/profile')
  } catch (error) {
    console.error('Login error:', error)
    alert('Invalid credentials. Please try again.')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.5s ease-out;
}

.animate-slide-up {
  animation: slideUp 0.5s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style> 