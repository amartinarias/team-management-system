// useDataServer.js
import { ref,toRaw } from 'vue';
import axios from 'axios';


export function useDataServer() {
    const teamData = ref([]); 
    const error = ref(null);
    const isLoading = ref(false);

// Read all the teams data
    const fetchTeams = async () => {
        isLoading.value = true;
        error.value = null;

        const apiUrl = `http://localhost:3000/api/teams`;

        try {
            const response = await axios.get(apiUrl);
            teamData.value = response.data;
        } catch (err) {
            console.error('Error fetching teams data:', err);
            error.value = err.response?.data?.error || err.message || 'An error occurred while fetching data.';
        } finally {
            isLoading.value = false;
        }
    };

  /**
   * Saves changes to a team's name.
   * @param {object} teamToSave - The full team object with the updated name.
   * @returns {Promise} The axios promise for the PATCH request.
   */
   const saveTeamName = (teamToSave) => {
    if (!teamToSave) return Promise.reject(new Error('No team provided to save.'));
    
    // --- FAKE API CALL ---
    const payload = toRaw(teamToSave);
    const apiUrl = `http://localhost:3000/api/teams/${payload.id}`;
    
    console.log(`[FAKE SAVE] Faking PATCH request to ${apiUrl}`);
    console.log('[FAKE SAVE] Payload:', { name: payload.name });
    
    return Promise.resolve();
  };

  /**
   * Saves changes to a specific team member.
   * @param {number} teamId - The ID of the team the member belongs to.
   * @param {object} memberToSave - The full member object with updated details.
   * @returns {Promise} The axios promise for the PATCH request.
   */
  const saveMember = async(teamId, memberToSave) => {
    if (!teamId || !memberToSave) return Promise.reject(new Error('Team ID and member data are required.'));
    const payload = toRaw(memberToSave);
    console.log("payload", payload)

    const apiUrl = `http://localhost:3000/api/teams/${teamId}/members/${payload.id}`;

    console.log(`[FAKE SAVE] Faking PATCH request to ${apiUrl}`);
    console.log('[FAKE SAVE] Payload:', payload);
    
    return Promise.resolve();
  };

    return {
        teamData,
        error,
        isLoading,
        fetchTeams,
        saveMember,
        saveTeamName,
    };
}