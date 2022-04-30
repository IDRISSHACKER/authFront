import { Outlet } from "react-router-dom";
import NavbarComponent from './../../components/navbar.component';

export default function MainLayout(){
    return(
        <div>
            <div>
                <NavbarComponent />
            </div>
            <div>
                <Outlet />
            </div>
        </div>
    )
}