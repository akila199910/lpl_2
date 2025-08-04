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
  status :0
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
            <label class="block text-sm font-medium text-gray-700">Role</label>
            <select v-model="form.role" class="input">
                <option value="Batsman">Batsman</option>
                <option value="Bowler">Bowler</option>
                <option value="AllRounder">All Rounder</option>
                <option value="Wicketkeeper">Wicket Keeper</option>
            </select>
        </div>

        <BaseButton class=" text-wrap break-all overflow-hidden">Login</BaseButton>

        <P class="font-medium">Already have an account? <span class="font-bold cursor-pointer" @click="router.push('/login')">Register</span></P>
    </form>
    </AuthLayout>
</template>