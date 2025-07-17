import { createBrowserRouter } from "react-router";
import RootLayout from "./src/Layout/RootLayout";
import Home from "./src/Pages/Home";
import RegBox from "./src/Pages/RegBox";
import LoginBox from "./src/Pages/LoginBox";
import AllClass from "./src/Pages/AllClass";
import PrivateRoute from "./src/Providers/PrivateRoute";
import ClassDtlCard from "./src/Elements/ClassDtlCard";
import Payment from "./src/Pages/Payment";
import Dashboard from "./src/Layout/DashboardLayout/Dashboard";
import MyEnrolledClass from "./src/Layout/DashboardLayout/StudentDashboard/MyEnrolledClass";
import EnrollClassDetail from "./src/Layout/DashboardLayout/StudentDashboard/EnrollClassDetail ";
import TeacherReq from "./src/Layout/DashboardLayout/AdminDashboard/TeacherReq";
import AddClass from "./src/Layout/DashboardLayout/TeacherDashboard/AddClass";
import MyClass from "./src/Layout/DashboardLayout/TeacherDashboard/MyClass";
import MyClassDetail from "./src/Layout/DashboardLayout/TeacherDashboard/MyClassDetail";
import ManageUsers from "./src/Layout/DashboardLayout/AdminDashboard/ManageUsers";
import ManageClasses from "./src/Layout/DashboardLayout/AdminDashboard/ManageClasses";
import Profile from "./src/Layout/DashboardLayout/UserProfile/Profile";
import BecomeTutor from "./src/Pages/BecomeTutor";



const router = createBrowserRouter([

    {
        path: '/',
        
        element: <RootLayout></RootLayout>,
        children:[{
            index:true,
        Component : Home
        },
         {
     path:'/reg',
      Component: RegBox,
  },
  {
     path:'/login',
      Component: LoginBox,
  },
    {
        path:'/allClass',
        Component:AllClass,
    },
    {
path:'/becomeTutor',
element: <PrivateRoute>
    <BecomeTutor></BecomeTutor>
</PrivateRoute>

    },
{
    path : '/classDtl/:_id',
    // Component :ClassDtl
    element:<PrivateRoute>
         <ClassDtlCard></ClassDtlCard>
    </PrivateRoute>
},
{
    path:'/payment/:classId',
   element: <PrivateRoute>
    <Payment></Payment>
   </PrivateRoute>
},

]
    },
    {
  path: "/dashboard",
  element: <PrivateRoute><Dashboard /></PrivateRoute>, 
  children: [
    // student
    { path: "my-enroll-class", 
        Component: MyEnrolledClass
     },

    { path: "my-enroll-class/:id",
         Component: EnrollClassDetail
        },

    

    // teacher
    { path: "add-class",
    Component: AddClass},
    { path: "my-class",
    Component:MyClass },
    { path: "my-class/:id",
    Component:MyClassDetail },

    // admin
    { path: "teacher-request", 
    Component:TeacherReq },

    { path: "users",
    Component:ManageUsers},

    { path: "all-classes", 
     Component:ManageClasses },

    //  profile
    {
        path:'profile',
        Component: Profile
    }
    
  ]
}


])

export default router