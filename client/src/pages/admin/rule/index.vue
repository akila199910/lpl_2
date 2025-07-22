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
})

onMounted(async () => {
    try {

        const res = await getSettings();
        console.log(res.data.data);
        rule.value = res.data.data

    } catch (error) {
        console.log(error);
    }
})

const handleSubmit = async()=>{
    try {

        const response = await updateSettings(rule.value);
        console.log(response.data);
        
    } catch (error) {
        console.log(error);
        
    }
}

</script>

<template>
    <DashboardLayout>
        <div class=" w-full px-4 sm:px-6 lg:px-8 py-4 bg-white shadow max-w-xl mx-auto m-5">

            <div class="flex flex-col sm:flex-row justify-between mb-4 sm:mb-6">
                <h1 class="text-xs sm:text-xl font-bold text-gray-800 mb-1 truncate">Auction Date</h1>
                <input type="datetime-local" v-model="rule.auction_start_date" class="border border-gray-300 rounded-md p-2 sm:px-7">
            </div>

            <div class="flex flex-col sm:flex-row justify-between mb-4 sm:mb-6">
                <h1 class="text-xs sm:text-xl font-bold text-gray-800 mb-1 truncate">Bidding Cost <span>(One Team)</span></h1>
                <input type="text" v-model="rule.bid_cost" class="border border-gray-300 rounded-md p-2">
            </div>

            <div class="flex flex-col sm:flex-row justify-between mb-4 sm:mb-6">
                <h1 class="text-xs sm:text-xl font-bold text-gray-800 mb-1 truncate">Contract Cost <span>(One
                        Team)</span></h1>
                <input type="text" class="border border-gray-300 rounded-md p-2" v-model="rule.contract_cost">
            </div>

            <div class="flex flex-col sm:flex-row justify-between mb-4 sm:mb-6">
                <h1 class="text-xs sm:text-xl font-bold text-gray-800 mb-1 truncate">Total Players <span>(One
                        Team)</span></h1>
                <input type="text" class="border border-gray-300 rounded-md p-2" v-model="rule.total_players_in_team">
            </div>

            <div class="flex flex-col sm:flex-row justify-between mb-4 sm:mb-6">
                <h1 class="text-xs sm:text-xl font-bold text-gray-800 mb-1 truncate">Contract Players <span>(One
                        Team)</span></h1>
                <input type="text" class="border border-gray-300 rounded-md p-2" v-model="rule.total_contract_players">
            </div>

            <div class="flex flex-col sm:flex-row justify-between mb-4 sm:mb-6">
                <h1 class="text-xs sm:text-xl font-bold text-gray-800 mb-1 truncate">Auction Period <span>(In
                        Minutes)</span></h1>
                <input type="text" class="border border-gray-300 rounded-md p-2" v-model="rule.auction_time_limit">
            </div>

            <div class="flex justify-end mt-4">
                <button class="bg-gray-400 px-4 py-2 rounded-sm" @click="handleSubmit">Submit</button>
            </div>
        </div>
    </DashboardLayout>
</template>