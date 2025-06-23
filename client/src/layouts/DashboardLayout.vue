<script setup>
import { ref } from 'vue';
import Navbar from '../components/layout/Navbar.vue';
import Sidebar from '../components/layout/Sidebar.vue';

const sidebarExpanded = ref(false);
const navMenuOpen = ref(false);

function toggleSidebar() {
  sidebarExpanded.value = !sidebarExpanded.value;
};
</script>

<template>
  <div class="dark:bg-boxdark-2 dark:text-bodydark">

    <!-- Header -->
    <Navbar @toggle-sidebar="toggleSidebar" />

    <!-- Layout -->
    <div class="relative h-[calc(100vh-64px)] flex">

      <!-- Sidebar -->
      <div
        :class="[
          'h-full fixed top-[80px] bg-yellow-50 overflow-y-auto transition-all duration-300',
          sidebarExpanded ? 'w-64' : 'w-16'
        ]"
      >
        <Sidebar :expanded="sidebarExpanded" />
      </div>

      <!-- Main content -->
      <div class="ml-16 transition-all duration-300" :class="sidebarExpanded ? 'ml-64' : 'ml-16'">
        <main class="p-6 min-h-full max-w-screen-2xl mx-auto">
          <div class="space-y-6">
            <div class="h-96 bg-gray-100">Main Block sfwgfregfrefrefcef1</div>
            <div class="h-96 bg-gray-200">Main Block 2</div>
            <div class="h-96 bg-gray-300">Main Block 3</div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>
