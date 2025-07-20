## 🎓 Edventure
Welcome to Edventure — a full-stack e-learning platform where students can explore and enroll in classes, teachers can create and manage their own courses, and admins can control the platform's operations.

### 🔐 Admin Access
email: bob@gmail.com

Password: bob123@


### 🌐 Live Website
https://edventure-learning.vercel.app

### 🌟 Key Features
##### Role-Based Dashboard: 
Separate dashboards for Students, Teachers, and Admins with protected routes using JWT.

##### Secure Authentication:  
Login via Email/Password or Google using Firebase Auth, with JWT stored in localStorage.

##### Stripe Integration: 
Secure and seamless class enrollment payment using Stripe.

##### Dynamic Homepage: 
Carousel banner, feedback section, partner showcase, and key metrics displayed attractively.

##### Popular Classes Slider: 
Highlights trending classes based on total enrollment.

##### Admin Control Panel: 
Approve/reject teacher requests and classes, manage users, and monitor system stats.

##### Teacher Tools: 
Teachers can add classes, manage assignments, track class progress, and see total enrollments.

##### Student Features: 
Students can view enrolled classes, continue learning, submit assignments, and evaluate teaching.

##### Feedback System: 
Teaching Evaluation Reports collected and displayed publicly on the homepage.

##### Responsive Design:
Fully responsive UI with navbar dropdowns, profile display, modals, and dynamic data rendering.

🧭 Navigation
##### 🔼 Navbar
Logo + Website Name

Home, All Classes, Teach on Edventure

Sign In (when logged out)

Profile Picture Dropdown (when logged in):

Username

Dashboard

Logout

##### 🏠 Home Page
Banner carousel

Partners/collaborators section

Popular classes (slider)

Feedback (carousel)

Site Stats (users, classes, enrollments)

“Become a Teacher” CTA section

Two extra sections (custom)

##### 📚 All Classes
Card display of approved classes

Info: Title, Teacher, Price, Image, Enroll button

Clicking Enroll → Class Details → Payment → My Enrolled Classes

##### 🧑‍🏫 Teach on Eduventure
Apply for teacher (Name, Experience, Category, Title, etc.)

Admin approval required

Conditional form visibility based on status

##### 🧑‍🎓 Student Dashboard
My Enrolled Classes

View all enrolled classes

Continue to see assignments

Class Detail Page

Assignment list with submission

Teaching Evaluation form

Profile

Name, Email, Role, Image, Phone

##### 👩‍🏫 Teacher Dashboard
Add Class

My Classes

Update/Delete/See Details

Class progress: Enrollment, Assignments, Submissions

Create Assignments via modal

Profile

##### 🛠 Admin Dashboard
Teacher Requests

Approve/Reject with status update

Users

Promote to admin

Search functionality (username/email)

All Classes

Approve/Reject classes

View progress (assignments & submissions)

Profile

##### 🧩 Tech Stack
Frontend: React, React Router, Tailwind CSS, TanStack Query, Axios, React Hook Form, Firebase

Backend: Express.js, MongoDB, Stripe, JWT

Deployment: Vercel (Frontend), Render/Other (Backend)

##### 🔐 JWT Auth
Firebase handles login (Email/Password + Google)

JWT issued on login and stored in localStorage

Used to secure protected routes and verify roles