<script setup>
import Navbar from '../components/layout/Navbar.vue'
import Sidebar from '../components/layout/Sidebar.vue'
import { ref } from 'vue'

const sidebarOpen = ref(false);
</script>

<!-- AppLayout.vue -->
<template>
  <div class="h-screen flex flex-col">
    <Navbar @toggle-sidebar="sidebarOpen = !sidebarOpen" />

    <div class="flex flex-1 overflow-auto">
      <!-- Sidebar -->
      <Sidebar :expanded="sidebarOpen" />

      <!-- Main content -->
      <div class="flex-1 overflow-y-auto p-4 shadow">
        <slot />
      </div>
    </div>
  </div>
</template>


