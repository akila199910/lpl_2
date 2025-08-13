<script setup>
    defineProps(['title', 'buttonText', 'buttonLink']);
    const emit = defineEmits(['addNew']);
</script>

<template>

    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 class="text-xl sm:text-2xl font-semibold text-gray-800">
         {{ title }}
        </h1>
        <button
          class="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 
          rounded shadow transition duration-200"
          @click="emit('addNew')"
        >
          {{ buttonText }}
        </button>
    </div>

</template>
