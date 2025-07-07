<script setup>

const playerProps = defineProps({
     data: Object,
     errors: Object
}) 

</script>


<template>
  <div class="p-4 shadow-md my-6 mx-auto rounded-2xl max-w-5xl bg-white">
    <p class="text-2xl text-center mb-6 font-semibold uppercase">Batting Details</p>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <!-- Batting Style -->
      <div>
        <label class="block text-sm font-medium mb-1">Batting Style</label>
        <select class="w-full border border-gray-300 py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            v-model="playerProps.data.batting_style">
          <option value="" disabled selected>Select Batting Style</option>
          <option value="1">Right Hand</option>
          <option value="0">Left Hand</option>
        </select>
        <span class="text-red-500" v-if="playerProps.errors?.batting_style"> {{ playerProps.errors?.batting_style }}</span>
      </div>

      <!-- Batting Average -->
      <div>
        <label class="block text-sm font-medium mb-1">Batting Average</label>
        <input type="number" class="w-full border border-gray-300 py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            v-model="playerProps.data.batting_average">
        <span class="text-red-500" v-if="playerProps.errors?.batting_average"> {{ playerProps.errors?.batting_average }}</span>
      </div>

      <!-- Batting Strike Rate -->
      <div>
        <label class="block text-sm font-medium mb-1">Batting Strike Rate</label>
        <input type="number" class="w-full border border-gray-300 py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            v-model="playerProps.data.batting_strike_rate">
        <span class="text-red-500" v-if="playerProps.errors?.batting_strike_rate"> {{ playerProps.errors?.batting_strike_rate }}</span>
      </div>

      <!-- Runs -->
      <div>
        <label class="block text-sm font-medium mb-1">Runs</label>
        <input type="number" class="w-full border border-gray-300 py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            v-model="playerProps.data.batting_runs">
        <span class="text-red-500" v-if="playerProps.errors?.batting_runs"> {{ playerProps.errors?.batting_runs }}</span>
      </div>

      <!-- Hundreds -->
      <div>
        <label class="block text-sm font-medium mb-1">Hundreds</label>
        <input type="number" class="w-full border border-gray-300 py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            v-model="playerProps.data.number_of_hundreds">
        <span class="text-red-500" v-if="playerProps.errors?.number_of_hundreds"> {{ playerProps.errors?.number_of_hundreds }}</span>    
      </div>

      <!-- Fifties -->
      <div>
        <label class="block text-sm font-medium mb-1">Fifties</label>
        <input type="number" class="w-full border border-gray-300 py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            v-model="playerProps.data.number_of_fifties">
        <span class="text-red-500" v-if="playerProps.errors?.number_of_fifties"> {{ playerProps.errors?.number_of_fifties }}</span>
      </div>

      <!-- High Score -->
      <div>
        <label class="block text-sm font-medium mb-1">High Score</label>
        <input type="number" class="w-full border border-gray-300 py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            v-model="playerProps.data.batting_high_score">
        <span class="text-red-500" v-if="playerProps.errors?.batting_high_score"> {{ playerProps.errors?.batting_high_score }}</span>
      </div>
    </div>
  </div>
</template>
