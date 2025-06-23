<script setup>
defineProps({ expanded: Boolean });
</script>

<template>
  <div class="py-4 space-y-4">
    <nav>
      <ul class="space-y-2">
        <li class="flex items-center gap-3 px-4 py-2 hover:bg-gray-200">
          <Icon icon="mdi:calendar" class="w-5 h-5" />
          <span v-if="expanded" class="whitespace-nowrap">Calendar</span>
        </li>
        <!-- Add more links the same way -->
      </ul>
    </nav>
  </div>
</template>
