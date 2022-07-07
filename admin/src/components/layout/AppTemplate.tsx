import { Navigate, Outlet } from "react-router-dom";
import Footer from "./Footer";
import SidebarMenu from "./SidebarMenu";
import SidebarList from "./SidebarList";
import { fakeAuthProvider } from "../../services/Auth.Services";

export default function AppTemplate() {
	return (
		<RequireAuth>
			<div className="admin">
				<div className="admin-nav">
					<div className="admin-nav-menu">
						<SidebarMenu />
					</div>
					<div className="admin-nav-list">
						<SidebarList />
					</div>
				</div>
				<div className="admin-body">
					<Outlet />
					<Footer />
				</div>
			</div>
		</RequireAuth>
	);
}

function RequireAuth({ children }: { children: JSX.Element }) {
	if (!fakeAuthProvider.isLogged()) {
		return <Navigate to='/login' />
	}

	return children
}