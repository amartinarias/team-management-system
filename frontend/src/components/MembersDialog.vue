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
      <!-- This button now emits an event to the parent to trigger the save -->
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
        <!-- This button emits an event with the specific member object to save -->
        <template v-slot:item.actions="{ item }">
          <v-btn icon="mdi-content-save" variant="text" color="primary" @click="emit('saveMember', item)"></v-btn>
        </template>
      </v-data-table>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <!-- Emits the 'close' event -->
      <v-btn color="blue-darken-1" variant="text" @click="emit('close')">Close</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { ref, watch } from 'vue';

// --- Props & Emits ---
// 1. This component receives the selected team object as a prop from its parent.
const props = defineProps({
  team: { type: Object, required: true },
});

// 2. It declares the custom events it can send back up to the parent.
const emit = defineEmits(['close', 'saveTeam', 'saveMember']);

// --- Local State ---
// 3. It creates its own LOCAL reactive variable. This is the key to fixing the error.
const editableTeam = ref(null);

// 4. A 'watcher' keeps the local state in sync with the prop.
//    When the 'team' prop is received, this code runs and creates a deep copy
//    of the data, which can then be safely edited.
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