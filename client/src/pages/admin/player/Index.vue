<script setup>
import EasyDataTable from 'vue3-easy-data-table'
import 'vue3-easy-data-table/dist/style.css';
import { ref, onMounted } from 'vue';
import DashboardLayout from '../../../layouts/DashboardLayout.vue';
import { useRouter } from 'vue-router';
import logo from '../../../assets/defualtUser.jpeg';
import { getPlayers } from '../../../services/playerService';
import TableHeader from '../../../components/ui/TableHeader.vue';

const columns = [
  { text: 'Profile', value: 'profile' },
  { text: 'Name', value: 'name' },
  { text: 'Country', value: 'country' },
  { text: 'Role', value: 'role' },
  { text: 'Status', value: 'status' },
  { text: 'Actions', value: 'actions', sortable: false },
];

const players = ref([]);
const loading = ref(true);
const errors = ref(null);
const selectedPlayer = ref();
const showModal = ref(false);
const router = useRouter();


const statusLabel = (status) => {
  switch (status) {
    case 0: return 'Pending';
    case 1: return 'Approved';
    case 2: return 'Rejected';
    case 3: return 'Sold';
    case 4: return 'Unsold';
    case 5: return 'Contracted';
    case 6: return 'Archived';
    default: return 'Unknown';
  }
}

const statusColor = (status) => {
  switch (status) {
    case 0: return 'bg-yellow-500';
    case 1: return 'bg-green-600';
    case 2: return 'bg-red-500';
    case 3: return 'bg-purple-500';
    case 4: return 'bg-pink-500';
    case 5: return 'bg-orange-500';
    case 6: return 'bg-blue-500';
    default: return 'bg-gray-300';
  }
}

onMounted(async () => {
  try {
    const response = await getPlayers();
    if (response.data.success === true) {

      const raw = response.data.data;
      players.value = raw.map((player) => ({
        id: player._id,
        name: player.name,
        country: player.country,
        role: player.role,
        status: player.status,
        profile: player.profile?.profileImageUrl || 'user.png',
      }));
      
    }
  } catch (err) {
    errors.value = err.response?.data?.errors || {};
  } finally {
    loading.value = false;
  }
});

const handleView = (id) => {
  console.log(id);
};
const handleEdita = (id) => {
  router.push(`/player/${id}`);
};
const handleDelete = (id) => {
  console.log(id);
};
</script>

<template>
  <DashboardLayout>

      <div class="w-full px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h1 class="text-xl sm:text-2xl font-semibold text-gray-800">
          Players Overview
          </h1>
          
      </div>

      <div class="bg-white rounded-lg shadow-md p-4">
        <EasyDataTable
          :headers="columns"
          :items="players"
          buttons-pagination
          table-class-name="customize-table"
          :rows-per-page="10"
          :rows-items="[10, 25, 50, 100]"
          border-cell
        >
          <template #item-profile="{ profile }">
            <img
              :src="profile === 'user.png' ? logo : profile"
              alt="Profile"
              class="w-10 h-10 rounded-full object-cover mx-auto"
            />
          </template>

          <template #item-status="{ status }">
            <span
              :class="[
                'px-2 py-1 rounded-full text-white text-xs font-semibold',
                statusColor(status)
              ]"
            >
              {{ statusLabel(status) }}
            </span>
          </template>

          <template #item-actions="{ id }">
            <div class="flex items-center gap-2 justify-center">
              <button @click="handleView(id)" title="View">
                <Icon icon="mdi:eye" class="w-5 h-5 text-blue-500 hover:text-blue-700" />
              </button>
              <button @click="handleEdita(id)" title="Edit">
                <Icon icon="mdi:pencil" class="w-5 h-5 text-green-500 hover:text-green-700" />
              </button>
              <button @click="handleDelete(id)" title="Delete">
                <Icon icon="mdi:delete" class="w-5 h-5 text-red-500 hover:text-red-700" />
              </button>
            </div>
          </template>

        </EasyDataTable>
      </div>
    </div>

    <!-- View Team Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 px-4"
    >
      <div class="bg-white rounded-2xl shadow-xl w-full max-w-3xl p-6 relative overflow-y-auto max-h-[90vh]">
        <!-- Close Button -->
        <button
          @click="showModal = false"
          class="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl"
        >
          &times;
        </button>

        <!-- Modal Content -->
        <h2 class="text-2xl font-bold mb-6 text-center">Team Details</h2>

        <div v-if="selectedTeam" class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <div>
            <p class="text-sm text-gray-500">Team Logo</p>
            <img
              :src="selectedTeam.logo === 'user.png' ? logo : selectedTeam.logo"
              alt="Logo"
              class="w-16 h-16 rounded-full object-cover"
            />
          </div>

          <div>
            <p class="text-sm text-gray-500">Team Name</p>
            <p class="text-base font-semibold break-words">{{ selectedTeam.name }}</p>
          </div>

          <div>
            <p class="text-sm text-gray-500">Owner Name</p>
            <p class="text-base font-semibold break-words">{{ selectedTeam.owner_id?.name }}</p>
          </div>

          <div>
            <p class="text-sm text-gray-500">Status</p>
            <p class="text-base font-semibold">
              {{ selectedTeam.status === 1 ? 'Active' : 'Inactive' }}
            </p>
          </div>

          <div>
            <p class="text-sm text-gray-500">Contact Number</p>
            <p class="text-base font-semibold">{{ selectedTeam.owner_id?.contactNumber }}</p>
          </div>

          <div>
            <p class="text-sm text-gray-500">Total Contracts</p>
            <p class="text-base font-semibold">{{ selectedTeam.total_contract }}</p>
          </div>

          <div>
            <p class="text-sm text-gray-500">Total Bids</p>
            <p class="text-base font-semibold">{{ selectedTeam.total_bids }}</p>
          </div>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>
