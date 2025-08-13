<script setup>
import { computed, reactive, ref } from 'vue';
import DashboardLayout from '../../layouts/DashboardLayout.vue';
import addUser from '../../assets/icons/addUser.svg'
import search from '../../assets/icons/search.svg'
import { watch } from 'vue';
import { getUserByName } from '../../services/userService';

const usersFilterList = ref([]);
const showUserList = ref(false)
const hasFilterUsers = computed(() => usersFilterList.value.length > 0);
const userChatList = ref(false);
const chatPage = ref(false);

const goToChat = async (user) => {

    console.log("click" + user.name)
    chatPage.value = true;
    usersFilterList.value = [];
} 

const searchUserName = ref('')

const getUsersList = async (val) => {

    try {
        const response = await getUserByName(val);
        console.log(response)
        usersFilterList.value = response.data.data
        console.log(usersFilterList.value)


    } catch (error) {
        if (error.status == 404) {
            usersFilterList.value = [];
        }
    }

}

watch(searchUserName, (newVal) => {

    getUsersList(newVal);
})
</script>

<template>
    <DashboardLayout>

        <div class=" bg-white p-2 shadow h-[calc(100vh-115px)] mt-3 overflow-y-auto gap-2 ">

            <!-- this is search bar -->
            <div class="relative max-w-[256px] flex items-center mb-4 ml-2">

                <input type="text" placeholder="Search User Name..." class="border rounded-2xl  pl-8 py-2"
                    v-model="searchUserName" />
                <img :src="search" alt="Search"
                    class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 pointer-events-none" />
            </div>

            <!-- this is filter user list -->
            <div class=" flex p-2 gap-1 items-center" v-if="hasFilterUsers" v-for="user in usersFilterList">
                <img src="../../assets/defualtUser.jpeg" alt="" class="rounded-full w-10 h-10 border-2">
                <div class=" flex flex-col border-2 rounded-sm  w-3xs cursor-pointer text-start truncate"
                    @click="goToChat(user)">
                    <span class="px-2 text-sm font-medium truncate ml-3">{{ user.name }}</span>
                    <span class="px-2 text-sm font-medium ml-3">( {{ user.role }} )</span>
                </div>
            </div>

            <!-- this is chat list -->
            <div class=" flex p-2 gap-1 items-center" v-if="userChatList">
                <img src="../../assets/defualtUser.jpeg" alt="" class="rounded-full w-10 h-10 border-2">
                <div class=" flex flex-col border-2 rounded-sm  w-3xs cursor-pointer text-start truncate"
                    @click="goToChat(user)">
                    <span class="px-2 text-sm font-medium truncate ml-3">Akila Umayangaaaaaaa</span>
                    <span class="px-2 text-sm font-medium ml-3">( Batsman )</span>
                </div>
            </div>

            <!-- this is chat page  -->
            <div class=" flex p-2 gap-1 items-center" v-if="chatPage">
                <img src="../../assets/defualtUser.jpeg" alt="" class="rounded-full w-10 h-10 border-2">
                <div class=" flex flex-col border-2 rounded-sm  w-3xs cursor-pointer text-start truncate">
                    <span class="px-2 text-sm font-medium truncate ml-3">hc</span>
                    <span class="px-2 text-sm font-medium ml-3"></span>
                </div>
            </div>

        </div>

    </DashboardLayout>

</template>