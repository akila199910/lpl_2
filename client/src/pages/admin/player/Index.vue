<script setup>
import EasyDataTable from 'vue3-easy-data-table'
import 'vue3-easy-data-table/dist/style.css';
import { ref, onMounted } from 'vue';
import DashboardLayout from '../../../layouts/DashboardLayout.vue';
import { useRouter } from 'vue-router';
import defualtUser from '../../../assets/defualtUser.jpeg';
import { getPlayerById, getPlayers } from '../../../services/playerService';
import moveIcon from '../../../assets/icons/move.svg';
import actionIcon from '../../../assets/icons/action.svg';
import eyeIcon from '../../../assets/icons/eye.svg';
import pencilIcon from '../../../assets/icons/pencil.svg';
import deleteIcon from '../../../assets/icons/delete.svg';

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
const selectedPlayer = ref({});
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
        name: player.user_id.name,
        country: player.user_id.country,
        role: player.user_id.role,
        status: player.status,
        profile: player.user_id.profile?.profileImageUrl || 'user.png',
      }));

    }
  } catch (err) {
    errors.value = err.response?.data?.errors || {};
  } finally {
    loading.value = false;
  }
});

const handleView = async (id) => {
  try {
    const player = await getPlayerById(id);

    if (player.data.success === true) {
      selectedPlayer.value = player.data.data;
      console.log(selectedPlayer);
      showModal.value = true;
    }

  } catch (error) {

  }

};
const handleEdita = (id) => {

  router.push(`/player/${id}`);
};
const handleDelete = (id) => {
  console.log(id);
};
const handlePush = (id) => {
  router.push(`/live/auction/${id}`);
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
        <EasyDataTable :headers="columns" :items="players" buttons-pagination table-class-name="customize-table"
          :rows-per-page="10" :rows-items="[10, 25, 50, 100]" border-cell>
          <template #item-profile="{ profile }">
            <img :src="profile === 'user.png' ? defualtUser : profile" alt="Profile"
              class="w-10 h-10 rounded-full object-cover mx-auto" />
          </template>

          <template #item-status="{ status }">
            <span :class="[
              'px-2 py-1 rounded-full text-white text-xs font-semibold',
              statusColor(status)
            ]">
              {{ statusLabel(status) }}
            </span>
          </template>

          <template #item-actions="{ id, status }">
            <div class="relative group inline-block">
              <!-- Action Icon Trigger -->
              <img :src="actionIcon" alt="Actions" class="cursor-pointer w-5 h-5" />

              <!-- Dropdown Menu -->
              <div
                class="absolute z-50 top-6 left-0 w-40 bg-white rounded-md shadow-lg border border-gray-200 text-sm 
                      opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-150 ease-in-out">
                
                <button @click="handleView(id)" class="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2">
                  <img :src="eyeIcon" alt="View" class="w-5 h-5" />
                  View
                </button>

                <button @click="handleEdita(id)" class="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2">
                  <img :src="pencilIcon" alt="Edit" class="w-5 h-5" />
                  Edit
                </button>

                <button @click="handleDelete(id)" class="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2">
                  <img :src="deleteIcon" alt="Delete" class="w-5 h-5" />
                  Delete
                </button>

                <button v-if="status == 1" @click="handlePush(id)"
                  class="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2">
                  <img :src="moveIcon" alt="Push" class="w-5 h-5" />
                  Push to Auction
                </button>
              </div>
            </div>
          </template>


        </EasyDataTable>
      </div>
    </div>

    <!-- MODAL WRAPPER -->
    <div v-if="showModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 px-2 sm:px-4 py-4">
      <!-- MODAL CONTENT -->
      <div class="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">

        <!-- HEADER -->
        <div class="flex justify-between items-center border-b px-4 py-3">
          <h2 class="text-xl sm:text-2xl font-semibold text-gray-800">Player Details</h2>
          <button @click="showModal = false" class="text-gray-500 hover:text-gray-700 text-2xl">
            &times;
          </button>
        </div>

        <!-- BODY -->
        <div class="flex flex-col sm:flex-row justify-center sm:justify-evenly gap-6 px-6  sm:px-8 py-6 ">

          <!-- PROFILE IMAGE -->
          <div class="flex justify-center ">
            <img
              :src="selectedPlayer.user_id.profile?.profileImageUrl == 'user.png' ? defualtUser : selectedPlayer.user_id.profile?.profileImageUrl"
              alt="Profile" class="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-gray-200 object-cover" />
          </div>

          <!-- INFO LIST -->
          <div class="flex flex-col justify-center  space-y-4 ">
            <div class="flex justify-between items-center border-b px-4 py-3">
            <h2 class="text-xl sm:text-2xl font-semibold text-gray-800 truncate">Profile Information</h2>
            </div>
            <!-- Name -->
            <div class="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
              <label class="font-medium text-gray-700 w-24">Name:</label>
              <span class="truncate text-gray-900" :title="selectedPlayer.user_id.name">
                {{ selectedPlayer.user_id.name }}
              </span>
            </div>

            <!-- Role -->
            <div class="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
              <label class="font-medium text-gray-700 w-24">Role:</label>
              <span class="truncate text-gray-900" :title="selectedPlayer.user_id.role">
                {{ selectedPlayer.user_id.role }}
              </span>
            </div>

            <!-- Country -->
            <div class="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
              <label class="font-medium text-gray-700 w-24">Country:</label>
              <span class="truncate text-gray-900" :title="selectedPlayer.user_id.country">
                {{ selectedPlayer.user_id.country }}
              </span>
            </div>

            <!-- Email -->
            <div class="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
              <label class="font-medium text-gray-700 w-24">Email:</label>
              <span class="truncate text-gray-900" :title="selectedPlayer.user_id.email">
                {{ selectedPlayer.user_id.email }}
              </span>
            </div>

            <!-- Phone -->
            <div class="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
              <label class="font-medium text-gray-700 w-24">Phone:</label>
              <span class="truncate text-gray-900" :title="selectedPlayer.user_id.contactNumber">
                {{ selectedPlayer.user_id.contactNumber }}
              </span>
            </div>
          </div>

        </div>

          <div v-if="selectedPlayer.user_id.role !== 'Bowler'" class="flex flex-col justify-center sm:justify-evenly gap-6 px-6  sm:px-8 py-6 sm:max-w-3xl ">
            <div class="flex justify-between items-center border-b px-4 py-3 max-w-xl">
              <h2 class="text-xl sm:text-2xl font-semibold text-gray-800 truncate mb-2" title="Player Batting Information">
                Player
                Batting Information</h2>
            </div>

            <!-- INFO LIST OF STAT -->
            <div class="flex flex-col justify-center w-full space-y-4 ">

              <div class="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                <label class="font-medium text-gray-700 w-24">Style:</label>
                <span class="truncate text-gray-900"
                  :title="selectedPlayer.batting_style == 1 ? 'Right Hand' : 'Left Hand'">
                  {{ selectedPlayer.batting_style == 1 ? 'Right Hand' : 'Left Hand' }}
                </span>
              </div>

              <div class="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                <label class="font-medium text-gray-700 w-24">Average:</label>
                <span class="truncate text-gray-900" :title="selectedPlayer.batting_average">
                  {{ selectedPlayer.batting_average }}
                </span>
              </div>

              <div class="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                <label class="font-medium text-gray-700 w-24">Strike Rate:</label>
                <span class="truncate text-gray-900" :title="selectedPlayer.batting_strike_rate">
                  {{ selectedPlayer.batting_strike_rate }}
                </span>
              </div>

              <div class="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                <label class="font-medium text-gray-700 w-24">Runs:</label>
                <span class="truncate text-gray-900" :title="selectedPlayer.batting_runs">
                  {{ selectedPlayer.batting_runs }}
                </span>
              </div>

              <div class="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                <label class="font-medium text-gray-700 w-24">Hundreds:</label>
                <span class="truncate text-gray-900" :title="selectedPlayer.number_of_hundreds">
                  {{ selectedPlayer.number_of_hundreds }}
                </span>
              </div>

              <div class="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                <label class="font-medium text-gray-700 w-24">Fifties:</label>
                <span class="truncate text-gray-900" :title="selectedPlayer.number_of_fifties">
                  {{ selectedPlayer.number_of_fifties }}
                </span>
              </div>

              <div class="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                <label class="font-medium text-gray-700 w-24">High Score:</label>
                <span class="truncate text-gray-900" :title="selectedPlayer.batting_high_score">
                  {{ selectedPlayer.batting_high_score }}
                </span>
              </div>
            </div>
          </div>

          <div v-if="selectedPlayer.user_id.role !== 'Batsman' && selectedPlayer.user_id.role !== 'WicketKeeper'" class="flex flex-col justify-center sm:justify-evenly gap-6 px-6  sm:px-8 py-6 ">
            <div class="flex justify-between items-center border-b px-4 py-3">
              <h2 class="text-xl sm:text-2xl font-semibold text-gray-800 truncate mb-2" title="Player Bowling Information">
                Player
                Bowling Information</h2>
            </div>

            <!-- INFO LIST OF STAT -->
            <div class="flex flex-col justify-center w-full space-y-4 ">

              <div class="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                <label class="font-medium text-gray-700 w-24">Style:</label>
                <span class="truncate text-gray-900"
                  :title="selectedPlayer.bowling_style == 1 ? 'Right Hand' : 'Left Hand'">
                  {{ selectedPlayer.bowling_style == 1 ? 'Right Hand' : 'Left Hand' }}
                </span>
              </div>

              <div class="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                <label class="font-medium text-gray-700 w-24">Average:</label>
                <span class="truncate text-gray-900" :title="selectedPlayer.bowling_average">
                  {{ selectedPlayer.bowling_average }}
                </span>
              </div>

              <div class="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                <label class="font-medium text-gray-700 w-24">Strike Rate:</label>
                <span class="truncate text-gray-900" :title="selectedPlayer.bowling_strike_rate">
                  {{ selectedPlayer.bowling_strike_rate }}
                </span>
              </div>

              <div class="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                <label class="font-medium text-gray-700 w-24">Economy:</label>
                <span class="truncate text-gray-900" :title="selectedPlayer.bowling_economy">
                  {{ selectedPlayer.bowling_economy }}
                </span>
              </div>

              <div class="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                <label class="font-medium text-gray-700 w-24">Wickets:</label>
                <span class="truncate text-gray-900" :title="selectedPlayer.bowling_wickets">
                  {{ selectedPlayer.bowling_wickets }}
                </span>
              </div>
            </div>
          </div>

          <div v-if="selectedPlayer.user_id.role == 'WicketKeeper'" class="flex flex-col justify-center sm:justify-evenly gap-6 px-6  sm:px-8 py-6 ">
            <div class="flex justify-between items-center border-b px-4 py-3">
              <h2 class="text-xl sm:text-2xl font-semibold text-gray-800 truncate mb-2" title="Player Wicket Keeper Information">
                Player
                Wicket Keeper Information</h2>
            </div>

            <!-- INFO LIST OF STAT -->
            <div class="flex flex-col justify-center w-full space-y-4 ">

              <div class="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                <label class="font-medium text-gray-700 w-24">Catches:</label>
                <span class="truncate text-gray-900" :title="selectedPlayer.number_of_catches">
                  {{ selectedPlayer.number_of_catches }}
                </span>
              </div>

              <div class="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                <label class="font-medium text-gray-700 w-24">Stumpings:</label>
                <span class="truncate text-gray-900" :title="selectedPlayer.number_of_stumpings">
                  {{ selectedPlayer.number_of_stumpings }}
                </span>
              </div>
            </div>
          </div>

          <div class="flex flex-col justify-center sm:justify-evenly gap-6 px-6  sm:px-8 py-6 " >
            <div class="flex justify-between items-center border-b px-4 py-3">
              <h2 class="text-xl sm:text-2xl font-semibold text-gray-800 truncate mb-2" title="Player Other Information">
                Player
                Other Information</h2>
            </div>

            <!-- INFO LIST OF STAT -->
            <div class="flex flex-col justify-center w-full space-y-4 ">

              <div class="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                <label class="font-medium text-gray-700 w-24">Matches:</label>
                <span class="truncate text-gray-900" :title="selectedPlayer.number_of_matches">
                  {{ selectedPlayer.number_of_matches }}
                </span>
              </div>

              <div class="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                <label class="font-medium text-gray-700 w-24">Innings:</label>
                <span class="truncate text-gray-900" :title="selectedPlayer.number_of_innings">
                  {{ selectedPlayer.number_of_innings }}
                </span>
              </div>
            </div>
          </div>
      </div>
    </div>

  </DashboardLayout>
</template>
