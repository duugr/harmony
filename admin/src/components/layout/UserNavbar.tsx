import {fakeAuthProvider} from "../../services/Auth.Services";
import {Link, useNavigate} from "react-router-dom";

export default function UserNavbar() {
    let navigate = useNavigate()

    const userLogout = () =>{
        fakeAuthProvider.signOut(() => {
            navigate("/login", {replace: true})
        })
    }

    return (
        <nav className="admin-nav-menu-user">
            <Link to="#" className="navbar-item">
                <span className="image is-32x32">
                    <img className="is-rounded" src="/img/avatar-800x800.jpg" alt="duugr" />
                </span>
            </Link>

            <div className={"navbar-item"} onClick={userLogout}>
                <span className="fas fa-sign-out-alt">&nbsp;</span>
            </div>
        </nav>
    )
}