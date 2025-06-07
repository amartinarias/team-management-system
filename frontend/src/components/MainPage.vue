<!-- MainPage.vue -->
<script setup>
import { onMounted, ref } from "vue";
import StandardTable from "./StandardTable.vue";
import { useDataServer } from "../composables/useDataServer";

// Call the composables to get its state and methods
const { teamData, error, fetchTeams, isLoading, saveTeamName,
  saveMember} = useDataServer();

onMounted(() => {
  fetchTeams();
});
</script>

<template>
<v-container>
  <StandardTable :teamData="teamData" :error="error" :fetchTeams="fetchTeams" :isLoading="isLoading" :save-team-name="saveTeamName"
      :save-member="saveMember"/>
  </v-container>
</template>
