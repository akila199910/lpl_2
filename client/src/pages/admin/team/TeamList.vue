<script setup>
import 'vue3-easy-data-table/dist/style.css';
import { ref, onMounted } from 'vue';
import DashboardLayout from '../../../layouts/DashboardLayout.vue';
import EasyDataTable from '../../../components/layout/EasyDataTable.vue';
import TableHeader from '../../../components/ui/TableHeader.vue';
import { getTeamById, getTeams } from '../../../services/teamService.mjs';
import { useRouter } from 'vue-router';
import logo from '../../../assets/download.png'


const columns = [
  { text: 'Logo', value: 'logo' },
  { text: 'Name', value: 'name' },
  { text: 'Owner Name', value: 'ownerName' }, // use the flattened field
  { text: 'Status', value: 'status' },
  { text: 'Actions', value: 'actions', sortable: false },
];


const teams = ref([]);
const loading = ref(true);
const errors = ref(null);
const selectedTeam = ref();
const showModal = ref(false);
const router = useRouter();



onMounted(async () => {
  try {
    const response = await getTeams();
    if (response.data.success === true) {
      const raw = response.data.data;

      teams.value = raw.map(team => ({
        ...team,
        id: team._id, // required for action buttons
        ownerName: team.owner_id?.name || 'N/A', // needed for visible column
      }));
    }
  } catch (err) {
    errors.value = err.response?.data?.errors || {};
  } finally {
    loading.value = false;
  }
});

 
async function handleView(team) {
 
  try {
    const response = await getTeamById(team);
    if (response.data.success === true) {
        selectedTeam.value = response.data.data;
        showModal.value = true
    }
  } catch (err) {
    if (err.response?.data?.errors) {
      errors.value = err.response.data.errors;
      console.log('Fetch error:', err.response.data.errors);
    }
  } finally {
    loading.value = false;
  }
}

 function handleEdit(team) {
    router.push(`/teams/update/${team}`);

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

<!-- View Team Modal -->
<div
  v-if="showModal"
  class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 px-4"
>
 <div class="bg-white rounded-2xl shadow-xl w-full max-w-3xl p-6 relative overflow-y-auto max-h-[90vh]">    <!-- Close Button -->
    <button
      @click="showModal = false"
      class="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl"
    >
      &times;
    </button>

    <!-- Modal Content -->
    <h2 class="text-2xl font-bold mb-6 text-center">Team Details</h2>

    <div v-if="selectedTeam" class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
      <!-- Logo -->
      <div>
        <p class="text-sm text-gray-500">Team Logo</p>
        <img :src="selectedTeam.logo == 'user.png' ? logo : selectedTeam.logo" alt="Logo" class="w-16 h-16 rounded-full object-cover" />
      </div>

      <!-- Team Name -->
      <div>
        <p class="text-sm text-gray-500">Team Name</p>
        <p class="text-base font-semibold break-words">{{ selectedTeam.name }}</p>
      </div>

      <!-- Owner Name -->
      <div>
        <p class="text-sm text-gray-500">Owner Name</p>
        <p class="text-base font-semibold break-words">{{ selectedTeam.owner_id?.name }}</p>
      </div>

      <!-- Status -->
      <div>
        <p class="text-sm text-gray-500">Status</p>
        <p class="text-base font-semibold">{{ selectedTeam.status === 1 ? 'Active' : 'Inactive' }}</p>
      </div>

      <!-- Contact -->
      <div>
        <p class="text-sm text-gray-500">Contact Number</p>
        <p class="text-base font-semibold">{{ selectedTeam.owner_id?.contactNumber }}</p>
      </div>

      <!-- Contracts -->
      <div>
        <p class="text-sm text-gray-500">Total Contracts</p>
        <p class="text-base font-semibold">{{ selectedTeam.total_contract }}</p>
      </div>

      <!-- Bids -->
      <div>
        <p class="text-sm text-gray-500">Total Bids</p>
        <p class="text-base font-semibold">{{ selectedTeam.total_bids }}</p>
      </div>
      <!-- Bids -->
      <div>
        <p class="text-sm text-gray-500">Total Bids</p>
        <p class="text-base font-semibold">{{ selectedTeam.total_bids }}</p>
      </div><!-- Bids -->
      <div>
        <p class="text-sm text-gray-500">Total Bids</p>
        <p class="text-base font-semibold">{{ selectedTeam.total_bids }}</p>
      </div><!-- Bids -->
      <div>
        <p class="text-sm text-gray-500">Total Bids</p>
        <p class="text-base font-semibold">{{ selectedTeam.total_bids }}</p>
      </div>
      <!-- Bids -->
      <div>
        <p class="text-sm text-gray-500">Total Bids</p>
        <p class="text-base font-semibold">{{ selectedTeam.total_bids }}</p>
      </div>
    </div>
  </div>
</div>



  </DashboardLayout>
  </template>





