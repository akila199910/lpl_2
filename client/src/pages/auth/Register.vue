<script setup>
import AuthLayout from '../../layouts/AuthLayout.vue';
import BaseInput from '../../components/ui/BaseInput.vue';
import BaseButton from '../../components/ui/BaseButton.vue';
import { reactive, ref } from 'vue';
import { useAuthStore } from '../../store/auth';

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
  status :1
});

const errors = ref({});


const handleSubmit = async () => {

    errors.value = {};
    console.log(form);
    const res = await authStore.register(form);
    if (!res.success) {
        errors.value = res.errors;
        console.log(errors);
    } else {
        console.log(res);
        // continue as normal
    }
};

</script>

<template>
    <AuthLayout>

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
            <label class="block text-sm font-medium text-gray-700 mb-1">Select Your Role</label>
            <div class="flex items-center gap-6">
                <label class="inline-flex items-center">
                <input
                    type="radio"
                    class="form-radio text-blue-600"
                    value="Player"
                    v-model="form.role"
                />
                <span class="ml-2 text-sm text-gray-700">Player</span>
                </label>

                <label class="inline-flex items-center">
                <input
                    type="radio"
                    class="form-radio text-blue-600"
                    value="Guest"
                    v-model="form.role"
                />
                <span class="ml-2 text-sm text-gray-700">Guest</span>
                </label>
            </div>

            <p v-if="errors?.role" class="text-sm text-red-500 mt-1">
                {{ errors.role }}
            </p>
            </div>

        <BaseButton class=" text-wrap break-all overflow-hidden">Register</BaseButton>

    </form>
    </AuthLayout>
</template>