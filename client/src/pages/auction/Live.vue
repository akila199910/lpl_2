<script setup>
import { useRoute } from 'vue-router';
import defaulteUerImage from '../../assets/defualtUser.jpeg';
import logo from '../../assets/download.png';
import { onMounted, ref, computed } from 'vue';
import { getPlayerById } from '../../services/autionService';

const route = useRoute();
const playerId = route.params.id;
const player = ref({});
const user = ref({});
// const bids = ref({});


onMounted(async () => {
  try {
    const res = await getPlayerById(playerId);
    if (!res.data.success) return;

    player.value = res.data.data;
    user.value = player.value.user_id;

  } catch (err) {
    console.error('Failed to fetch player data:', err);
  }
});


const statArray = computed(() => {
  if (!player.value) return [];

  const p = player.value;

  const rawStats = [
    { label: 'Batting Style', value: p.batting_style },
    { label: 'Bowling Style', value: p.bowling_style },
    { label: 'Batting Avg', value: p.batting_average },
    { label: 'Bowling Avg', value: p.bowling_average },
    { label: 'Strike Rate', value: p.batting_strike_rate },
    { label: 'Runs', value: p.batting_runs },
    { label: 'High Score', value: p.batting_high_score },
    { label: 'Runs', value: p.batting_runs },
    { label: 'Hundreds', value: p.number_of_hundreds },
    { label: 'Fifties', value: p.number_of_fifties },
    { label: 'Wickets', value: p.bowling_wickets },
    { label: 'Economy', value: p.bowling_economy },
    { label: 'Matches', value: p.number_of_matches },
    { label: 'Catches', value: p.number_of_catches },
    { label: 'Stumpings', value: p.number_of_stumpings },
  ];

  return rawStats.filter(stat => stat.value !== null && stat.value !== undefined);
});

</script>

<template>
  <div class="bg-white shadow-lg rounded-lg w-full flex flex-col sm:max-w-4xl sm:mx-auto min-h-screen relative">

    <!-- Sticky Header (inside scroll context) -->
    <div class="sticky top-0 bg-white z-20 px-4 py-4 border-b">
      <div class="grid grid-cols-5 gap-2 items-center">
        <div class="col-span-2 flex justify-center">
          <img :src="defaulteUerImage" alt="User" class="w-12 h-12 rounded-full sm:w-20 sm:h-20">
        </div>
        <div class="col-span-2 flex flex-col">
          <p class="text-sm sm:text-lg font-bold text-gray-800 truncate">{{ user.name }}</p>
          <p class="text-sm text-gray-600 truncate">{{ user.country }}</p>
          <p class="text-sm text-gray-600 truncate">{{ user.role }}</p>
        </div>
        <div class="col-span-1 text-center">
          <div class="text-lg font-bold text-gray-800">60</div>
        </div>
      </div>
    </div>

    <div class="sm:grid sm:grid-cols-12 gap-2 hidden m-2">

      <div class="col-span-7">
        <div class="grid grid-cols-5">
          <div v-for="(stat, index) in statArray" :key="index"
            class="border-2 border-solid border-gray-500 text-center flex flex-col p-2">
            <div class="text-sm font-semibold text-gray-700">{{ stat.label }}</div>
            <div class="text-lg text-gray-900">{{ stat.value }}</div>
          </div>
        </div>
      </div>

      <div class="col-span-5">
          <div class=" text-center flex flex-row p-2 justify-between px-4">
            <div class="font-bold">Logo</div>
            <div class="font-bold">Bid Amount</div>            
          </div>
          <div class="flex flex-row p-2 justify-between items-center px-4">
            <img src="../../assets/download.png" class="w-12 h-12 rounded-full" alt="">
            <div class="font-semibold">1000</div>            
          </div>
      </div>

    </div>

    <div class=" flex flex-row absolute bottom-0 left-0 z-10 m-4">
      <input type="text" class="border border-gray-300 rounded-md p-2 w-full" placeholder="Place your bid">
      <button class="bg-blue-500 text-white rounded-md p-2 ml-2">Submit</button>
    </div>


    <div class="flex-1 px-4 py-4 pb-36 sm:hidden">
      <table class="w-full text-center">
        <thead>
          <tr class="bg-gray-200">
            <th class="py-2">Logo</th>
            <th class="py-2">Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="py-2">
              <img :src="logo" alt="Logo" class="w-12 h-12 rounded-full mx-auto">
            </td>
            <td class="py-2">$100</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Mobile fixed bottom input -->
    <div class="fixed bottom-0 left-0 right-0 p-4 bg-white border-t sm:hidden z-30">
      <div class="flex justify-between gap-2">
        <input type="text" class="border border-gray-300 rounded-md p-2 w-full" placeholder="Your message">
        <button class="bg-blue-500 text-white px-4 py-2 rounded-md">Submit</button>
      </div>
    </div>
  </div>
</template>
