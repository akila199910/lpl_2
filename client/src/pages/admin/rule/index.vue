<script setup>
import DashboardLayout from '../../../layouts/DashboardLayout.vue';



</script>

<template>
    <DashboardLayout>
        <div class=" w-full px-4 sm:px-6 lg:px-8 py-4 bg-white shadow max-w-xl mx-auto m-5">

            <div class="flex flex-col sm:flex-row justify-between mb-4 sm:mb-6">
                <h1 class="text-xs sm:text-xl font-bold text-gray-800 mb-1 truncate">Auction Date</h1>
                <input type="date" class="border border-gray-300 rounded-md p-2 sm:px-7">
            </div>

            <div class="flex flex-col sm:flex-row justify-between mb-4 sm:mb-6">
                <h1 class="text-xs sm:text-xl font-bold text-gray-800 mb-1 truncate">Bidding Cost  <span>(One Team)</span></h1>
                <input type="text" class="border border-gray-300 rounded-md p-2">
            </div>

            <div class="flex flex-col sm:flex-row justify-between mb-4 sm:mb-6">
                <h1 class="text-xs sm:text-xl font-bold text-gray-800 mb-1 truncate">Contract Cost  <span>(One Team)</span></h1>
                <input type="text" class="border border-gray-300 rounded-md p-2">
            </div>

            <div class="flex flex-col sm:flex-row justify-between mb-4 sm:mb-6">
                <h1 class="text-xs sm:text-xl font-bold text-gray-800 mb-1 truncate">Total Players <span>(One Team)</span></h1>
                <input type="text" class="border border-gray-300 rounded-md p-2">
            </div>

            <div class="flex flex-col sm:flex-row justify-between mb-4 sm:mb-6">
                <h1 class="text-xs sm:text-xl font-bold text-gray-800 mb-1 truncate">Contract Players <span>(One Team)</span></h1>
                <input type="text" class="border border-gray-300 rounded-md p-2">
            </div>

            <div class="flex flex-col sm:flex-row justify-between mb-4 sm:mb-6">
                <h1 class="text-xs sm:text-xl font-bold text-gray-800 mb-1 truncate">Auction Period <span>(In Minutes)</span></h1>
                <input type="text" class="border border-gray-300 rounded-md p-2">
            </div>

            

        </div>
    </DashboardLayout>
</template>