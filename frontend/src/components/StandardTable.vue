<template>
  <v-card class="elevation-2">
    <v-card-title>
      Desserts

      <v-spacer></v-spacer>
      <!-- This text field is bound to our 'search' ref -->
      <v-text-field
        v-model="search"
        density="compact"
        label="Search"
        prepend-inner-icon="mdi-magnify"
        variant="solo-filled"
        flat
        hide-details
        single-line
      ></v-text-field>
    </v-card-title>

    <v-data-table
      :headers="headers"
      :items="desserts"
      :search="search"
      :items-per-page="5"
    ></v-data-table>
  </v-card>
</template>

<script setup>
import { ref } from 'vue';

// A reactive ref to hold the value of the search input field.
const search = ref('');

// Headers define the structure of the table. The 'key' must match
// the property name in your data objects.
const headers = ref([
  { title: 'Dessert (100g serving)', align: 'start', key: 'name' },
  { title: 'Calories', align: 'end', key: 'calories' },
]);

// Your original data, now wrapped in a ref for reactivity.
const desserts = ref([
  { name: 'Frozen Yogurt', calories: 159 },
  { name: 'Ice cream sandwich', calories: 237 },
  { name: 'Eclair', calories: 262 },
  { name: 'Cupcake', calories: 305 },
  { name: 'Gingerbread', calories: 356 },
  { name: 'Jelly bean', calories: 375 },
  { name: 'Lollipop', calories: 392 },
  { name: 'Honeycomb', calories: 408 },
  { name: 'Donut', calories: 452 },
  { name: 'KitKat', calories: 518 },
]);
</script>

<style scoped>
/* Scoped styles only apply to this component */
.v-card-title {
  display: flex;
  align-items: center;
}
</style>
