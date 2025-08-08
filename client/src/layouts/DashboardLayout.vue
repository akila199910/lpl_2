<script setup>
import Navbar from '../components/layout/Navbar.vue'
import Sidebar from '../components/layout/Sidebar.vue'
import { onMounted, ref } from 'vue'
import socket from '../socket.js';
import { useRouter } from 'vue-router';


const sidebarOpen = ref(false);
const showNotification = ref(false);
const auctionPlayer = ref(null);
const router = useRouter();


onMounted(() => {
  socket.on('new-auction', (data) => {
    auctionPlayer.value = data?.player_id?.name || 'New Player';
    showNotification.value = true;

  });
});

const handleClick = ()=>{
  router.push('/live')
}
</script>

<!-- AppLayout.vue -->
<template>
  <div class="h-screen flex flex-col min-h-screen">
    <Navbar @toggle-sidebar="sidebarOpen = !sidebarOpen" />

    <div class="flex flex-1 overflow-auto">
      <!-- Sidebar -->
      <Sidebar :expanded="sidebarOpen" />

      <!-- Main content -->
        <div
          :class="[
            'flex-1 overflow-y-auto p-4 shadow relative',
            sidebarOpen ? 'hidden sm:block' : ''
          ]"
        >
        <div
          v-if="showNotification" @click="handleClick"
          class="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-purple-100 text-purple-800 px-6 pt-4 rounded-lg shadow-xl z-50 text-center text-lg"
        >
           {{ auctionPlayer }} has been added to the auction!
        </div>

        <slot />
      </div>
    </div>
  </div>
</template>


