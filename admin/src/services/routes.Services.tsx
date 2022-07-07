
import { RouteObject, useRoutes } from 'react-router-dom';
import { Home, About } from '../pages/home/Index';
import {
	User,
	UserList,
	UserCreate
} from '../pages/user/Index';
import {
	Article,
	ArticleList,
	ArticleCreate
} from '../pages/article/Index';
import {
	AdminList,
	RoleList,
	RuleList,
	AdminDetail,
	RoleDetail,
	RuleDetail,
	AdminCreate,
	RoleCreate,
	RuleCreate
} from '../pages/permission/Index';
import { BodyRoute } from '../components/layout/BodyRoute';
import Login from '../pages/auth/Login';
import AppTemplate from '../components/layout/AppTemplate';
import { RoleRuleList } from '../pages/permission/RoleRuleList';

export default function Router() {
	let routes: RouteObject[] = [
		{ path: "login", element: <Login /> },
		{
			element: <AppTemplate />,
			children: [
				{ path: "/", element: <Home /> },
				{ path: "about", element: <About /> },
				{
					path: "article",
					element: <BodyRoute />,
					children: [
						{ path: "list", index: true, element: <ArticleList /> },
						{ path: "create", element: <ArticleCreate /> },
						{ path: ":uuid", element: <Article /> },
					]
				},
				{
					path: "user",
					element: <BodyRoute />,
					children: [
						{ path: "list", index: true, element: <UserList /> },
						{ path: "create", element: <UserCreate /> },
						{ path: ":uuid", element: <User /> },
					]
				},
				{
					path: "permission",
					element: <BodyRoute />,
					children: [
						{ path: "admin", index: true, element: <AdminList /> },
						{ path: "role", element: <RoleList /> },
						{ path: "rule", element: <RuleList /> },
						{ path: "admin/create", element: <AdminCreate /> },
						{ path: "role/create", element: <RoleCreate /> },
						{ path: "role/create/:uuid", element: <RoleCreate /> },
						{ path: "rule/create", element: <RuleCreate /> },
						{ path: "admin/:uuid", element: <AdminDetail /> },
						{ path: "role/:uuid", element: <RoleDetail /> },
						{ path: "role/rule/:uuid", element: <RoleRuleList /> },
						{ path: "rule/:uuid", element: <RuleDetail /> },
					]
				},
			]
		}
	];
	let element = useRoutes(routes);
	return element;
}
