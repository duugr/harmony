
const actions = {
	'home': { title: '首页', link: '/', active: false },
	'about': { title: 'About', link: '/about', active: false },

	'userList': { title: '用户列表', link: '/user', active: false },
	'userCreate': { title: '用户创建', link: '/user/create', active: false },
	'user': { title: '用户详细', link: '/user/{uuid}', active: false },

	'permission': {
		'adminList': { title: '管理员列表', link: '/permission/admin', active: false },
		'adminCreate': { title: '管理员创建', link: '/permission/admin/create', active: false },
		'admin': { title: '管理员详细', link: '/permission/admin/{uuid}', active: false },

		'roleList': { title: '角色列表', link: '/permission/role', active: false },
		'roleCreate': { title: '角色创建', link: '/permission/role/create', active: false },
		'role': { title: '角色详细', link: '/permission/role/{uuid}', active: false },

		'ruleList': { title: '节点列表', link: '/permission/rule', active: false },
		'ruleCreate': { title: '节点创建', link: '/permission/rule/create', active: false },
		'rule': { title: '节点详细', link: '/permission/rule/{uuid}', active: false },
	},

	'articleList': { title: '文章列表', link: '/article', active: false },
	'articleCreate': { title: '文章创建', link: '/article/create', active: false },
	'article': { title: '文章详细', link: '/article/{uuid}', active: false },
}

export function Menus(menu: string) {
	let menus
	switch (menu) {
		case 'user':
			menus = [
				actions.userList,
				actions.userCreate
			]
			break
		case 'article':
			menus = [
				actions.articleList,
				actions.articleCreate
			]
			break
		case 'permission':
			menus = [
				actions.permission.adminList,
				actions.permission.adminCreate,
				actions.permission.roleList,
				actions.permission.roleCreate,
				actions.permission.ruleList,
				actions.permission.ruleCreate,
			]
			break
		default:
			menus = [
				actions.home,
				actions.about
			]
	}


	return menus
}


let breadcrumbs = new Map();
breadcrumbs.set('/user', [actions.home, actions.userList])
breadcrumbs.set('/user/create', [actions.home, actions.userList, actions.userCreate])
breadcrumbs.set('/user/{uuid}', [actions.home, actions.userList, actions.user])

breadcrumbs.set('/article', [actions.home, actions.articleList])
breadcrumbs.set('/article/create', [actions.home, actions.articleList, actions.articleCreate])
breadcrumbs.set('/article/{uuid}', [actions.home, actions.articleList, actions.article])

export default breadcrumbs
