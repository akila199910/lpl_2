<!-- components/ui/BaseInput.vue -->
<template>
  <input
   @input="$emit('update:modelValue', $event.target.value)"
    :value="modelValue"
    v-bind="$attrs"
    :class="['w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring ', error ? 'border-red-500' : 'border-gray-300']"
  />
</template>

<script setup>
defineProps(['error', 'modelValue']);
defineEmits(['update:modelValue']);
</script>
