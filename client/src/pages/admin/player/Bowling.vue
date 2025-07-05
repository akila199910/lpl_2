<script setup>

const playerProps = defineProps({
     data: Object
}) 

</script>

<template>
  <div class="p-4 shadow-md my-6 mx-auto rounded-2xl max-w-5xl bg-white">
    <p class="text-2xl text-center mb-6 font-semibold uppercase">Bowling Details</p>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <!-- Bowling Style -->
      <div>
        <label class="block text-sm font-medium mb-1">Bowling Style</label>
        <select
          class="w-full border border-gray-300 py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
         v-model="playerProps.data.bowling_style">
          <option value="" disabled selected>Select Bowling Style</option>
          <option value="0">Right Arm Fast</option>
          <option value="1">Left Arm Fast</option>
          <option value="2">Right Arm Medium</option>
          <option value="3">Left Arm Medium</option>
          <option value="4">Right Arm Off Break</option>
          <option value="5">Left Arm Off Break</option>
          <option value="6">Leg Break</option>
          <option value="7">Arm Break</option>
          <option value="8">Other</option>
        </select>
      </div>

      <!-- Bowling Average -->
      <div>
        <label class="block text-sm font-medium mb-1">Bowling Average</label>
        <input
          type="number"
          class="w-full border border-gray-300 py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          v-model="playerProps.data.bowling_average"
        />
      </div>

      <!-- Bowling Strike Rate -->
      <div>
        <label class="block text-sm font-medium mb-1">Bowling Strike Rate</label>
        <input
          type="number"
          class="w-full border border-gray-300 py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          v-model="playerProps.data.bowling_strike_rate"
        />
      </div>

      <!-- Wickets -->
      <div>
        <label class="block text-sm font-medium mb-1">Wickets</label>
        <input
          type="number"
          class="w-full border border-gray-300 py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          v-model="playerProps.data.bowling_wickets"
        />
      </div>

      <!-- Bowling Economy -->
      <div>
        <label class="block text-sm font-medium mb-1">Bowling Economy</label>
        <input
          type="number"
          class="w-full border border-gray-300 py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          v-model="playerProps.data.bowling_economy"
        />
      </div>
    </div>
  </div>
</template>
