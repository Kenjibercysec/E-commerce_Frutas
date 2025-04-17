<template>
  <div class="min-h-screen bg-gradient-to-b from-green-50 to-white py-12">
    <div class="container mx-auto px-4">
      <div class="max-w-4xl mx-auto">
        <!-- Header -->
        <div class="text-center mb-12 animate-fade-in">
          <h1 class="text-4xl font-bold text-gradient mb-4">My Profile</h1>
          <p class="text-gray-600">Manage your account and view your saved items</p>
        </div>

        <!-- Profile Information -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Left Column - User Info -->
          <div class="md:col-span-2 space-y-8">
            <!-- Personal Information Card -->
            <div class="card p-6 animate-slide-up">
              <h2 class="text-2xl font-bold mb-6 text-gradient">Personal Information</h2>
              <div class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-gray-700 font-medium mb-1">First Name</label>
                    <p class="text-gray-800">{{ user?.firstName || 'Not set' }}</p>
                  </div>
                  <div>
                    <label class="block text-gray-700 font-medium mb-1">Last Name</label>
                    <p class="text-gray-800">{{ user?.lastName || 'Not set' }}</p>
                  </div>
                  <div class="md:col-span-2">
                    <label class="block text-gray-700 font-medium mb-1">Email</label>
                    <p class="text-gray-800">{{ user?.email || 'Not set' }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Address Information Card -->
            <div class="card p-6 animate-slide-up">
              <h2 class="text-2xl font-bold mb-6 text-gradient">Address Information</h2>
              <div class="space-y-4">
                <div>
                  <label class="block text-gray-700 font-medium mb-1">Street</label>
                  <p class="text-gray-800">{{ user?.address?.street || 'Not set' }}</p>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-gray-700 font-medium mb-1">City</label>
                    <p class="text-gray-800">{{ user?.address?.city || 'Not set' }}</p>
                  </div>
                  <div>
                    <label class="block text-gray-700 font-medium mb-1">State</label>
                    <p class="text-gray-800">{{ user?.address?.state || 'Not set' }}</p>
                  </div>
                  <div>
                    <label class="block text-gray-700 font-medium mb-1">Postal Code</label>
                    <p class="text-gray-800">{{ user?.address?.postalCode || 'Not set' }}</p>
                  </div>
                  <div>
                    <label class="block text-gray-700 font-medium mb-1">Country</label>
                    <p class="text-gray-800">{{ user?.address?.country || 'Not set' }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column - Saved Items -->
          <div class="space-y-8">
            <!-- Saved Items Card -->
            <div class="card p-6 animate-slide-up">
              <h2 class="text-2xl font-bold mb-6 text-gradient">Saved Items</h2>
              <div v-if="savedItems.length > 0" class="space-y-4">
                <div v-for="item in savedItems" :key="item.id" class="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <img :src="item.image" :alt="item.name" class="w-16 h-16 object-cover rounded-lg">
                  <div class="flex-grow">
                    <h3 class="font-medium">{{ item.name }}</h3>
                    <p class="text-sm text-gray-600">${{ item.price }}</p>
                  </div>
                  <button 
                    @click="removeSavedItem(item.id)"
                    class="text-red-500 hover:text-red-700"
                  >
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
              </div>
              <div v-else class="text-center py-8">
                <p class="text-gray-600">No saved items yet</p>
                <router-link 
                  to="/" 
                  class="mt-4 inline-block btn btn-primary"
                >
                  Browse Products
                </router-link>
              </div>
            </div>

            <!-- Account Actions -->
            <div class="card p-6 animate-slide-up">
              <h2 class="text-2xl font-bold mb-6 text-gradient">Account Actions</h2>
              <div class="space-y-4">
                <button 
                  @click="logout"
                  class="w-full btn btn-secondary"
                >
                  Logout
                </button>
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
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const user = ref(null)
const savedItems = ref([])

const fetchUserProfile = async () => {
  try {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login')
      return
    }

    const response = await axios.get('http://localhost:5000/api/users/profile', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    user.value = response.data
  } catch (error) {
    console.error('Error fetching profile:', error)
    router.push('/login')
  }
}

const fetchSavedItems = async () => {
  try {
    const token = localStorage.getItem('token')
    if (!token) return

    // This would be replaced with your actual saved items endpoint
    const response = await axios.get('http://localhost:5000/api/users/saved-items', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    savedItems.value = response.data
  } catch (error) {
    console.error('Error fetching saved items:', error)
  }
}

const removeSavedItem = async (itemId) => {
  try {
    const token = localStorage.getItem('token')
    if (!token) return

    await axios.delete(`http://localhost:5000/api/users/saved-items/${itemId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    savedItems.value = savedItems.value.filter(item => item.id !== itemId)
  } catch (error) {
    console.error('Error removing saved item:', error)
  }
}

const logout = () => {
  localStorage.removeItem('token')
  router.push('/login')
}

onMounted(() => {
  fetchUserProfile()
  fetchSavedItems()
})
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