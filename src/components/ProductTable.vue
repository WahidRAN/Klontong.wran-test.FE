<template>
  <table class="min-w-full bg-white border border-gray-200">
    <thead>
      <tr class="w-full bg-gray-100 border-b border-gray-200">
        <th class="px-4 py-2 text-left">ID</th>
        <th class="px-4 py-2 text-left">Category ID</th>
        <th class="px-4 py-2 text-left">Category Name</th>
        <th class="px-4 py-2 text-left">SKU</th>
        <th class="px-4 py-2 text-left">Name</th>
        <th class="px-4 py-2 text-left">Deskripsi</th>
        <th class="px-4 py-2 text-left">Harga</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in props.data" :key="item.id" class="border-b border-gray-200">
        <td class="px-4 py-2">{{ item.id }}</td>
        <td class="px-4 py-2">{{ item.category_id }}</td>
        <td class="px-4 py-2">{{ item.category_name }}</td>
        <td class="px-4 py-2">{{ item.sku }}</td>
        <td class="px-4 py-2">{{ item.name }}</td>
        <td class="px-4 py-2">{{ item.description }}</td>
        <td class="px-4 py-2">{{ item.harga }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
const props = defineProps<{
  data: any
}>()
</script>
