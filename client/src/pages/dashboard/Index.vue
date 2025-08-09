<script setup>
import { ref } from 'vue';
import DashboardLayout from '../../layouts/DashboardLayout.vue';
import { onMounted } from 'vue';
import { getDashboard } from '../../services/dashboardService';
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend
} from 'chart.js'
import { computed } from 'vue';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)


const chartKey = computed(() => chartData.value.datasets[0].data.join(','))


const ORDER = ['0','1','2','3','4','5','6']

const STATUS_LABELS = {
  0: 'Pending',
  1: 'Approved',
  2: 'Sold',
  3: 'Unsold',
  4: 'Contract',
  5: 'Contracted',
  6: 'Rejected'
}

const chartData = ref({
  labels: ORDER.map(k => STATUS_LABELS[k]),
  datasets: [
    {
      label: 'Players',
      // give a color so 1–4 values are visible
      backgroundColor: '#3b82f6',
      data: [] // filled in onMounted
    }
  ]
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: true },
    title: { display: true, text: 'Players by Status' }
  },
  scales: {
    y: { beginAtZero: true, ticks: { precision: 0 } }
  }
}

const countDetails = ref({});

onMounted(async () => {
  try {
    const res = await getDashboard()
    const counts = res?.data?.data ?? {}
    const arr = ORDER.map(k => counts[k] ?? 0)
    countDetails.value = res.data.data

    console.log('dashboard counts:', counts)
    console.log('chart array:', arr)

    // ✅ immutable update so Chart.js re-renders
    chartData.value = {
      ...chartData.value,
      datasets: [
        {
          ...chartData.value.datasets[0],
          data: arr
        }
      ]
    }
  } catch (error) {
    console.error(error)
  }
})


</script>
<!-- pages/dashboard/Index.vue -->
<template>
  <DashboardLayout>
    <div class="flex flex-col min-h-[calc(100vh-100px)] justify-between"> 
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-7xl mx-auto mt-6">

        <div class="bg-white rounded-lg shadow-md p-4 text-center cursor-pointer">
          <h1 class="font-semibold uppercase ">Total Pending</h1>
          <span class="font-bold">{{ countDetails[0] }}</span>
        </div>

        <div class="bg-white rounded-lg shadow-md p-4 text-center cursor-pointer">
          <h1 class="font-semibold uppercase">Total Approved</h1>
          <span class="font-bold">{{ countDetails[1] }}</span>
        </div>

        <div class="bg-white rounded-lg shadow-md p-4 text-center cursor-pointer">
          <h1 class="font-semibold uppercase">Total Sold</h1>
          <span class="font-bold">{{ countDetails[3] }}</span>
        </div>

        <div class="bg-white rounded-lg shadow-md p-4 text-center cursor-pointer">
          <h1 class="font-semibold uppercase">Total Unsold</h1>
          <span class="font-bold">{{ countDetails[4] }}</span>
        </div>

        <div class="bg-white rounded-lg shadow-md p-4 text-center cursor-pointer">
          <h1 class="font-semibold uppercase">Total Contract</h1>
          <span class="font-bold">{{ countDetails[5] }}</span>
        </div>

        <div class="bg-white rounded-lg shadow-md p-4 text-center cursor-pointer">
          <h1 class="font-semibold uppercase">Total Contracted</h1>
          <span class="font-bold">{{ countDetails[6] }}</span>
        </div>
      </div>

      <div class="flex justify-center w-full ">
        <div class="sticky h-80 max-w-[320px] sm:min-w-sm mb-5">
        <Bar :key="chartKey" :data="chartData" :options="chartOptions" />
        </div>
      </div>
  </div>
  </DashboardLayout>
</template>


