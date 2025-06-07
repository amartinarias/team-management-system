# Team Management Dashboard
A Vue 3 + Vuetify SPA with a Node.js mock API for managing teams.

**Tech Stack:** Vue 3, Vuetify 3, Vite, Node.js, Express, Axios.

---

## Setup

> **Note:** Run backend and frontend in two separate terminals.

**1. Backend (Project Root)**
```bash
# Install dependencies
npm install express cors axios
# Start server
node server.js
# Runs at http://localhost:3000
```

**2. Frontend (`/frontend` directory)**
```bash
# Install dependencies
npm install
# Start dev server
npm run dev
# Runs at http://localhost:5173
```


---

## Future Improvements

Given more time, here are several areas where the application could be significantly enhanced:

### Core Functionality

* **Create and Delete Operations:**
    * **UI:** Add "Create Team" and "Add Member" buttons that open dedicated forms or dialogs.
    * **API:** Implement `POST` endpoints on the backend to handle the creation of new teams and members, and `DELETE` endpoints to handle their removal.

### UI/UX Enhancements

* **Snackbar Notifications:** Replace the native `alert()` popups with a more integrated notification system.
* **Inline Form Validation:** Add real-time validation to the edit fields. For example, prevent saving if a team name is empty or if a member's email address is not in a valid format.
* **Button Loading States:** Provide more feedback by adding loading indicators directly onto the "Save" buttons. 
* **Empty States:** Improve the UI for when no teams exist, displaying a helpful message and a "Create New Team" button instead of an empty table.

### Architecture and Code Quality

* **State Management with Pinia:** Introduce a global state management library like **Pinia** to create a centralised store. This simplifies component communication and makes the state easier to manage and debug.
* **API Error Handling:** Develop a more sophisticated error handling strategy. Instead of generic alerts, the UI could show specific error messages from the API and guide the user on how to resolve them.

### Testing

* **Unit & Component Testing:** Write more and more thorough unit and component tests to ensure the application's functionality is correct.
* **End-to-End (E2E) Testing:** Implement E2E tests with a tool like **Cypress** or **Playwright**.

