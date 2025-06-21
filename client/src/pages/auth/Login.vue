<!-- pages/auth/Login.vue -->
<template>
  <AuthLayout>
    <form @submit.prevent="handleLogin" class="space-y-4">
      <h2 class="text-2xl font-bold mb-4 text-wrap break-all">Login</h2>
      <BaseInput v-model="email" type="email" placeholder="premierleague@gmail.com" />
      <BaseInput v-model="password" type="password" placeholder="Password" />
      <BaseButton class=" text-wrap break-all overflow-hidden">Login</BaseButton>
    </form>
  </AuthLayout>
</template>

<script setup>
import AuthLayout from '../../layouts/AuthLayout.vue';
import BaseInput from '../../components/ui/BaseInput.vue';
import BaseButton from '../../components/ui/BaseButton.vue';
import { ref } from 'vue';
import { useAuthStore } from '../../store/auth.js';

const email = ref('');
const password = ref('');
const authStore = useAuthStore();

function handleLogin() {
  authStore.login({ email: email.value, password: password.value });
}
</script>
