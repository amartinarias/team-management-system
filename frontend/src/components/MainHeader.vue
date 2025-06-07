
<script setup>
import { ref } from 'vue';

const drawer = ref(false);

const items = ref([
  {
    title: 'Dashboard',
    value: 'dashboard',
    props: { prependIcon: 'mdi-view-dashboard' }
  },
  {
    title: 'Teams',
    value: 'teams',
    props: { prependIcon: 'mdi-account-group' }
  },
  {
    title: 'About',
    value: 'about',
    props: { prependIcon: 'mdi-information' }
  },
]);
</script>

<template>
  <v-app-bar app color="primary" elevation="0">
    <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

    <v-toolbar-title><strong>Team Management Dashboard</strong></v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn icon>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>mdi-dots-vertical</v-icon>
    </v-btn>
  </v-app-bar>

  <v-navigation-drawer
    v-model="drawer"
    
  >
    <v-list
      :items="items"
    ></v-list>
  </v-navigation-drawer>
</template>
