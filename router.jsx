import { createBrowserRouter } from "react-router";
import App from "./src/App";
import RootLayout from "./src/Layout/RootLayout";
import Home from "./src/Pages/Home";

const router = createBrowserRouter([

    {
        path: '/',
        // Component:RootLayout,
        element: <RootLayout></RootLayout>,
        children:[{
            index:true,
        Component : Home
        },
    {
        path:'allClass',
        // Component:AllClass
    }]
    }

])

export default router