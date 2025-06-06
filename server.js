// server.js
const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;
const TEAMS_DATA_URL = 'https://storage.aderize.com/Erik/Test-Works/teams.json';

// --- API Route to get all teams ---
// No Params Needed
// Thsi route gets all the teams from the fake API
app.get('/api/teams', async (req, res) => {
    try {
        const response = await axios.get(TEAMS_DATA_URL);
        const teamsData = response.data;

        if (teamsData && teamsData.length > 0) {
            res.status(200).json(teamsData);
        } else {
            res.status(404).json({ error: 'No teams data found.' });
        }
    } catch (error) {
        console.error('Error fetching teams data:', error.message);
        res.status(500).json({
            error: 'Server failed to fetch teams data.'
        });
    }
});
// --- Start the Server ---
app.listen(port, () => {
    console.log(`Listening...`);
});