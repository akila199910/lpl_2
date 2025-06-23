<!-- components/ui/StatCard.vue -->
<template>
  <div class="bg-white p-4 rounded-xl shadow-md text-center">
    <p class="text-sm text-gray-500">{{ label }}</p>
    <p class="text-2xl font-bold">{{ value }}</p>
  </div>
</template>

<script setup>
defineProps(['label', 'value']);
</script>
