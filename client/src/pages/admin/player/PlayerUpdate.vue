<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import DashboardLayout from '../../../layouts/DashboardLayout.vue';
import { createPlayer, getPlayerById } from '../../../services/playerService';
import defaultProfile from '../../../assets/defualtUser.jpeg';
import userIcon from '../../../assets/icons/user.svg';

import Batting from './Batting.vue';
import Bowling from './Bowling.vue';
import Other from './Other.vue';
import ConfirmModal from '../../../components/ui/ConfirmModal.vue';
import SuccessPopup from '../../../components/ui/SuccessPopup.vue';

const route = useRoute();
const userId = route.params.id;

const userData = ref({
  name: '',
  email: '',
  contactNumber: '',
  country: '',
  role: '',
  profile: '',
  age: 25,
  status: 0
});

const playerData = ref({
  batting_style: '',
  batting_average: '',
  batting_strike_rate: '',
  batting_runs: '',
  number_of_hundreds: '',
  number_of_fifties: '',
  batting_high_score: '',

  bowling_style: '',
  bowling_average: '',
  bowling_strike_rate: '',
  bowling_wickets: '',
  bowling_economy: '',

  number_of_catches: '',
  number_of_stumpings: '',
  number_of_matches: '',
  number_of_innings: '',

  player_status: 1,
  status: 1,
  user_id: '',
  role: ''
});

const errors = ref({});
const message = ref('');
const loading = ref(false);
const showConfirmModal = ref(false);
const successPopup = ref(false);
const msg = ref('');

const statusLabel = (status) => {
  const labels = ['Pending', 'Approved', 'Rejected', 'Sold', 'Unsold', 'Contracted', 'Archived'];
  return labels[status] || 'Unknown';
};

const statusColor = (status) => {
  const colors = [
    'bg-yellow-500',
    'bg-green-600',
    'bg-red-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-orange-500',
    'bg-blue-500'
  ];
  return colors[status] || 'bg-gray-300';
};

onMounted(async () => {
  try {
    const res = await getPlayerById(userId);
    if (!res.data.success) return;

    const player = res.data.data;
    const user = player.user_id || player;
    const profile = user.profile || {};

    userData.value = {
      name: user.name,
      email: user.email,
      contactNumber: user.contactNumber,
      country: user.country,
      role: user.role,
      status: user.status,
      profile: profile.profileImageUrl || 'user.png',
      age: 25
    };

    if (player.user_id) {

      Object.assign(playerData.value, {

        batting_style: player.batting_style,
        batting_average: player.batting_average,
        batting_strike_rate: player.batting_strike_rate,
        batting_runs: player.batting_runs,
        number_of_hundreds: player.number_of_hundreds,
        number_of_fifties: player.number_of_fifties,
        batting_high_score: player.batting_high_score,

        bowling_style: player.bowling_style,
        bowling_average: player.bowling_average,
        bowling_strike_rate: player.bowling_strike_rate,
        bowling_wickets: player.bowling_wickets,
        bowling_economy: player.bowling_economy,

        number_of_catches: player.number_of_catches,
        number_of_stumpings: player.number_of_stumpings,
        number_of_matches: player.number_of_matches,
        number_of_innings: player.number_of_innings,

        player_status: player.status,
        role: user.role,
        user_id: userId,
        status: 1
      });
    } 
    else {
      playerData.value.user_id = userId;
      playerData.value.role = user.role;
    }

  } catch (err) {
    console.error('Failed to fetch player data:', err);
  }
});

const handleUpdate = async () => {
  try {
    const payload = { ...playerData.value };
    const response = await createPlayer(payload);

    if (response.data.success) {
      message.value = response.data.message;
      successPopup.value = true;
    } else {
      errors.value = response.data.errors || {};
    }

  } catch (err) {

    if(err.response?.data?.errors) {
        errors.value = err.response.data.errors;
      }

  } finally {
    loading.value = false;
  }
};

const handleApproveButton = () => {
  errors.value = {};
  msg.value = 'Do you want to approve this player?';
  showConfirmModal.value = true;
}
const handleUpdateButton = () => {
  errors.value = {};
  msg.value = 'Do you want to update this player?';
  showConfirmModal.value = true;
}
const confirmUpdate = async () => {
  showConfirmModal.value = false;
  await handleUpdate();
};
</script>


<template>
  <DashboardLayout>
    <div class="w-full px-4 sm:px-6 lg:px-8 py-4 bg-gray-100 min-h-screen">
      <h1 class="text-2xl font-bold text-center text-gray-800 mb-6">Update Player</h1>

      <div class="bg-white rounded-lg shadow p-6 max-w-3xl mx-auto" >

        <div class="flex flex-col justify-center items-center gap-3 sm:flex sm:flex-row sm:gap-x-6 sm:justify-start pb-4">

          <div class="flex flex-col items-center">
            <img :src="userData.profile == 'user.png' ? defaultProfile : userData.profile" alt="profile"
              class="w-32 h-32 rounded-full  mb-4 border-4 border-gray-300">

              <span
                :class="[
                  'px-3 py-1 rounded-full text-white text-xs font-semibold',
                  statusColor(userData.status)
                ]"
              >
                {{ statusLabel(userData.status) }}
              </span>
          </div>


          <div class=" space-y-2 text-justify">
            <div class="flex items-center  gap-2 break-all ">
              <img :src="userIcon" alt="">
              <span>{{ userData.name }}</span>
            </div>

            <div class="flex items-center  gap-2 break-all ">
              <img :src="userIcon" alt="">
              <span>{{ userData.country }}</span>
            </div>

            <div class="flex items-center  gap-2 break-all ">
              <img :src="userIcon" alt="">
              <span>{{ userData.role }}</span>
            </div>

            <div class="flex items-center  gap-2 break-all ">
              <img :src="userIcon" alt="">
              <span>{{ userData.age }} Years</span>
            </div>

          </div>

        </div>
        <hr>
        
        <div class="mt-4" v-if="userData.role !== 'Bowler' ">
          <Batting :data="playerData" :errors="errors"/>
        </div>
        <div class="mt-4"  v-if="userData.role !== 'Batsman' && userData.role !== 'WicketKeeper' ">
          <Bowling :data="playerData" :errors="errors"/>
        </div>

        <div class="mt-4">
          <Other :data="playerData" :errors="errors"/>
        </div>
        

        <div class=" flex flex-col gap-2 sm:flex-row sm:justify-between">

            <button class=" bg-red-300 rounded-sm py-2 max-w-40 sm:px-6" @click="$router.back()">Back</button>
            <button class="bg-green-300 rounded-sm py-2 max-w-40 sm:px-6" v-if="userData.status == 0" @click="handleApproveButton">
              Approved
            </button>
            <button class="bg-green-500 rounded-sm py-2 max-w-40 sm:px-6" v-if="userData.status == 1" @click="handleUpdateButton">
              Update
            </button>
        </div>
      </div>
    </div>
    <ConfirmModal
          :visible="showConfirmModal"
          :msg="msg"
          @confirm="confirmUpdate"
          @cancel="showConfirmModal = false"
        />

    <SuccessPopup 
        :visible="successPopup"
        :msg="message"
        route = '/players'
        />
  </DashboardLayout>
</template>

