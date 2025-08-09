<script setup>
import { ref } from 'vue';
import DashboardLayout from '../../layouts/DashboardLayout.vue';


const chatUserId = ref('');
const goToChat = async ()=>{
    console.log("click")
}
</script>

<template>
    <DashboardLayout>

        <div class=" bg-white p-2 shadow h-[calc(100vh-115px)] mt-3 overflow-y-auto gap-2 ">

            <!-- search bell icon -->
            <div class="flex justify-evenly p-2">
                <div>
                    A
                </div>
                <div>
                    B
                </div>
                <div>
                   C 
                </div>
            </div>

            <div class=" flex p-2 gap-1 items-center">

                <img src="../../assets/defualtUser.jpeg" alt="" class="rounded-full w-10 h-10 border-2">
                <div class=" flex flex-col border-2 rounded-sm  w-3xs cursor-pointer text-start truncate" @click="goToChat()">
                    <span class="px-2 text-sm font-medium truncate ml-3">Akila Umayangaaaaaaa</span>
                    <span class="px-2 text-sm font-medium ml-3">( Batsman )</span>
                </div>

            </div>
            
        </div>

    </DashboardLayout>

</template>