<template>
  <div class="relative w-full h-screen overflow-hidden flex pt-10 justify-center text-center bg-purple-100">
    <!-- Background image -->
    <img :src="isSell ? winning : lost" alt="Fireworks" class="absolute top-0 left-0 w-full h-full object-cover z-0" />

    <!-- Overlay content -->
    <div class="z-10 text-gray-800 px-4 max-w-xl mb-5">
      <img
        :src='displayData.player_id?.user_id?.profile.profileImageUrl == "user.png" ? defualtUser : displayData.player_id?.user_id?.profile.profileImageUrl'
        alt="Player" class="w-48 h-48 rounded-full mx-auto mb-10 border-4 border-black shadow-lg" />
      <h1 class="text-2xl sm:text-5xl font-extrabold mb-3 mt-3 uppercase" v-if="isSell">Congratulations {{
        displayData.player_id?.user_id?.name }} !</h1>
      <h1 class="text-2xl sm:text-5xl font-extrabold mb-3 mt-3 uppercase" v-if="!isSell">Try Again Next Round <br>{{
        displayData.player_id?.user_id?.name }} !</h1>
      <p class="text-lg sm:text-3xl font-bold mb-2" v-if="isSell">You has been sold!</p>
      <p class="text-lg sm:text-3xl font-bold mb-2" v-if="isSell">Rs : {{ displayData.bid_value }}</p>
      <p class="text-2xl sm:text-3xl font-bold mb-2 uppercase">{{ displayData.team_id?.name }}</p>
      <p class="text-2xl sm:text-3xl font-bold mb-2 uppercase" v-if="!isSell">No Team</p>

    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import { getPlayerBidDetails } from '../../services/autionService';
import defualtUser from '../../assets/defualtUser.jpeg';
import winning from '../../assets/winning.gif';
import lost from '../../assets/unsold.gif';

const route = useRoute()
const displayData = ref({});
const isSell = ref(false);

onMounted(async () => {
  const playerId = route.params.id
  try {
    const res = await getPlayerBidDetails(playerId)
    displayData.value = res.data.data;
    console.log(displayData.value)

    // Check if player has bids (team_id exists) or not
    if (displayData.value.team_id == null) {
      isSell.value = false;
    } else {
      isSell.value = true;
    }

    console.log(displayData.value)

  } catch (e) {

  }
})
</script>
