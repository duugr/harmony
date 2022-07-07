import { Link, useLocation } from "react-router-dom";
import { Menus } from "../../services/Breadcrumbs.Services";

export default function SidebarList() {
    const location = useLocation()

    let pathname = location.pathname.replace(/-\w\d+$/i, '')
    let paths = location.pathname.split('/', 2)
    const menuName = paths[1]

    let menu = Menus(menuName)

    let menuContext
    if (menu) {
        menuContext = menu.map((m: any) => (
            <p key={m.title} className="menu-list">
                <Link to={m.link} className={pathname === m.link ? 'is-active' : ''}>
                    <strong>{m.title}</strong>
                </Link>
            </p>
        ))
    }
    return (
        <>
            {menuContext}
        </>
    )
}