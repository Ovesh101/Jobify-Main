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
---

## Usage Guide

The **Jobify CMS Dashboard** provides an easy-to-use interface for managing users, roles, and permissions. Below are the key sections and functionalities available:

### User Management - CMS Login
- **View Users**: Navigate to the **Users** tab to see a list of all users.
- **Add New User**: Click the **Add User** button to create a new user by filling in the required details.
- **Edit User**: Click the **Edit** button next to a user to update their information.
- **Delete User**: Click the **Delete** button to remove a user from the system.
- **Assign Roles**: Each user can be assigned one or more roles by selecting the roles from a dropdown menu.
- **Manage Status**: Toggle the user status between Active and Inactive.

### Role Management - CMS Login
- **View Roles**: Go to the **Roles** tab to view a list of all available roles in the system.
- **Create New Role**: Click the **Create Role** button to define new roles with specific permissions.
- **Edit Role**: You can modify an existing role by clicking the **Edit** button next to the role.
- **Delete Role**: Click the **Delete** button to remove a role.
- **Assign Permissions**: Assign permissions to roles through an easy-to-use UI, enabling granular access control.

### Permissions Management - CMS Login
- **View Permissions**: Permissions are listed under the **Permissions** section, where you can see which permissions are assigned to different roles.
- **Edit Permissions**: Modify the permissions for specific roles by clicking on the **Edit** button.
- **Custom Attributes**: Custom attributes can be added in the **Permissions** section, allowing you to define additional permission-related details that can be tailored to your organization's needs.


### Job Management - User Login Page
- **View Jobs**: Navigate to the **Jobs** section to view all the available jobs in the system.
- **Add New Job**: Click the **Add Job** button to post a new job listing with detailed descriptions.
- **Edit Job**: Update job details by clicking on the **Edit** button next to a job.
- **Delete Job**: Remove a job listing from the platform by clicking the **Delete** button.

---

## Demo and Deployment

### Demo Video
You can watch a  demo of the **Jobify CMS Dashboard** and its features in action.

[![Jobify Demo Video](https://img.youtube.com/vi/YOUR_VIDEO_ID/0.jpg)](https://www.youtube.com/watch?v=YOUR_VIDEO_ID)  
*Click the video above to watch the demo.*

### Demo Screenshots
Below are some screenshots showcasing the different sections and features of the dashboard:

1. **User Management Interface**
   ![User Management Screenshot](https://link-to-your-screenshot.com/user-management.png)  
   *This screenshot shows the User Management interface where you can view, add, edit, or delete users and assign roles.*

2. **Role Management Interface**
   ![Role Management Screenshot](https://link-to-your-screenshot.com/role-management.png)  
   *Here, you can manage roles, assign permissions, and edit role details.*

3. **Permissions Management**
   ![Permissions Management Screenshot](https://link-to-your-screenshot.com/permissions-management.png)  
   *This section allows admins to view and modify permissions for different roles, with the ability to add custom attributes.*

4. **Job Management Interface**
   ![Job Management Screenshot](https://link-to-your-screenshot.com/job-management.png)  
   *Job Management interface showing how users can manage and view job listings.*

### Deployment Link
You can access the live version of the **Jobify CMS Dashboard** at the following link:

[Jobify CMS Dashboard - Live Demo](https://your-deployment-link.com)

Feel free to explore the live demo to see the dashboard's full functionality and responsiveness.

---









    

