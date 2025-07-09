import { createBrowserRouter } from "react-router";
import App from "./src/App";
import RootLayout from "./src/Layout/RootLayout";
import Home from "./src/Pages/Home";
import RegBox from "./src/Pages/RegBox";
import LoginBox from "./src/Pages/LoginBox";
import AllClass from "./src/Pages/AllClass";

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
        path:'allClass',
        Component:AllClass,
    }]
    }

])

export default router