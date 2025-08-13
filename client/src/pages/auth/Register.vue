<script setup>
import AuthLayout from '../../layouts/AuthLayout.vue';
import BaseInput from '../../components/ui/BaseInput.vue';
import BaseButton from '../../components/ui/BaseButton.vue';
import { reactive, ref } from 'vue';
import { useAuthStore } from '../../store/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  contactNumber: '',
  country: '',
  status: 1,
  role: '',
  status: 0
});

const errors = ref({});
const router = useRouter();

const handleSubmit = async () => {
  errors.value = {};
  const res = await authStore.register(form);
  if (!res.success) {
    errors.value = res.errors;
    console.log(errors);
  } else {
   router.replace('/dashboard')
  }
};
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Mobile Layout (default) -->
    <div class="md:hidden min-h-screen items-center justify-center bg-gray-100 p-4">
      <div class="w-full rounded-lg shadow-md p-4 sm:p-8">
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <h2 class="text-2xl font-bold mb-4 text-wrap break-all">Register</h2>

          <BaseInput v-model="form.firstName" type="text" placeholder="First Name" />
          <p v-if="errors.firstName" class="text-sm text-red-500">
            {{ errors.firstName }}
          </p>

          <BaseInput v-model="form.lastName" type="text" placeholder="Last Name" />
          <p v-if="errors?.lastName" class="text-sm text-red-500">
            {{ errors.lastName }}
          </p>

          <BaseInput v-model="form.email" type="email" placeholder="premierleague@gmail.com" />
          <p v-if="errors?.email" class="text-sm text-red-500">
            {{ errors.email }}
          </p>

          <BaseInput v-model="form.contactNumber" type="text" placeholder="0123456789" />
          <p v-if="errors?.contactNumber" class="text-sm text-red-500">
            {{ errors.contactNumber }}
          </p>

          <BaseInput v-model="form.password" type="password" placeholder="Password" />
          <p v-if="errors?.password" class="text-sm text-red-500">
            {{ errors.password }}
          </p>

          <BaseInput v-model="form.confirmPassword" type="password" placeholder="Confirm Password" />
          <p v-if="errors?.confirmPassword" class="text-sm text-red-500">
            {{ errors.confirmPassword }}
          </p>

          <BaseInput v-model="form.country" type="text" placeholder="Country" />
          <p v-if="errors?.country" class="text-sm text-red-500">
            {{ errors?.country }}
          </p>

          <!-- Role Dropdown -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Role</label>
            <select v-model="form.role"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option value="">Select Role</option>
              <option value="Batsman">Batsman</option>
              <option value="Bowler">Bowler</option>
              <option value="AllRounder">All Rounder</option>
              <option value="Wicketkeeper">Wicket Keeper</option>
            </select>
          </div>

          <BaseButton class="text-wrap break-all overflow-hidden">Register</BaseButton>

          <p class="font-medium">Already have an account?
            <span class="font-bold cursor-pointer text-blue-600 hover:text-blue-800"
              @click="router.push('/login')">Login</span>
          </p>
        </form>
      </div>
    </div>

    <!-- Desktop Layout (md and larger) -->
    <div class="hidden md:flex min-h-screen">
      <!-- Left Side - Image -->
      <div
        class="flex-1 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 relative overflow-hidden p-4">
        <div class="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-indigo-600/10"></div>
         <img src="/src/assets/login.jpg" alt="Login"
          class="relative z-10 w-2/3 h-1/2   shadow-2xl rounded-lg transform hover:scale-105 transition-transform duration-300 ease-in-out max-w-4xl max-h-[90vh] mx-4" />
      </div>

      <!-- Right Side - Register Form -->
      <div class="flex-1 flex items-center justify-center p-8">
        <div class="w-full max-w-md">
          <div class="text-center mb-8">
            <h2 class="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
            <p class="text-gray-600">Join us and start your journey</p>
          </div>

          <form @submit.prevent="handleSubmit" class="space-y-6">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <BaseInput v-model="form.firstName" type="text" placeholder="First Name" />
                <p v-if="errors.firstName" class="text-sm text-red-500 mt-1">
                  {{ errors.firstName }}
                </p>
              </div>
              <div>
                <BaseInput v-model="form.lastName" type="text" placeholder="Last Name" />
                <p v-if="errors?.lastName" class="text-sm text-red-500 mt-1">
                  {{ errors.lastName }}
                </p>
              </div>
            </div>

            <div>
              <BaseInput v-model="form.email" type="email" placeholder="premierleague@gmail.com" />
              <p v-if="errors?.email" class="text-sm text-red-500 mt-1">
                {{ errors.email }}
              </p>
            </div>

            <div>
              <BaseInput v-model="form.contactNumber" type="text" placeholder="0123456789" />
              <p v-if="errors?.contactNumber" class="text-sm text-red-500 mt-1">
                {{ errors.contactNumber }}
              </p>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <BaseInput v-model="form.password" type="password" placeholder="Password" />
                <p v-if="errors?.password" class="text-sm text-red-500 mt-1">
                  {{ errors.password }}
                </p>
              </div>
              <div>
                <BaseInput v-model="form.confirmPassword" type="password" placeholder="Confirm Password" />
                <p v-if="errors?.confirmPassword" class="text-sm text-red-500 mt-1">
                  {{ errors.confirmPassword }}
                </p>
              </div>
            </div>

            <div>
              <BaseInput v-model="form.country" type="text" placeholder="Country" />
              <p v-if="errors?.country" class="text-sm text-red-500 mt-1">
                {{ errors?.country }}
              </p>
            </div>

            <!-- Role Dropdown -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Role</label>
              <select v-model="form.role"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="">Select Role</option>
                <option value="Batsman">Batsman</option>
                <option value="Bowler">Bowler</option>
                <option value="AllRounder">All Rounder</option>
                <option value="Wicketkeeper">Wicket Keeper</option>
              </select>
            </div>

            <BaseButton class="w-full text-wrap break-all overflow-hidden">Register</BaseButton>

            <p class="text-center font-medium">
              Already have an account?
              <span class="font-bold cursor-pointer text-blue-600 hover:text-blue-800" @click="router.push('/login')">
                Login
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>