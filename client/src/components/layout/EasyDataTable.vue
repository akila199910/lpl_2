<script setup>
import EasyDataTable from 'vue3-easy-data-table'
import 'vue3-easy-data-table/dist/style.css'

// Accept props for data and columns
const props = defineProps({
  data: {
    type: Array,
    required: true,
     default: () => [] 
  },
  headers: {
    type: Array,
    required: true,
     default: () => [] 
  }
});

const emit = defineEmits(['view', 'edit', 'delete']);

</script>

<template>
<div class="w-full">
    <EasyDataTable
      :headers="headers"
      :items="data"
      
        buttons-pagination
        table-class-name="customize-table"
        :rows-per-page="10"
        :rows-items	="[10, 25, 50, 100]"
        border-cell
    >
    <!-- Custom slot for Actions column -->
      <template #item-actions="{ items, id }">
        <div class="flex items-center gap-2 justify-center">
          <button @click="$emit('view', id)" title="View">
            <Icon icon="mdi:eye" class="w-5 h-5 text-blue-500 hover:text-blue-700" />
          </button>
          <button @click="$emit('edit', id)" title="Edit">
            <Icon icon="mdi:pencil" class="w-5 h-5 text-green-500 hover:text-green-700" />
          </button>
          <button @click="$emit('delete', id)" title="Delete">
            <Icon icon="mdi:delete" class="w-5 h-5 text-red-500 hover:text-red-700" />
          </button>
        </div>
      </template>
    </EasyDataTable>
  </div>
</template>

<style scoped>

.customize-table {
  --easy-table-border: 1px solid #e5e7eb;
  --easy-table-row-border: 1px solid #e5e7eb;

  --easy-table-header-font-size: 14px;
  --easy-table-header-height: 48px;
  --easy-table-header-font-color: #111827;
  --easy-table-header-background-color: #f3f4f6;

  --easy-table-header-item-padding: 12px 16px;

  --easy-table-body-even-row-background-color: #ffffff;
  --easy-table-body-row-background-color: #f9fafb;
  --easy-table-body-row-font-color: #111827;
  /* --easy-table-body-row-height: 48px; */
  --easy-table-body-row-font-size: 14px;
  --easy-table-body-row-height: auto;


  --easy-table-body-row-hover-background-color: #e5e7eb;

  --easy-table-body-item-padding: 12px 16px;

  --easy-table-footer-background-color: #f3f4f6;
  --easy-table-footer-font-color: #374151;
  --easy-table-footer-font-size: 14px;
  --easy-table-footer-height: 48px;

  --easy-table-scrollbar-thumb-color: #d1d5db;
  --easy-table-scrollbar-track-color: #f3f4f6;
}
</style>
