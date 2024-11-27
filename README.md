# Jobify - Existing Project with RBAC Implementation in a CMS Dashboard


Welcome to **Jobify**, a robust project where users can manage jobs, search for their added jobs, and update their profiles effectively. This Project CMS dashboard also includes a powerful Role-Based Access Control (RBAC) system for managing users, roles, and permissions, fulfilling all the requirements specified by the company.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Key Features](#key-features)
- [Setup Instructions](#setup-instructions)
- [Usage Guide](#usage-guide)
  - [User Management](#user-management)
  - [Role Management](#role-management)
  - [Permissions Management](#permissions-management)
  - [Job Management](#job-management)
- [Demo and Deployment](#demo-and-deployment)
- [Technical Details](#technical-details)
- [API Endpoints](#api-endpoints)
- [Future Improvements](#future-improvements)
- [Contact Information](#contact-information)

---

## Project Overview

The **Jobify CMS Dashboard** is a comprehensive solution for managing:
1. Users and their statuses.
2. Roles and associated permissions.
3. Dynamic permission updates.

### Why Jobify?
This project is designed with scalability, security, and ease of use in mind. It enables administrators to efficiently manage users, roles, and permissions through a robust Role-Based Access Control (RBAC) system.

Unlike mock API simulations, Jobify incorporates a fully functional backend built with Node.js and Express.js to handle CRUD operations for users, roles, and permissions. This ensures data persistence, real-world applicability, and seamless front and backend integration.

---

## Key Features

1. **User Management**
   - View, add, edit, and delete users.
   - Assign roles and manage user statuses (Active/Inactive).

2. **Role Management**
   - Create, edit, and delete roles.
   - Assign permissions to roles dynamically.

3. **Permissions Management**
   - Flexible and granular control of permissions.
   - Display permissions in an intuitive interface.

4. **Job Management**
   - Users can create, edit, and delete jobs.
   - Search and filter jobs effectively using dynamic queries.
   - Update user profiles with job-related data seamlessly.

5. **API Integration**
   - Backend built with **Node.js** and **Express.js** for real-world data handling.
   - APIs for managing users, roles, permissions, and jobs.

6. **Responsive UI**
   - Fully responsive design built with **ReactJS** and **TailwindCSS** for a seamless user experience.

---

## Setup Instructions

### Prerequisites
Ensure you have the following installed:
- Node.js (v16 or higher)
- npm (v6 or higher)

### Steps to Set Up the Project
1. Clone the repository:
   ```bash
   git clone https://github.com/Ovesh101/Jobify-Main.git
   cd Jobify-Main
   npm run setup-project
   ```
  
2. Add .env variable inside the Jobify-Main:
  ```bash
PORT=5000
NODE_ENV=devolopment
MONGO_URL=mongodb+srv://Ovesh786:123@cluster101.w6vis1s.mongodb.net/JOBIFY?retryWrites=true&w=majority
JWT_SECRET=secret
JWT_EXPIRES_IN=1d
CLOUD_NAME=de7savung
CLOUD_API_KEY=914669372435349
CLOUD_API_SECRET=1-oeqks9ggJdXZmOpBrlcRZOizk
  ```
3. Run The Fronted and Server Both:
   ```bash
     npm run dev
   ```





    

