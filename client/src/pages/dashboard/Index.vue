<!-- pages/dashboard/Index.vue -->
<template>
  <DashboardLayout>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <StatCard label="Total Teams" :value="12" />
      <StatCard label="Auctions" :value="5" />
      <StatCard label="Bids Today" :value="41" />
    </div>
  </DashboardLayout>
</template>

<script setup>
import DashboardLayout from '../../layouts/DashboardLayout.vue';
import StatCard from '../../components/ui/StatCard.vue';
</script>
