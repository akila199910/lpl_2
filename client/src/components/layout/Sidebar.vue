<script setup>
import { Icon } from '@iconify/vue';
import { RouterLink } from 'vue-router';
import { useAuthStore } from '../../store/auth';

defineProps({ expanded: Boolean });

const authStore = useAuthStore();

const handleLogout = async () => {
  await authStore.logout();
};

const navItems = [
  { id: 1, icon: 'material-symbols:dashboard', label: 'Dashboard', link: '/dashboard' },
  { id: 2, icon: 'material-symbols:home', label: 'Home', link: '/home' },
  { id: 3, icon: 'mdi:users', label: 'Users', link: '/users' },
  { id: 4, icon: 'mdi:cricket', label: 'Players', link: '/players' },
  { id: 5, icon: 'ri:team-fill', label: 'Teams', link: '/teams' },
  { id: 6, icon: 'ic:baseline-message', label: 'Messages', link: '/messages' },
  { id: 7, icon: 'mingcute:auction-fill', label: 'Auction', link: '/auction' },
  { id: 8, icon: 'iconamoon:profile-fill', label: 'Profile', link: '/my-profile' },
  { id: 9, icon: 'uil:setting', label: 'Settings', link: '/settings' },
];
</script>

<template>
  <div class=" space-y-4 overflow-y-auto mt-4 ">
    <ul class="space-y-2">
      <li v-for="item in navItems" :key="item.id" class="flex ">
        <RouterLink :to="item.link" class="flex items-center gap-8 hover:bg-gray-200 px-2 py-2 rounded-md mx-2">
          <Icon :icon="item.icon" class="w-6 h-6" />
          <span v-if="expanded" class="whitespace-nowrap transition-opacity duration-200 opacity-100 w-36 ">
            {{ item.label }}
          </span>
        </RouterLink>
      </li>

      <!-- Logout Button -->
      <li class="flex">
        <button @click="handleLogout"
          class="flex items-center gap-8 hover:bg-gray-200 px-2 py-2 rounded-md mx-2 w-full text-left">
          <Icon icon="ri:logout-circle-fill" class="w-6 h-6" />
          <span v-if="expanded" class="whitespace-nowrap transition-opacity duration-200 opacity-100 w-36 ">
            Logout
          </span>
        </button>
      </li>
    </ul>
  </div>
</template>
