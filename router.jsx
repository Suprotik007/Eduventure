import { createBrowserRouter } from "react-router";
import App from "./src/App";
import RootLayout from "./src/Layout/RootLayout";

const router = createBrowserRouter([

    {
        path: '/',
        Component:RootLayout,
        children:[{
            index:true
            
        },
    {
        path:'/allClass',
        // Component:AllClass
    }]
    }

])

export default router