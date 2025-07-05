<script setup>

const playerProps = defineProps({
     data: Object
}) 

</script>

<template>
  <div class="p-4 shadow-md my-6 mx-auto rounded-2xl max-w-5xl bg-white">
    <p class="text-2xl text-center mb-6 font-semibold uppercase">Other Details</p>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <!-- Catches -->
      <div>
        <label class="block text-sm font-medium mb-1">Catches</label>
        <input
          type="number"
          class="w-full border border-gray-300 py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          v-model="playerProps.data.number_of_catches"
        />
      </div>

      <!-- Stumpings -->
      <div>
        <label class="block text-sm font-medium mb-1">Stumpings</label>
        <input
          type="number"
          class="w-full border border-gray-300 py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          v-model="playerProps.data.number_of_stumpings"
        />
      </div>

      <!-- Matches -->
      <div>
        <label class="block text-sm font-medium mb-1">Matches</label>
        <input
          type="number"
          class="w-full border border-gray-300 py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          v-model="playerProps.data.number_of_matches"
        />
      </div>

      <!-- Innings -->
      <div>
        <label class="block text-sm font-medium mb-1">Innings</label>
        <input
          type="number"
          class="w-full border border-gray-300 py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          v-model="playerProps.data.number_of_innings"
        />
      </div>
    </div>
  </div>
</template>
