<script setup>
import { onMounted, ref } from 'vue';
import DashboardLayout from '../../../layouts/DashboardLayout.vue';
import { getSettings, updateSettings } from '../../../services/settingsService';

const rule = ref({
  contract_cost: '',
  bid_cost: '',
  total_players_in_team: '',
  total_contract_players: '',
  auction_time_limit: '',
  auction_start_date: '',
});

// Convert loaded values safely
onMounted(async () => {
  try {
    const res = await getSettings();
    const data = res.data.data;

    // Set values without breaking reactivity
    rule.value.contract_cost = data.contract_cost || '';
    rule.value.bid_cost = data.bid_cost || '';
    rule.value.total_players_in_team = data.total_players_in_team || '';
    rule.value.total_contract_players = data.total_contract_players || '';
    rule.value.auction_time_limit = data.auction_time_limit || '';
    rule.value.auction_start_date = formatDateTimeLocal(data.auction_start_date);
  } catch (error) {
    console.log(error);
  }
});

// Format ISO to "yyyy-MM-ddTHH:mm" for datetime-local
function formatDateTimeLocal(isoDate) {
  if (!isoDate) return '';
  const date = new Date(isoDate);
  return date.toISOString().slice(0, 16);
}

// Submit handler
const handleSubmit = async () => {
  try {
    const payload = {
      ...rule.value,
      contract_cost: Number(rule.value.contract_cost),
      bid_cost: Number(rule.value.bid_cost),
      total_players_in_team: Number(rule.value.total_players_in_team),
      total_contract_players: Number(rule.value.total_contract_players),
      auction_time_limit: Number(rule.value.auction_time_limit),
      auction_start_date: new Date(rule.value.auction_start_date),
    };

    const response = await updateSettings(payload);
    console.log('✅ Updated:', response.data);
  } catch (error) {
    console.log('❌ Update error:', error);
  }
};
</script>

<template>
  <DashboardLayout>
    <div class="w-full px-4 sm:px-6 lg:px-8 py-4 bg-white shadow max-w-xl mx-auto m-5">

      <div class="flex flex-col sm:flex-row justify-between mb-4 sm:mb-6">
        <h1 class="text-xs sm:text-xl font-bold text-gray-800 mb-1 truncate">Auction Date</h1>
        <input type="datetime-local" v-model="rule.auction_start_date" class="border border-gray-300 rounded-md p-2 sm:px-7">
      </div>

      <div class="flex flex-col sm:flex-row justify-between mb-4 sm:mb-6">
        <h1 class="text-xs sm:text-xl font-bold text-gray-800 mb-1 truncate">Bidding Cost <span>(One Team)</span></h1>
        <input type="number" v-model="rule.bid_cost" class="border border-gray-300 rounded-md p-2">
      </div>

      <div class="flex flex-col sm:flex-row justify-between mb-4 sm:mb-6">
        <h1 class="text-xs sm:text-xl font-bold text-gray-800 mb-1 truncate">Contract Cost <span>(One Team)</span></h1>
        <input type="number" v-model="rule.contract_cost" class="border border-gray-300 rounded-md p-2">
      </div>

      <div class="flex flex-col sm:flex-row justify-between mb-4 sm:mb-6">
        <h1 class="text-xs sm:text-xl font-bold text-gray-800 mb-1 truncate">Total Players <span>(One Team)</span></h1>
        <input type="number" v-model="rule.total_players_in_team" class="border border-gray-300 rounded-md p-2">
      </div>

      <div class="flex flex-col sm:flex-row justify-between mb-4 sm:mb-6">
        <h1 class="text-xs sm:text-xl font-bold text-gray-800 mb-1 truncate">Contract Players <span>(One Team)</span></h1>
        <input type="number" v-model="rule.total_contract_players" class="border border-gray-300 rounded-md p-2">
      </div>

      <div class="flex flex-col sm:flex-row justify-between mb-4 sm:mb-6">
        <h1 class="text-xs sm:text-xl font-bold text-gray-800 mb-1 truncate">Auction Period <span>(In Minutes)</span></h1>
        <input type="number" v-model="rule.auction_time_limit" class="border border-gray-300 rounded-md p-2">
      </div>

      <div class="flex justify-end mt-4">
        <button class="bg-gray-400 px-4 py-2 rounded-sm" @click="handleSubmit">Submit</button>
      </div>
    </div>
  </DashboardLayout>
</template>
