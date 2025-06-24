<script setup>
import 'vue3-easy-data-table/dist/style.css'
import DashboardLayout from '../../../layouts/DashboardLayout.vue'
import EasyDataTable from '../../../components/layout/EasyDataTable.vue'
import TableHeader from '../../../components/ui/TableHeader.vue'

const columns = [
  {  text: 'ID', value: 'id' },
  { text: 'Name', value: 'name' },
  { text: 'Coach', value: 'coach' },
  { text: 'Actions', value: 'actions', sortable: false }
   ]

const teams = [
  { id: 1, name: 'Team A', coach: 'Coach X' },
  { id: 2, name: 'Team B', coach: 'Coach Y' },
  { id: 3, name: 'Team C', coach: 'Coach Z' },
  { id: 4, name: 'Team A', coach: 'Coach X' },
  { id: 5, name: 'Team B', coach: 'Coach Y' },
  { id: 6, name: 'Team C', coach: 'Coach Z' },
  { id: 7, name: 'Team A', coach: 'Coach X' },
  { id: 8, name: 'Team B', coach: 'Coach Y' },
  { id: 9, name: 'Team C', coach: 'Coach Z' },{ id: 22, name: 'Team A', coach: 'Coach X' },
  { id: 10, name: 'Team B', coach: 'Coach Y' },
  { id: 11, name: 'Team C', coach: 'Coach Z' },{ id: 23, name: 'Team A', coach: 'Coach X' },
  { id: 12, name: 'Team B', coach: 'Coach Y' },
  { id: 13, name: 'Team C', coach: 'Coach Z' },{ id: 24, name: 'Team A', coach: 'Coach X' },
  { id: 14, name: 'Team B', coach: 'Coach Y' },
  { id: 15, name: 'Team C', coach: 'Coach Z' },{ id: 25, name: 'Team A', coach: 'Coach X' },
  { id: 16, name: 'Team B', coach: 'Coach Y' },
  { id: 17, name: 'Team C', coach: 'Coach Z' },{ id: 26, name: 'Team A', coach: 'Coach X' },
  { id: 18, name: 'Team B', coach: 'Coach Y' },
  { id: 19, name: 'Team C', coach: 'Coach Z' },{ id: 27, name: 'Team A', coach: 'Coach X' },
  { id: 20, name: 'Team B', coach: 'Coach Y' },
  { id: 21, name: 'Team C', coach: 'Coach Z' }
  // Add more for pagination
]

function handleView(team) {
  console.log('View:', team);
}
function handleEdit(team) {
  console.log('Edit:', team);
}
function handleDelete(team) {
  console.log('Delete:', team);
}

</script>

<template>
  <DashboardLayout>
    <div class="w-full px-4 sm:px-6 lg:px-8 py-4">
      
      <TableHeader title='Teams Overview' 
                buttonText="Add New Team" 
                buttonLink="/teams/create"
                @addNew="$router.push('/teams/create')"
      />

      <!-- Table Section -->
      <div class="bg-white rounded-lg shadow-md p-4">
        <EasyDataTable
          :headers="columns"
          :data="teams"
            @view="handleView"
            @edit="handleEdit"
            @delete="handleDelete"
        />
      </div>
    </div>
  </DashboardLayout>
</template>





