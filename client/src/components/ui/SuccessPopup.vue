<script setup>
import correctIcon from '../../assets/icons/correct.svg';

import { useRouter } from 'vue-router';

const props = defineProps({
  visible: Boolean,
  msg: {
    type: String,
    default: 'Action completed successfully'
  },
  route: String 
});

const router = useRouter();

const redirectBack = () => {
  if (props.route) {
    router.push(props.route);
  }
};

</script>

<template>
  <transition
    name="fade"
    appear
  >
    <div
      v-if="visible"
      class="fixed top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center"
    >
      <div class="bg-gray-200 rounded-2xl shadow-xl w-full max-w-md p-6 text-center relative scale-95 transition duration-300 ease-out">
        <div class="flex justify-center mb-4">
          <div class="w-16 h-16 flex items-center justify-center rounded-full border-4 border-black">
            <!-- <span class="text-3xl font-bold">?</span> -->
                        <img :src="correctIcon" class=" w-8 h-8">

          </div>
        </div>

        <h2 class="text-2xl font-bold mb-2 text-gray-800">{{ props.msg }}</h2>

        <div class="flex justify-center gap-4">
          <button
            class="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded shadow"
            @click="redirectBack"
          >
            YES
          </button>
          
        </div>
      </div>
    </div>
  </transition>
</template>


<style scoped>

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

</style>
