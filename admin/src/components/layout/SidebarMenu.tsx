import { Link, useLocation } from "react-router-dom";
import HeroNavbar from "./HeroNavbar";
import UserNavbar from "./UserNavbar";

export default function SidebarMenu() {
	const location = useLocation()

	let paths = location.pathname.split('/', 2)
	const pathname = paths[1]

	return (
		<>
			<HeroNavbar />
			<Link to="/" className={pathname === '' ? 'menu-big is-active' : 'menu-big'}>
				<span className="fas fa-home"></span>
			</Link>
			<Link to="/article" className={pathname === 'article' ? 'menu-big is-active' : 'menu-big'}>
				<span className="fas fa-file"></span>
			</Link>
			<Link to="/user" className={pathname === 'user' ? 'menu-big is-active' : 'menu-big'}>
				<span className="fas fa-users-cog"></span>
			</Link>
			<Link to="/permission" className={pathname === 'permission' ? 'menu-big is-active' : 'menu-big'}>
				<span className="fas fa-users-cog"></span>
			</Link>
			<UserNavbar />
		</>
	)
}