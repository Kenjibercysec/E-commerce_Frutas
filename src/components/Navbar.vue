<template>
  <nav class="bg-white shadow-lg">
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center py-4">
        <router-link to="/" class="flex items-center">
          <span class="text-2xl font-bold text-gradient">Fruit Store</span>
        </router-link>

        <div class="hidden md:flex items-center space-x-8">
          <router-link
            v-for="link in links"
            :key="link.path"
            :to="link.path"
            class="text-gray-600 hover:text-green-600 transition-colors"
          >
            {{ link.name }}
          </router-link>
        </div>

        <div class="flex items-center space-x-4">
          <router-link
            to="/cart"
            class="relative text-gray-600 hover:text-green-600 transition-colors"
          >
            <i class="fas fa-shopping-cart text-xl"></i>
            <span
              v-if="cartItemCount > 0"
              class="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
            >
              {{ cartItemCount }}
            </span>
          </router-link>

          <template v-if="isAuthenticated">
            <!-- User Dropdown Menu -->
            <div class="relative" @click="toggleDropdown">
              <button class="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors">
                <i class="fas fa-user-circle text-xl"></i>
                <span class="hidden md:inline">{{ user?.firstName || 'Account' }}</span>
                <i class="fas fa-chevron-down text-xs"></i>
              </button>
              
              <!-- Dropdown Content -->
              <div v-if="isDropdownOpen" class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                <router-link
                  to="/profile"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600"
                >
                  <i class="fas fa-user mr-2"></i> My Profile
                </router-link>
                <router-link
                  to="/orders"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600"
                >
                  <i class="fas fa-shopping-bag mr-2"></i> My Orders
                </router-link>
                <button
                  @click="handleLogout"
                  class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600"
                >
                  <i class="fas fa-sign-out-alt mr-2"></i> Logout
                </button>
              </div>
            </div>
          </template>
          <template v-else>
            <router-link
              to="/login"
              class="btn btn-primary flex items-center space-x-2"
            >
              <i class="fas fa-sign-in-alt"></i>
              <span>Login</span>
            </router-link>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const links = [
  { name: 'Home', path: '/' },
  { name: 'Cart', path: '/cart' }
]

const cartItemCount = ref(0)
const isAuthenticated = computed(() => !!localStorage.getItem('token'))
const isDropdownOpen = ref(false)
const user = ref(null)

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

const handleLogout = () => {
  localStorage.removeItem('token')
  isDropdownOpen.value = false
  router.push('/login')
}

const fetchUserProfile = async () => {
  try {
    const token = localStorage.getItem('token')
    if (!token) return

    const response = await axios.get('http://localhost:5000/api/users/profile', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    user.value = response.data
  } catch (error) {
    console.error('Error fetching user profile:', error)
  }
}

onMounted(() => {
  if (isAuthenticated.value) {
    fetchUserProfile()
  }
})

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
  const dropdown = document.querySelector('.relative')
  if (dropdown && !dropdown.contains(e.target)) {
    isDropdownOpen.value = false
  }
})
</script>

<style scoped>
.text-gradient {
  background: linear-gradient(45deg, #10B981, #059669);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.btn {
  @apply px-4 py-2 rounded-md font-medium transition-colors;
}

.btn-primary {
  @apply bg-green-600 text-white hover:bg-green-700;
}
</style> 