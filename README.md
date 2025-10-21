🩺 Hospital Management System — Backend

This is the backend of the Hospital Management System built using Node.js, Express.js, and MongoDB (Mongoose).
It powers the entire application by handling authentication, organization and doctor management, and patient appointment scheduling.

🚀 Key Functionalities : Functionality	Description
🏢 Organization Management	Organizations can sign up, log in, and manage their doctors.
👨‍⚕️ Doctor Management	Add, fetch, and manage doctors linked to organizations.
🧑‍🤝‍🧑 Patient Management	Patients can register, log in, and view available organizations and doctors.
📅 Appointments System	Patients can book appointments with selected doctors and view their scheduled bookings.
🔐 Authentication & Authorization	JWT-based secure authentication for all users.
🧾 API Security	Uses middleware to validate tokens and restrict unauthorized access.
📊 Scalable Architecture	Clear separation of routes, controllers, and models for easy expansion.
🧩 Features Summary

🧠 Overview
-> The backend provides secure REST APIs for:

-> Patient, Doctor, and Organization authentication

-> Managing organizations and assigning doctors

-> Booking and fetching appointments

-> Token-based authorization (JWT)

-> Communication with the frontend via protected API endpoints

🦸 TASKS :
✅ Token-based login for patients, doctors, and organizations

✅ Role-based actions (only orgs can add doctors, only patients can book)

✅ Protected routes using middleware

✅ Organized MongoDB models and schemas

✅ Built-in timestamps and relationships using Mongoose refs

✅ Easily extendable (reports, chat, payments can be added later)

🧱 Folder Structure
backend/
│
├── 📂 config/
│   └── db.js                     # MongoDB connection setup
│
├── 📂 controllers/
│   ├── authController.js         # Handles signup/login for patients
│   ├── organizationController.js # Organization actions (create org, add doctor)
│   ├── appointmentController.js  # Appointment booking and retrieval
│   └── doctorController.js       # Doctor-related logic
│
├── 📂 middleware/
│   └── authMiddleware.js         # Verifies JWT tokens for protected routes
│
├── 📂 models/
│   ├── Organization.js           # Schema for organizations (with doctor references)
│   ├── Doctor.js                 # Schema for doctors
│   ├── Patient.js                # Schema for patients
│   └── Appointment.js            # Schema for appointments
│
├── 📂 routes/
│   ├── authRoutes.js             # Routes for patient signup/login
│   ├── organizationRoutes.js     # Routes for organization & doctor management
│   ├── appointmentRoutes.js      # Routes for appointment handling
│   └── doctorRoutes.js           # Routes for doctor-specific endpoints
│
├── .env                          # Environment variables
├── server.js                     # Main entry point — initializes Express app
├── package.json
└── README.md

 🧠 API Routes Summary
Method	Endpoint	              Description Auth Required
POST	 /api/auth/signup   	    Register a new patient	❌
POST	 /api/auth/login	        Login patient	❌
POST	 /api/organization/signup	Register new organization	❌
POST	 /api/organization/login	Login organization	❌
GET	   /api/organization	      Get all organizations	✅
GET    /api/organization/:orgId/doctors	Get doctors of specific org	✅
POST   /api/organization/doctors	Add new doctor to org	✅
POST	 /api/appointments	      Book appointment	✅
GET	   /api/appointments	      Get all appointments	✅

📦 Dependencies
Package	Use
express	Routing framework
mongoose	MongoDB ORM
jsonwebtoken	Auth token handling
bcryptjs	Password hashing
dotenv	Env variables
cors	Cross-origin access
nodemon	Hot reloading (dev only)


💡 Future Enhancements

Role-based dashboards (Admin/Doctor/Patient)

Appointment approval/rejection system

Email or SMS notifications

Doctor availability scheduling

Payment gateway integration

Upload medical documents

Chat between doctor & patient


✨ Author

Raja Akula
Full Stack Developer | Backend Developer | Hospital Management System
