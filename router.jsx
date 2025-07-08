import { createBrowserRouter } from "react-router";
import App from "./src/App";
import RootLayout from "./src/Layout/RootLayout";

const router = createBrowserRouter([

    {
        path: '/',
        Component:RootLayout
    }

])

export default router