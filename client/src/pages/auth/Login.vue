<!-- pages/auth/Login.vue -->
<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Mobile Layout (default) -->
    <div class="md:hidden min-h-screen items-center justify-center bg-gray-100 p-4">
      <div class="w-full rounded-lg shadow-md p-4 sm:p-8 ">
        <form @submit.prevent="handleLogin" class="space-y-4">
          <h2 class="text-2xl font-bold mb-4 text-wrap break-all">Login</h2>
          <BaseInput v-model="email" type="email" placeholder="premierleague@gmail.com" />
          <p v-if="authStore.errors?.email" class="text-sm text-red-500">
            {{ authStore.errors.email }}
          </p>
          <BaseInput v-model="password" type="password" placeholder="Password" />
          <p v-if="authStore.errors?.password" class="text-sm text-red-500">
            {{ authStore.errors.password }}
          </p>
          <BaseButton class="text-wrap break-all overflow-hidden">Login</BaseButton>
          <P class="font-medium">Don't have an account? <span class="font-bold cursor-pointer"
              @click="router.push('/register')">Register</span></P>
        </form>
      </div>
    </div>

    <!-- Desktop Layout (md and larger) -->
    <div class="hidden md:flex min-h-screen">
      <!-- Left Side - Image -->
      <div
        class="flex-1 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 relative overflow-hidden p-4">
        <div class="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-indigo-600/10"></div>
        <img src="/src/assets/login.jpg" alt="Login"
          class="relative z-10 w-full h-full object-cover object-center shadow-2xl rounded-lg transform hover:scale-105 transition-transform duration-300 ease-in-out max-w-4xl max-h-[90vh] mx-4" />
      </div>

      <!-- Right Side - Login Form -->
      <div class="flex-1 flex items-center justify-center p-8">
        <div class="w-full max-w-md">
          <div class="text-center mb-8">
            <h2 class="text-3xl font-bold text-gray-900 mb-2">Login</h2>
            <p class="text-gray-600">Enter your credentials to access your account</p>
          </div>

          <form @submit.prevent="handleLogin" class="space-y-6">
            <div>
              <BaseInput v-model="email" type="email" placeholder="premierleague@gmail.com" />
              <p v-if="authStore.errors?.email" class="text-sm text-red-500 mt-1">
                {{ authStore.errors.email }}
              </p>
            </div>

            <div>
              <BaseInput v-model="password" type="password" placeholder="Password" />
              <p v-if="authStore.errors?.password" class="text-sm text-red-500 mt-1">
                {{ authStore.errors.password }}
              </p>
            </div>

            <BaseButton class="w-full text-wrap break-all overflow-hidden">Login</BaseButton>

            <p class="text-center font-medium">
              Don't have an account?
              <span class="font-bold cursor-pointer text-blue-600 hover:text-blue-800"
                @click="router.push('/register')">
                Register
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import AuthLayout from '../../layouts/AuthLayout.vue';
import BaseInput from '../../components/ui/BaseInput.vue';
import BaseButton from '../../components/ui/BaseButton.vue';
import { ref } from 'vue';
import { useAuthStore } from '../../store/auth.js';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const authStore = useAuthStore();
const router = useRouter();
function handleLogin() {
  authStore.login({ email: email.value, password: password.value });
}
</script>
