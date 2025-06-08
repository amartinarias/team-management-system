
<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  team: { type: Object, required: true },
});

const emit = defineEmits(['close', 'saveTeam', 'saveMember']);

const editableTeam = ref(null);

watch(() => props.team, (newTeam) => {
  if (newTeam) {
    editableTeam.value = JSON.parse(JSON.stringify(newTeam));
  }
}, { immediate: true, deep: true });


// --- Member Table Headers ---
const memberHeaders = ref([
    { title: 'Name', key: 'name' },
    { title: 'Role', key: 'role' },
    { title: 'Email', key: 'email' },
    { title: 'Actions', key: 'actions', sortable: false },
]);
</script>

<!-- Members Dialog -->
<template>
  <v-card v-if="editableTeam" class="pa-4">
    <v-card-title class="d-flex align-center">
      <span class="text-h6">Edit Team</span>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="editableTeam.name"
        label="Team Name"
        density="compact"
        hide-details
        class="mr-4"
        style="max-width: 300px;"
      ></v-text-field>
      <v-btn color="primary" @click="emit('saveTeam', editableTeam)" elevation="0">Save Name</v-btn>
    </v-card-title>
    
    <v-divider></v-divider>
    
    <v-card-text>
      <h3 class="mb-2">Members</h3>
      <v-data-table
      hide-default-footer
        :headers="memberHeaders"
        :items="editableTeam.members"
        density="compact"
      >
        <template v-slot:item.name="{ item }">
          <v-text-field v-model="item.name" density="compact" hide-details ></v-text-field>
        </template>
        <template v-slot:item.role="{ item }">
          <v-text-field v-model="item.role" density="compact" hide-details ></v-text-field>
        </template>
        <template v-slot:item.email="{ item }">
          <v-text-field v-model="item.email" density="compact" hide-details ></v-text-field>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-btn icon="mdi-content-save" variant="text" color="primary" @click="emit('saveMember', item)"></v-btn>
        </template>
      </v-data-table>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue-darken-1" variant="text" @click="emit('close')">Close</v-btn>
    </v-card-actions>
  </v-card>
</template>
