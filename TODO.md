# MERN Stack Web Form Implementation TODO

- [x] Create backend/package.json with dependencies (express, mongoose, cors, dotenv)
- [x] Create backend/server.js to set up Express server and connect to MongoDB Atlas
- [x] Create backend/models/formData.js for Mongoose schema (name, email, message)
- [x] Create backend/routes/form.js for POST route to save form data
- [x] Edit frontend/package.json to remove axios and use fetch instead
- [x] Edit frontend/src/App.js to replace default content with a form (name, email, message) and submit handler using fetch
- [x] Edit frontend/src/App.css to style the form, add mobile responsiveness, and water bubble background
- [x] Install backend dependencies (npm install in backend/)
- [ ] Install frontend dependencies (npm install in frontend/)
- [ ] Start backend server (node server.js in backend/)
- [ ] Start frontend (npm start in frontend/)
- [ ] Test the form by submitting data and verifying in MongoDB Atlas

# New Task: Add Next Button to Portfolio and Form Page

- [x] Update backend/models/formData.js: Add address (String), dob (Date), age (Number), aadharcard (String) fields
- [x] Update backend/routes/form.js: Accept new fields (address, dob, age, aadharcard) in POST body
- [x] Install react-router-dom in frontend (npm install react-router-dom)
- [x] Create frontend/src/FormPage.js: Form component with inputs for name, email, address, dob, age; file input for aadharcard (convert to base64); submit to /api/form
- [x] Update frontend/src/App.js: Add BrowserRouter, Routes, Route; add /form route to FormPage; update Dashboard render to use Link or navigate
- [x] Update frontend/src/Dashboard.js: Add "Next" button in footer to navigate to /form
- [x] Update frontend/src/Dashboard.css: Add styles for next-btn
- [ ] Install frontend dependencies (npm install in frontend/)
- [ ] Start backend server (node server.js in backend/)
- [ ] Start frontend (npm start in frontend/)
- [ ] Test the Next button navigation and form submission, verify data in MongoDB Atlas
