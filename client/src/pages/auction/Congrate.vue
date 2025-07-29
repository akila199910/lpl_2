<template>
  <div class="relative w-full h-screen overflow-hidden flex pt-10 justify-center text-center bg-purple-100">
    <!-- Background image -->
    <img
      src="../../assets/winning.gif"
      alt="Fireworks"
      class="absolute top-0 left-0 w-full h-full object-cover z-0"
    />

    <!-- Overlay content -->
    <div class="z-10 text-gray-800 px-4 max-w-xl">
      <img
        :src='displayData.player_id?.user_id?.profile.profileImageUrl == "user.png" ? defualtUser : displayData.player_id?.user_id?.profile.profileImageUrl'
        alt="Player"
        class="w-48 h-48 rounded-full mx-auto mb-6 border-4 border-black shadow-lg"
      />
      <h1 class="text-2xl sm:text-5xl font-extrabold mb-3 mt-3 uppercase">Congratulations {{ displayData.player_id?.user_id?.name }} !</h1>
      <p class="text-lg sm:text-3xl font-bold mb-2">You has been sold!</p>
      <p class="text-lg sm:text-3xl font-bold mb-2">Rs : {{ displayData.bid_value }}</p>
      <p class="text-2xl sm:text-3xl font-bold mb-2 uppercase">{{ displayData.team_id?.name }}</p>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import { getPlayerBidDetails } from '../../services/autionService';
import defualtUser from '../../assets/defualtUser.jpeg';

const route = useRoute()
const displayData = ref({});

onMounted(async () => {
  const playerId = route.params.id
  try {
    const res = await getPlayerBidDetails(playerId)
    displayData.value = res.data.data;

    console.log(displayData.value)

  } catch (e) {
    console.error('Failed to load player', e)
  }
})
</script>
