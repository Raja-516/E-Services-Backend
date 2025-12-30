🏥 Hospital Management System — Backend

This repository contains the backend service for the Hospital Management System, built using Node.js, Express.js, and MongoDB (Mongoose).
It provides secure and scalable REST APIs to manage organizations, doctors, patients, and appointments, along with JWT-based authentication and authorization.

🚀 Key Functionalities
| Feature                               | Description                                                     |
| ------------------------------------- | --------------------------------------------------------------- |
| 🏢 **Organization Management**        | Organizations can sign up, log in, and manage doctors           |
| 👨‍⚕️ **Doctor Management**           | Add, fetch, and manage doctors under organizations              |
| 🧑‍🤝‍🧑 **Patient Management**       | Patients can register, log in, and view organizations & doctors |
| 📅 **Appointment System**             | Patients can book and view appointments with doctors            |
| 🔐 **Authentication & Authorization** | Secure JWT-based authentication for all users                   |
| 🧾 **API Security**                   | Middleware protects routes and restricts unauthorized access    |
| 📊 **Scalable Architecture**          | Clean separation of routes, controllers, and models             |


🧠 Overview
The backend exposes secure RESTful APIs for:
 Patient, Doctor, and Organization authentication
 Organization creation and doctor assignment
 Appointment booking and retrieval
 Role-based access control using JWT
 Safe communication with frontend applications via protected endpoints


🦸 Core Features Implemented :
  ✅ Token-based login for patients, doctors, and organizations
  ✅ Role-based actions
    Only organizations can add doctors
    Only patients can book appointments
  ✅ Protected routes using authentication middleware
  ✅ Well-structured MongoDB schemas with Mongoose references
  ✅ Automatic timestamps (createdAt, updatedAt)
  ✅ Easily extendable architecture for future features


🧱 Project Folder Structure
backend/
│
├── 📂 config/
│   └── db.js                     # MongoDB connection setup
│
├── 📂 controllers/
│   ├── authController.js         # Patient signup/login logic
│   ├── organizationController.js # Organization & doctor management
│   ├── doctorController.js       # Doctor-related operations
│   └── appointmentController.js  # Appointment booking & retrieval
│
├── 📂 middleware/
│   └── authMiddleware.js         # JWT verification for protected routes
│
├── 📂 models/
│   ├── Organization.js           # Organization schema (doctor references)
│   ├── Doctor.js                 # Doctor schema
│   ├── Patient.js                # Patient schema
│   └── Appointment.js            # Appointment schema
│
├── 📂 routes/
│   ├── authRoutes.js             # Patient auth routes
│   ├── organizationRoutes.js     # Organization & doctor routes
│   ├── doctorRoutes.js           # Doctor-specific routes
│   └── appointmentRoutes.js      # Appointment routes
│
├── .env                          # Environment variables
├── server.js                     # Express app entry point
├── package.json
└── README.md


 🧠 API Routes Summary
| Method | Endpoint                           | Description                 | Auth Required |
| ------ | ---------------------------------- | --------------------------- | ------------- |
| POST   | `/api/auth/signup`                 | Register new patient        | ❌             |
| POST   | `/api/auth/login`                  | Patient login               | ❌             |
| POST   | `/api/organization/signup`         | Register organization       | ❌             |
| POST   | `/api/organization/login`          | Organization login          | ❌             |
| GET    | `/api/organization`                | Fetch all organizations     | ✅             |
| GET    | `/api/organization/:orgId/doctors` | Get doctors by organization | ✅             |
| POST   | `/api/organization/doctors`        | Add doctor to organization  | ✅             |
| POST   | `/api/appointments`                | Book an appointment         | ✅             |
| GET    | `/api/appointments`                | Get all appointments        | ✅             |


📦 Dependencies
| Package      | Purpose                          |
| ------------ | -------------------------------- |
| express      | Backend routing framework        |
| mongoose     | MongoDB ODM                      |
| jsonwebtoken | JWT authentication               |
| bcryptjs     | Password hashing                 |
| dotenv       | Environment variable management  |
| cors         | Cross-origin resource sharing    |
| nodemon      | Hot reloading (development only) |



💡 Future Enhancements
 Role-based dashboards (Admin / Doctor / Patient)
 Appointment approval & rejection workflow 
 Doctor availability scheduling
 Email / SMS notifications
 Payment gateway integration
 Medical document uploads
 Real-time chat between doctors and patients
 Reports & analytics


✨ Author
Raja Akula
Full Stack Developer | Backend Developer | Hospital Management System
