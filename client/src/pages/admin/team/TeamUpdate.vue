<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import DashboardLayout from '../../../layouts/DashboardLayout.vue'
import { getTeamById, updateTeam } from '../../../services/teamService.mjs'

const route = useRoute()
const router = useRouter()

const form = ref({
  firstName: '',
  lastName: '',
  contactNumber: '',
  email: '',
  country: '',
  name: '',
  teamStatus: 1,
  userStatus: '1',
  role: 'TeamOwner',
  teamId:'',
  userId: ''
})

const errors = ref({})
const successMessage = ref('')
const loading = ref(false)
const teamId = route.params.id

onMounted(async () => {
  try {
    const res = await getTeamById(teamId)
    if (res.data.success) {
      const data = res.data.data
      form.value = {
        firstName: data.owner_id.firstName || '',
        lastName: data.owner_id.lastName || '',
        contactNumber: data.owner_id.contactNumber || '',
        email: data.owner_id.email || '',
        country: data.owner_id.country || '',
        name: data.name || '',
        teamStatus: data.status,
        userStatus: data.owner_id.userStatus || '1',
        role: data.owner_id.role || 'TeamOwner',
        teamId: data._id,
        userId: data.owner_id._id
      }
    }
  } catch (err) {
    console.error('Failed to fetch team:', err)
  }
})

const handleUpdate = async () => {
  errors.value = {}
  successMessage.value = ''
  loading.value = true

  try {
    const payload = { ...form.value }
    const response = await updateTeam(payload)
    if(response.data.success === false) {
      errors.value = response.data.errors
    }else{
      router.push('/teams')
    }
    successMessage.value = 'Team successfully updated!'
  } catch (err) {
    if (err.response?.data?.errors) {
      errors.value = err.response.data.errors
    }
  } finally {
    loading.value = false
  }
}
</script>
<template>
  <DashboardLayout>
    <div class="w-full px-4 sm:px-6 lg:px-8 py-4 bg-gray-100 min-h-screen">
      <h1 class="text-2xl font-bold text-center text-gray-800 mb-6">Update Team</h1>

      <form
        @submit.prevent="handleUpdate"
        class="bg-white rounded-lg shadow p-6 max-w-3xl mx-auto grid gap-4 grid-cols-1 sm:grid-cols-2"
      >
        <!-- Same input fields (v-models already connected) -->
        <!-- First Name to Team Name and Status just like in create -->

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
        <!-- Repeat other fields like in your create form... -->

        <div class="sm:col-span-2 flex flex-col gap-1 sm:flex-row sm:justify-between">
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
            {{ loading ? 'Updating...' : 'Update Team' }}
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
