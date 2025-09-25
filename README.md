 React To-Do List App

A simple To-Do List Application built with React and Material-UI (MUI) .  
It provides an intuitive interface to add, edit, delete, and manage tasks with interactive notifications.

---

 Features
 
- Add new tasks with title and description.
- Mark tasks as completed/uncompleted with visual feedback (strikethrough for completed tasks).
- Edit existing tasks using a clean Material-UI dialog.
- Delete tasks with a confirmation dialog.
- Snackbar notifications for actions (add, edit, delete, status update).
- LocalStorage persistence so tasks remain after page reload.
- Modern design using Material-UI with Floating Action Buttons (FABs) and custom colors.

---


Getting Started


1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Open the app in your browser:
   ```
   http://localhost:3000
   ```

---

 Project Structure
```
src/
│── App.js                # Main component with context providers
│── MainPage.js           # UI for displaying, adding, editing, and deleting tasks
│── task.js               # Single task component with action buttons
│── Snackbar.js           # Snackbar notifications component
│── SnakBarContext.js     # Snackbar context
│── TaskContext.js        # Task context
│── App.css               # Custom styles
public/
│── index.html
package.json
```


---

License
This project is open-source and free to use or modify.
