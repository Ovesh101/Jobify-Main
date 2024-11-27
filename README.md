# Jobify - Existing Project with RBAC Implementation in a CMS Dashboard


Welcome to **Jobify**, a robust project where users can manage jobs, search for their added jobs, and update their profiles effectively. This Project CMS dashboard also includes a powerful Role-Based Access Control (RBAC) system for managing users, roles, and permissions, fulfilling all the requirements specified by the company.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Key Features](#key-features)
- [Setup Instructions](#setup-instructions)
- [Folder and File Structure](#folder-and-file-structure)
- [Usage Guide](#usage-guide)
  - [User Management](#user-management)
  - [Role Management](#role-management)
  - [Job Management](#job-management)
- [Demo and Deployment](#demo-and-deployment)
- [Technical Details](#technical-details)


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
   - Fully responsive design built with **ReactJS**, **TailwindCSS**, and **Material UI** for a seamless user experience.

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
4. Login Credentials: 
    ```bash
    1: Super Admin Credentials:
        email: oveshmulla1124@gmail.com
        password: Ovesh@123
    2: Admin Credentials:
        email: anas@gmail.com
        password: Anas@123
    3: Manager Credentials:
        email: deep@gmail.com
        password: Deep@123
---

## Folder and File Structure

Below is the folder and file structure where the role-based access control (RBAC) has been implemented:
![Screenshot (49)](https://github.com/user-attachments/assets/a592d2ae-d37b-424a-8941-8822014aa2e3)



### Key Files and Their Roles:

- **`/Role_Based_System/auth.js`**: This file contains the core logic for role-based access control (RBAC) and permission assignment. It dynamically loads roles and permissions from the server and allows checking whether a user has the necessary permissions to perform specific actions.

### Description of `auth.js`:

The `auth.js` file includes the following functionalities:

- **Roles and Permissions Management**: It loads roles and their associated permissions from the server, storing them for use in access control checks.
- **Custom Attributes**: It supports custom attributes for roles, allowing for more granular control over permissions.
- **Permission Checking**: It provides methods to check if a user has permission to perform specific actions on resources and whether a user has specific custom attributes.

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
https://drive.google.com/file/d/1HbhdS46edJikQ27dEikdS-mJAdcV1QZG/view?usp=sharing


### Demo Screenshots
Below are some screenshots showcasing the different sections and features of the dashboard:

## User Management Interface

### 1. **View Users**  

   ![Screenshot (32)](https://github.com/user-attachments/assets/c2d6ace0-acbd-46c8-aacc-18ff3768e00d)

   *This screenshot shows how you can view all users in the User Management interface.*


### 2. **Create User**  

 ![Screenshot (33)](https://github.com/user-attachments/assets/897dfe34-7d40-41b1-98ba-6a6abec225cc)
   *This screenshot demonstrates the process of adding a new user to the system.*


### 3. **Edit User**  

   ![Screenshot (34)](https://github.com/user-attachments/assets/1eaa45e1-f4c6-4756-83a1-9463ab2bc550)

   *This screenshot illustrates how you can edit user details, such as name, email, role, and status.*


## Role Management Interface
  ### 1. **View Roles**  
![Screenshot (35)](https://github.com/user-attachments/assets/f6343295-2d63-4e57-814b-7047f50e419a)


   *This screenshot shows how you can view all users in the User Management interface.*


### 2. **Create Role, Permission,and Custom Attributes**  

![Screenshot (36)](https://github.com/user-attachments/assets/54a6541f-c98a-4ae8-803b-a7accb2076eb)

   *This screenshot demonstrates the process of adding a new role along with Assign permission to it to the system.*


### 3. **Edit Roles**  


![Screenshot (37)](https://github.com/user-attachments/assets/91189a61-ff28-428d-8773-578cc170045b)

   *This screenshot illustrates how you can edit role details, such as name, permission, and Custom Attribute*


## Permission Management Interface
![Screenshot (37)](https://github.com/user-attachments/assets/a72b67b9-4e56-487e-ab8d-43ac2dbc185e)![Screenshot (38)](https://github.com/user-attachments/assets/0b57b711-e062-433c-9a7a-a7d4402ebdc2)

   *This section allows admins to view and modify permissions for different roles, with the ability to add custom attributes.*

## Job Management Interface

  ### 1. **View All Jobs**  


![Screenshot (42)](https://github.com/user-attachments/assets/ce6aa05e-f76b-47f5-91e4-4d63bcc65544)

   *This screenshot shows how you can view all Jobs in the Jobs Management interface.*


### 2. **Create Jobs**

![Screenshot (41)](https://github.com/user-attachments/assets/5eadd07f-09ca-483e-a57a-d8b906772ae5)


   *This screenshot demonstrates the process of adding a new Job along with location and position*


### 3. **Edit Jobs**  

![Screenshot (48)](https://github.com/user-attachments/assets/a53100ef-e3d1-484b-9946-73644e58ecc1)

   *This screenshot illustrates how you can edit Job details, such as name, location, and Position*
   

## Resonsiveness
  ![Screenshot (46)](https://github.com/user-attachments/assets/d93cf179-d2b8-4a2b-9737-9c4844df436f)
  ![Screenshot (47)](https://github.com/user-attachments/assets/747866c0-5ff4-498f-877c-02913aa57491)


### Deployment Link
You can access the live version of the **Jobify CMS Dashboard** at the following link:

[Jobify CMS Dashboard - Live Demo](https://jobify-main.onrender.com/)

Feel free to explore the live demo to see the dashboard's full functionality and responsiveness.

---

## Technical Details

### Technologies Used
The **Jobify CMS Dashboard** is built using the following technologies:

- **Frontend**:
  - **ReactJS**: A JavaScript library for building user interfaces. It helps in creating dynamic and responsive dashboards.
  - **Tailwind CSS and Material UI**: A utility-first CSS framework used for styling the front end and making the application responsive.
  - **React Router**: For routing and navigating between different views in the dashboard.
  - **Axios**: For making HTTP requests to the backend API.

- **Backend**:
  - **Node.js**: A JavaScript runtime for the server side. It handles backend logic and API routes.
  - **Express.js**: A lightweight web application framework for Node.js, used to create RESTful APIs.
  - **MongoDB**: A NoSQL database used to store data related to users, roles, permissions, and jobs.
  - **JWT (JSON Web Tokens)**: For user authentication and authorization. It is used for securely transmitting information between the front end and back end.

- **Cloud Storage**:
  - **Cloudinary**: A cloud-based image and video management platform used for handling file uploads in the application.

- **Authentication**:
  - **Role-Based Access Control (RBAC)**: An authorization strategy to manage users and their permissions within the system. This is used to ensure that only authorized users can access specific sections of the CMS dashboard.

### Architecture
The application follows a **client-server** architecture:
- The **client** (ReactJS) interacts with the **server** (Node.js/Express.js) through HTTP API requests.
- The **client** sends requests for data (users, roles, permissions, jobs) and the server responds with data from the **MongoDB** database.
- **JWT** is used for secure authentication, where the front end stores the token and sends it with each API request to authorize the user.


### Database Schema
The database is structured with the following key collections:
1. **Users**: Contains user information such as email, name, role, status (active/inactive), etc.
2. **Roles**: Stores different roles like Admin, User, etc., along with the associated permissions.
3. **Jobs**: Stores job-related data including job title, description, status, and other details.

### API Endpoints
The backend API provides several endpoints for interacting with the data:

## User Management
  - `GET /api/v1/info/users`: Fetches a list of users.
  - `POST /api/v1/info/users`: Creates a new user.
  - `PUT /api/v1/info/users/:id`: Updates a user’s details.
  - `DELETE /api/v1/info/users/:id`: Deletes a user.

## Role Management
- **`GET /api/v1/roles`**  
  Retrieves a list of all roles along with their associated permissions.

- **`POST /api/v1/roles`**  
  Creates a new role and assigns the specified permissions.

- **`PUT /api/v1/roles/:id`**  
  Updates the details and permissions of a specific role by its unique ID.

- **`DELETE /api/v1/roles/:id`**  
  Deletes a role and its associated permissions based on the provided role ID.


## Job Management
  - `GET /api/v1/jobs`: Fetches all job listings.
  - `POST /api/v1/jobs`: Creates a new job.
  - `PUT /api/v1/jobs/:id`: Updates job details.
  - `DELETE /api/v1/jobs/:id`: Deletes a job .

---

### How It Works
- When the user logs in, a **JWT** is issued and stored in the browser’s local storage.
- The JWT is included in the HTTP header when making API requests to authenticate and authorize actions.
- The frontend interacts with the backend via **Axios** to fetch or send data, and the server communicates with the **MongoDB** database to perform operations on users, roles, jobs, and permissions.










    

