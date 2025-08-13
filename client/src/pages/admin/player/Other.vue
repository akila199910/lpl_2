<script setup>

const playerProps = defineProps({
     data: Object,
     errors: Object
}) 

</script>

<template>
  <div class="p-4 shadow-md my-6 mx-auto rounded-2xl max-w-5xl bg-white">
    <p class="text-2xl text-center mb-6 font-semibold uppercase">Other Details</p>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">

      <!-- Matches -->
      <div>
        <label class="block text-sm font-medium mb-1">Matches</label>
        <input
          type="number"
          class="w-full border border-gray-300 py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          v-model="playerProps.data.number_of_matches"
        />
        <span class="text-red-500" v-if="playerProps.errors?.number_of_matches"> {{ playerProps.errors?.number_of_matches }}</span>
      </div>

      <!-- Innings -->
      <div>
        <label class="block text-sm font-medium mb-1">Innings</label>
        <input
          type="number"
          class="w-full border border-gray-300 py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          v-model="playerProps.data.number_of_innings"
        />
        <span class="text-red-500" v-if="playerProps.errors?.number_of_innings"> {{ playerProps.errors?.number_of_innings }}</span>   
      </div>
      <!-- Catches -->
      <div>
        <label class="block text-sm font-medium mb-1">Catches</label>
        <input
          type="number"
          class="w-full border border-gray-300 py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          v-model="playerProps.data.number_of_catches"
        />       
        <span class="text-red-500" v-if="playerProps.errors?.number_of_catches"> {{ playerProps.errors?.number_of_catches }}</span>
      </div>
      <!-- Stumpings -->
      <div v-if="playerProps.data.role=='Wicketkeeper'">
        <label class="block text-sm font-medium mb-1">Stumpings</label>
        <input
          type="number"
          class="w-full border border-gray-300 py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          v-model="playerProps.data.number_of_stumpings"
        />
        <span class="text-red-500" v-if="playerProps.errors?.number_of_stumpings"> {{ playerProps.errors?.number_of_stumpings }}</span>
      </div>

      <div>
        <label for="basePrice" class="block text-sm font-medium mb-1">Base Price</label>

        <select
          id="basePrice"
          v-model.number="playerProps.data.base_price"
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option disabled value="">Select Base Price</option>
          <option :value="10000">Rs 10000</option>
          <option :value="20000">Rs 20000</option>
          <option :value="30000">Rs 30000</option>
          <option :value="40000">Rs 40000</option>
          <option :value="50000">Rs 50000</option>
        </select>
      </div>

    </div>
  </div>
</template>
