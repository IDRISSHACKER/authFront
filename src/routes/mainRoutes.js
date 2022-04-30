import { lazy } from "react";
import NotFound from "../view/notFound.view";
import HomeView from "../view/home.view";
import LoginView from './../view/auth/login.view';
import RegisterView from './../view/auth/register.view';
const MainLayout = lazy(() => import('./../layouts/MainLayout/main.layout'));


const  MainRoutes = {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <HomeView />
            },
            {
                path: "/login",
                element: <LoginView />
            },
            {
                path: "/register",
                element: <RegisterView />
            },
            {
                path: "*",
                element: <NotFound />
            }
        ]

    }

export default MainRoutes