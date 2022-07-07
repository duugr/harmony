import {Outlet} from "react-router-dom";
import BodyNavbar from "../../components/layout/BodyNavbar";

export function BodyRoute() {
    return (
        <div>
            <BodyNavbar/>
            <div className="box">
                <Outlet/>
            </div>
        </div>

    );
}
