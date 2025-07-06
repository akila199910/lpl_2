<script setup>

defineProps({
  visible: Boolean,
  msg: {
    type: String,
    default: 'Do you want to continue this action?'
  }
});

defineEmits(['confirm', 'cancel']);

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
          <div class="w-16 h-16 flex items-center justify-center rounded-full border-4 border-red-500 text-red-500">
            <span class="text-3xl font-bold">?</span>
          </div>
        </div>

        <h2 class="text-2xl font-bold mb-2 text-gray-800">Are you Sure!</h2>
        <p class="text-gray-600 text-sm font-bold mb-6">{{ msg }}</p>

        <div class="flex justify-center gap-4">
          <button
            class="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded shadow"
            @click="$emit('confirm')"
          >
            YES
          </button>
          <button
            class="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded shadow"
            @click="$emit('cancel')"
          >
            CANCEL
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
