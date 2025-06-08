// server.js
const express = require('express');
const axios = require('axios'); // Mocking axios (not really needed)
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
let teamsData = [
  { "id": 1, "name": "Frontend Team", "createdAt": "2022-05-01", "members": [ { "id": 1, "name": "Alice Smith", "role": "Engineer", "email": "alice@example.com" }, { "id": 2, "name": "Bob Johnson", "role": "Engineer", "email": "bob@example.com" } ] },
  { "id": 2, "name": "Backend Team", "createdAt": "2022-06-15", "members": [ { "id": 3, "name": "Charlie Brown", "role": "Engineer", "email": "charlie@example.com" }, { "id": 4, "name": "Diana Prince", "role": "Tech Lead", "email": "diana@example.com" } ] },
  { "id": 3, "name": "Design Team", "createdAt": "2023-01-20", "members": [ { "id": 5, "name": "Eva Green", "role": "Designer", "email": "eva@example.com" }, { "id": 6, "name": "Frank Ocean", "role": "UX Researcher", "email": "frank@example.com" } ] },
  { "id": 4, "name": "Marketing Team", "createdAt": "2023-03-10", "members": [ { "id": 7, "name": "Grace Lee", "role": "SEO Specialist", "email": "grace@example.com" }, { "id": 8, "name": "Henry Ford", "role": "Content Strategist", "email": "henry@example.com" } ] },
  { "id": 5, "name": "Sales Team", "createdAt": "2022-08-05", "members": [ { "id": 9, "name": "Irene Adler", "role": "Sales Manager", "email": "irene@example.com" }, { "id": 10, "name": "Jack Reacher", "role": "Account Exec", "email": "jack@example.com" } ] },
  { "id": 6, "name": "DevOps Team", "createdAt": "2022-11-22", "members": [ { "id": 11, "name": "Karen Page", "role": "DevOps Engineer", "email": "karen@example.com" }, { "id": 12, "name": "Leo Messi", "role": "Site Reliability Engineer", "email": "leo@example.com" } ] },
  { "id": 7, "name": "Product Team", "createdAt": "2023-02-12", "members": [ { "id": 13, "name": "Mia Wallace", "role": "Product Manager", "email": "mia@example.com" }, { "id": 14, "name": "Ned Stark", "role": "Product Owner", "email": "ned@example.com" } ] },
  { "id": 8, "name": "QA Team", "createdAt": "2023-04-01", "members": [ { "id": 15, "name": "Olivia Wilde", "role": "QA Engineer", "email": "olivia@example.com" }, { "id": 16, "name": "Paul Rudd", "role": "Automation Engineer", "email": "paul@example.com" } ] },
  { "id": 9, "name": "Support Team", "createdAt": "2022-07-30", "members": [ { "id": 17, "name": "Quinn Mallory", "role": "Support Lead", "email": "quinn@example.com" }, { "id": 18, "name": "Rachel Green", "role": "Support Rep", "email": "rachel@example.com" } ] },
  { "id": 10, "name": "Data Team", "createdAt": "2023-03-25", "members": [ { "id": 19, "name": "Steve Rogers", "role": "Data Analyst", "email": "steve@example.com" }, { "id": 20, "name": "Tina Fey", "role": "Data Scientist", "email": "tina@example.com" } ] }
];

// --- API Routes ---

// GET- Retrieve all teams
app.get('/api/teams', (req, res) => {
    // Add a small delay to simulate a real network request
    setTimeout(() => {
        res.status(200).json(teamsData);
    }, 500);
});

// PATCH - Update a team's name
app.patch('/api/teams/:id', (req, res) => {
    const teamId = parseInt(req.params.id);
    const { name } = req.body;

     if (!name) {
        return res.status(400).json({ error: 'Team name is required' });
    }

    const teamIndex = teamsData.findIndex(t => t.id === teamId);

    if (teamIndex === -1) {
        return res.status(404).json({ error: 'Team not found' });
    }

    teamsData[teamIndex].name = name;
    res.status(200).json(teamsData[teamIndex]);
});

// PATCH Update a team member's info
app.patch('/api/teams/:teamId/members/:memberToSave', (req, res) => {
    try {
        const teamId = req.params.teamId;
<<<<<<< Updated upstream
        const memberToSave = req.params.memberToSave;
        
        // console.log(`[DEBUG] Parsing IDs: teamId=${teamId}, memberId=${memberId}`);
        // console.log(`[DEBUG] Received request body:`, req.body);
        console.log("req.body", memberToSave)
        console.log("req.body", req.body)
        
        // --- ROBUSTNESS FIX ---
        // Check if req.body exists. If not, the JSON middleware likely didn't run.
=======
        const memberId = req.params.memberToSave;

>>>>>>> Stashed changes
        if (!req.body) {
            return res.status(400).json({ error: 'Request body is missing or not in JSON format.' });
        }
        const { name, role, email } = req.body;

        const team = teamsData.find(t => t.id === teamId);
        if (!team) {
            return res.status(404).json({ error: 'Team not found' });
        }

        if (!team.members || !Array.isArray(team.members)) {
            console.error(`[ERROR] Team ${teamId} does not have a valid 'members' array.`);
            return res.status(500).json({ error: 'Server error: Team members data is corrupted.' });
        }

        const memberIndex = team.members.findIndex(m => m.id === memberId);
        if (memberIndex === -1) {
            console.error(`[ERROR] Member with ID ${memberId} not found in team "${team.name}".`);
            return res.status(404).json({ error: 'Member not found' });
        }

        // Update member details
        if (name !== undefined) team.members[memberIndex].name = name;
        if (role !== undefined) team.members[memberIndex].role = role;
        if (email !== undefined) team.members[memberIndex].email = email;
        
        res.status(200).json(team.members[memberIndex]);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An unexpected error occurred on the server.' });
    }
});

// --- Start the Server ---
app.listen(port, () => {
    console.log(`Listening...`);
});