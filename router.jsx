import { createBrowserRouter } from "react-router";
import RootLayout from "./src/Layout/RootLayout";
import Home from "./src/Pages/Home";
import RegBox from "./src/Pages/RegBox";
import LoginBox from "./src/Pages/LoginBox";
import AllClass from "./src/Pages/AllClass";

import ClassDtlCard from "./src/Elements/ClassDtlCard";

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
    path : '/classDtl/:_id',
    // Component :ClassDtl
    element: <ClassDtlCard></ClassDtlCard>
}]
    }

])

export default router