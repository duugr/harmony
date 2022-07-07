
export const UrlService = {
	login: `/admin/auth/login`,
	book: {
		list: `/api/book/list`,
		detail: `/api/book/detail/`,
		create: `/api/book/create`,
		delete: `/api/book/delete/`,
	},
	chapter: {
		list: `/api/chapter/list/`,
		detail: `/api/chapter/detail/`,
		create: `/api/chapter/create`,
		delete: `/api/chapter/delete/`,
	},
	article: {
		list: `/api/article/list`,
		detail: `/api/article/detail/`,
		create: `/api/article/create`,
		delete: `/api/article/delete/`,
	},
	tag: {
		post: `/api/tag/post`,
	},
	user: {
		list: `/admin/user/list`,
		detail: `/admin/user/detail/`,
		create: `/admin/user/create`,
		delete: `/admin/user/delete/`,
	},
	role: {
		list: `/admin/role/list`,
		detail: `/admin/role/detail/`,
		create: `/admin/role/create`,
		delete: `/admin/role/delete/`,
	},
	rule: {
		all: `/admin/rule/all`,
		list: `/admin/rule/list`,
		detail: `/admin/rule/detail/`,
		create: `/admin/rule/create`,
		delete: `/admin/rule/delete/`,
	},
	admin: {
		list: `/admin/admin/list`,
		detail: `/admin/admin/detail/`,
		create: `/admin/admin/create`,
		delete: `/admin/admin/delete/`,
	},
}