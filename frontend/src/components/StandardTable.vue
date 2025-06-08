<!-- Standard Table -->
<script setup>
import { onMounted, ref } from 'vue';
import MembersDialog from './MembersDialog.vue';
import { defineProps } from 'vue';

const props = defineProps({
  teamData: {
    type: Array,
    required: true,
  },
  isLoading: {
    type: Boolean,
    required: true,
  },
  error: {
    type: String,
    default: null,
  },
  fetchTeams: {
    type: Function,
    required: true,
  },
  saveMember: {
    type: Function,
    required: true,
  },
  saveTeamName: {
    type: Function,
    required: true,
  },
});

const search = ref('');

const headers = ref([
  { title: 'Id', align: 'start', key: 'id' },
  { title: 'Team Name', align: 'start', key: 'name' },
  { title: 'Members', key: 'members' },
  { title: 'Founded', key: 'createdAt' },
]);

const getMemberChipColor = (count) => {
  if (count > 5) return 'green';
  if (count > 2) return 'orange';
  return 'red';
};

// --- Dialog State ---
const dialog = ref(false); 
const selectedTeam = ref(null); 
const editableTeam = ref(null);

// --- Dialog Functions ---
const openTeamDialog = (team) => {

  selectedTeam.value = team;
  editableTeam.value = JSON.parse(JSON.stringify(team));
  // Open the dialog
  dialog.value = true;
};

const closeDialog = () => {
  dialog.value = false;
  selectedTeam.value = null;
  editableTeam.value = null;
};

const handleSaveTeamName = async (teamToSave) => {
  try {
    await props.saveTeamName(teamToSave);
    await props.fetchTeams();
    alert('Team name saved!');
  } catch (error) {
    console.error('Failed to save team name:', error);
    alert('Error: Could not save team name.');
  }
};

const handleSaveMember = async (memberToSave) => {
  if (!selectedTeam.value) return;
  try {
    // Call the save function from props, providing the necessary teamId
    console.log('Saving member:', memberToSave);
    console.log('Selected team:', selectedTeam.value);
    await props.saveMember(selectedTeam.value.id, memberToSave);
    await props.fetchTeams();
    alert('Member saved!');
  } catch (error) {
    console.error('Failed to save member:', error);
    alert('Error: Could not save member.');
  }
};

</script>

<template>
  <v-card class="elevation-2">
    <v-card-title>
      Teams

      <v-spacer></v-spacer>
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

    <v-alert v-if="error" type="error" title="Failed to Load Data" :text="error" class="ma-3" border>
      <v-btn color="error" variant="outlined" class="mt-4" @click="fetchTeams">Try Again</v-btn>
    </v-alert>

    <v-data-table
      :headers="headers"
      :items="teamData"
      :loading="isLoading"
      :error-message="error"
      :search="search"
      item-key="id"
      class="clickable-rows"
      @click:row="(_, { item }) => openTeamDialog(item)"
      :items-per-page="5"
    >
      <template v-slot:item.createdAt="{ item }">
        <span>{{ new Date(item.createdAt).toLocaleDateString('en-GB') }}</span>
      </template>

      <template v-slot:item.members="{ item }">
        <v-chip :color="getMemberChipColor(item.members.length)">
          {{ item.members.length }}
        </v-chip>
      </template>
</v-data-table>
  </v-card>

  <!-- 
    The dialog hosts the MembersDialog component
  -->
  <v-dialog v-model="dialog" persistent max-width="800px">
    <MembersDialog
      v-if="editableTeam"
      :team="editableTeam"
      @close="closeDialog"
      @save-team="handleSaveTeamName"
      @save-member="handleSaveMember"
    />
  </v-dialog>
</template>


<style scoped>
.v-card-title {
  display: flex;
  align-items: center;
}

.clickable-rows .v-data-table__tr {
  cursor: pointer;
}
</style>
