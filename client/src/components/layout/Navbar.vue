<script setup>
import logo from '../../assets/lpl_logo.jpg';
import { Icon } from '@iconify/vue';
import { ref } from 'vue';

const emit = defineEmits(['toggle-sidebar']);
const navMenuOpen = ref(false);
</script>

<template>
  <header class="flex justify-between items-center  bg-pink-200 shadow py-4 px-4 sticky top-0 w-full">
    <!-- Left: Logo triggers SIDEBAR toggle -->
    <div class="flex items-center gap-2 cursor-pointer" @click="emit('toggle-sidebar')">
      <img :src="logo" alt="LPL Logo" class="w-10 h-10 rounded-full" />
      <h1 class="font-semibold text-lg text-black">LPL</h1>
    </div>

    <!-- Right: Desktop nav + mobile toggle -->
    <div class="flex items-center gap-6">
      <!-- Desktop nav -->
      <ul class="hidden sm:flex items-center gap-6 text-sm text-gray-700 font-medium">
        <li class="hover:text-blue-600 cursor-pointer">Home</li>
        <li class="hover:text-blue-600 cursor-pointer">About</li>
        <li class="hover:text-blue-600 cursor-pointer">Services</li>
        <li class="hover:text-blue-600 cursor-pointer">Contact</li>
      </ul>

        <!-- Toggle button (mobile only) -->
      <button class="sm:hidden" @click="navMenuOpen = !navMenuOpen">
        <Icon icon="teenyicons:menu-outline" class="w-7 h-7 text-black"  v-if="!navMenuOpen" />
        <Icon icon="radix-icons:cross-1" class="w-7 h-7 text-black" v-if="navMenuOpen" />
      </button>
    </div>
  </header>

  <!-- Mobile dropdown menu -->
  <div v-if="navMenuOpen" class="sm:hidden bg-white px-4 py-2 shadow absolute top-12 right-8 z-50 rounded-md">
    <ul class="flex flex-col gap-2 text-sm text-gray-700 font-medium">
      <li class="hover:text-blue-600 cursor-pointer">Home</li>
      <li class="hover:text-blue-600 cursor-pointer">About</li>
      <li class="hover:text-blue-600 cursor-pointer">Services</li>
      <li class="hover:text-blue-600 cursor-pointer">Contact</li>
    </ul>
  </div>
</template>
