<script setup>
import { onMounted, ref } from 'vue'
import DashboardLayout from '../../../layouts/DashboardLayout.vue'
import { useRoute, useRouter } from 'vue-router'
import { getPlayerById } from '../../../services/playerService';
import defaultProfile from '../../../assets/defualtUser.jpeg';
import userIcon from '../../../assets/icons/user.svg';
import Batting from './Batting.vue'
// import { createTeam } from '../../../services/teamService.mjs'


const route = useRoute()
const router = useRouter()

const userData = ref({
  name: '',
  email: '',
  contactNumber: '',
  country: '',
  role:'',
  profile:'',
  age: 25,
})


const errors = ref({})
const successMessage = ref('')
const loading = ref(false)
const userId = route.params.id

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


onMounted(async()=>{
  try {
    const res = await getPlayerById(userId)
    if(res.data.success === true){

       const data = res.data.data;

       userData.value = {
        name: data.name,
        email: data.email,
        contactNumber: data.contactNumber,
        country: data.country,
        role: data.role,
        status: data.status,
        profile: data.profile?.profileImageUrl,
        age : 25
       }

    }  
    console.log(userData);
  } catch (error) {
    
  }
})

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
        
        <div class="mt-4">
          <Batting/>
        </div>
        <div class="mt-4">
          <Batting/>
        </div>
        

        <div class=" flex flex-col gap-2 sm:flex-row sm:justify-between">
          <button class=" bg-red-300 rounded-sm py-2 max-w-40 sm:px-6">Back</button>
          <button class=" bg-green-300 rounded-sm py-2 max-w-40 sm:px-6">Approved</button>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

