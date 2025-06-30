<script setup>
import { ref } from 'vue'
import DashboardLayout from '../../../layouts/DashboardLayout.vue'
import { createTeam } from '../../../services/teamService.mjs'

const form = ref({
  firstName: '',
  lastName: '',
  contactNumber: '',
  email: '',
  country: '',
  name: '',
  teamStatus: 1,
  userStatus: '1',
  role: 'TeamOwner'
})

const errors = ref({})
const successMessage = ref('')
const loading = ref(false)

const handleSubmit = async () => {
  errors.value = {}
  successMessage.value = ''
  loading.value = true

  try {
    await createTeam(form.value)
    successMessage.value = 'Team successfully created!'
    // reset form
    form.value = {
      firstName: '',
      lastName: '',
      contactNumber: '',
      email: '',
      password: '',
      confirmPassword: '',
      country: '',
      name: '',
      teamStatus: 1,
      userStatus: '1',
      role: 'TeamOwner'
    }
  } catch (err) {
    if (err.response?.data?.errors) {
      errors.value = err.response.data.errors
      console.log(err.response.data.success)
    }
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <DashboardLayout>
    <div class="w-full px-4 sm:px-6 lg:px-8 py-4 bg-gray-100 min-h-screen">
      <h1 class="text-2xl font-bold text-center text-gray-800 mb-6">Create New Team</h1>

      <form
        @submit.prevent="handleSubmit"
        class="bg-white rounded-lg shadow p-6 max-w-3xl mx-auto grid gap-4 grid-cols-1 sm:grid-cols-2"
      >
        <div>
          <label class="block text-sm font-medium text-gray-700">First Name</label>
          <input v-model="form.firstName" type="text" class="input" />
          <p v-if="errors.firstName" class="text-red-500 text-sm">{{ errors.firstName }}</p>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Last Name</label>
          <input v-model="form.lastName" type="text" class="input" />
          <p v-if="errors.lastName" class="text-red-500 text-sm">{{ errors.lastName }}</p>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Email</label>
          <input v-model="form.email" type="email" class="input" />
          <p v-if="errors.email" class="text-red-500 text-sm">{{ errors.email }}</p>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Contact Number</label>
          <input v-model="form.contactNumber" type="text" class="input" />
          <p v-if="errors.contactNumber" class="text-red-500 text-sm">{{ errors.contactNumber }}</p>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Country</label>
          <input v-model="form.country" type="text" class="input" />
          <p v-if="errors.country" class="text-red-500 text-sm">{{ errors.country }}</p>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Team Name</label>
          <input v-model="form.name" type="text" class="input" />
          <p v-if="errors.name" class="text-red-500 text-sm">{{ errors.name }}</p>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Team Status</label>
          <select v-model="form.teamStatus" class="input">
            <option :value="1">Active</option>
            <option :value="0">Inactive</option>
          </select>
        </div>

        <div class="sm:col-span-2 flex flex-col gap-1 sm:flex-row sm:justify-between ">

          <RouterLink to="/teams">
          <button
            type="button"
            class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Back
          </button>
          </RouterLink>

          <button
            type="submit"
            class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            :disabled="loading"
          >
            {{ loading ? 'Saving...' : 'Create Team' }}
          </button>
          <p v-if="successMessage" class="text-green-500 text-sm mt-2">{{ successMessage }}</p>
        </div>
      </form>
    </div>
  </DashboardLayout>
</template>

<style scoped>
.input {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  margin-top: 0.25rem;
  font-size: 0.875rem;
}
</style>
