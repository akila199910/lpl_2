<script setup>
import DashboardLayout from '../../layouts/DashboardLayout.vue';

</script>
<!-- pages/dashboard/Index.vue -->
<template>
  <DashboardLayout>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-7xl mx-auto">
      <div class="bg-white rounded-lg shadow-md p-4 text-center cursor-pointer">
        <h1 class="font-semibold uppercase ">Total Players</h1>
        <span class="font-bold">10</span>
      </div>

      <div class="bg-white rounded-lg shadow-md p-4 text-center cursor-pointer">
        <h1 class="font-semibold uppercase">Total Batsman</h1>
        <span class="font-bold">10</span>
      </div>

      <div class="bg-white rounded-lg shadow-md p-4 text-center cursor-pointer">
        <h1 class="font-semibold uppercase">Total Bowlers</h1>
        <span class="font-bold">10</span>
      </div>
      <div class="bg-white rounded-lg shadow-md p-4 text-center cursor-pointer">
        <h1 class="font-semibold uppercase">Total Wicketkeepers</h1>
        <span class="font-bold">10</span>
      </div>
      <div class="bg-white rounded-lg shadow-md p-4 text-center cursor-pointer">
        <h1 class="font-semibold uppercase">Total All Rounders</h1>
        <span class="font-bold">10</span>
      </div>
    </div>
    
  </DashboardLayout>
</template>


