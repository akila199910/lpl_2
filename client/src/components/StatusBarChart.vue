<script setup>
import { ref, onMounted } from 'vue'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend
} from 'chart.js'
import api from '../services/api'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const ORDER = ['0','1','2','3','4','5','6']
const STATUS_LABELS = {
  0: 'Pending',
  1: 'Approved',
  2: 'Sold',
  3: 'Unsold',
  4: 'Contract',
  5: 'Contracted',
  6: 'Other'
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

onMounted(async () => {
  const res = await api.get('/dashboard')
  // your sample shows counts at res.data.data
  const counts = res?.data?.data ?? {}
  const arr = ORDER.map(k => counts[k] ?? 0)

  // helpful logs while debugging
  console.log('dashboard counts:', counts)
  console.log('chart array:', arr)

  chartData.value.datasets[0].data = arr
})
</script>

<template>
  <!-- Make sure the container has a fixed height or it will look empty -->
  <div class="h-80">
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>
