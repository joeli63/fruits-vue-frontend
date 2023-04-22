<template>
  <div class="rounded-lg p-5">
    <div class="mt-6">
      <table class="min-w-full text-left text-sm font-light">
        <thead class="border-b font-medium dark:border-neutral-500">
          <tr class="bg-white">
            <th scope="col" class="px-6 py-4">Name</th>
            <th scope="col" class="px-6 py-4">Family</th>
            <th scope="col" class="px-6 py-4">Order</th>
            <th scope="col" class="px-6 py-4">Genus</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="fruit in fruits" :key="fruit.id" class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
            <td :key="`${fruit.id}-name`" class="whitespace-nowrap px-6 py-4">{{ fruit.name }}</td>
            <td :key="`${fruit.id}-family`" class="whitespace-nowrap px-6 py-4">{{ fruit.family }}</td>
            <td :key="`${fruit.id}-order`" class="whitespace-nowrap px-6 py-4">{{ fruit.order }}</td>
            <td :key="`${fruit.id}-genus`" class="whitespace-nowrap px-6 py-4">{{ fruit.genus }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { IFruit } from "@/domain/fruits/Fruits.Models"

export default defineComponent({
  name: "FruitsTableView",
  props: {
    fruits: {
      type: Array as () => IFruit[],
      required: true,
    },
  },
})
</script>
