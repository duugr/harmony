export interface AuthContextType {
	user: any;
	isLogged: () => void;
	signIn: (username: string, password: string, callback: VoidFunction) => void;
	signOut: (callback: VoidFunction) => void;
}

export interface book {
	uuid: string;
	title: string;
	description: string;
	author: any;
	publisher: any;
	publishedDate: any;
	creationStartDate: any;
	creationEndDate: any;
}

export interface chapter {
	uuid: string
	bookUuid: string
	title: string
	publisher: string
	createdAt: string
	content: string
	like: number
}
export interface article {
	uuid: string
	title: string
	content: string
	publisher: string
	language: string
	state: string
	chapter: number
	good: number
	click: number
	recommend: number
	createdAt: string
	updatedAt: string
	tags: TagInterface[]
}
export interface TagInterface {
	name: string
	uuid: string
}

export interface user {
	id: number
	username: string
	roles: object
	password: string
}
export interface adminUserInterface {
	adminUserId: number
	adminUserName: string
	adminUserPassword: string
	adminUserRoles: string[]
	createdAt: string
	updatedAt: {
		String: string
		Valid: boolean
	}
	deletedAt: {
		String: string
		Valid: boolean
	}
}
export interface adminRoleInterface {
	adminRoleId: number
	adminRoleName: string
	adminRoleDescription: string
	createdAt: string
	updatedAt: {
		String: string
		Valid: boolean
	}
	deletedAt: {
		String: string
		Valid: boolean
	}
}
export interface adminRuleInterface {
	adminRuleId: number
	adminRuleTitle: string
	adminRulePid: number
	adminRuleLink: string
	adminRuleIcon: string
	adminRuleType: string
	adminRuleActive: string
	adminRuleSequence: number
	createdAt: string
	updatedAt: {
		String: string
		Valid: boolean
	}
	deletedAt: {
		String: string
		Valid: boolean
	}
}

export interface breadcrumb {
	title: string
	link: string
	active: boolean
}

export interface OptionInterface {
	value: string
	name: string
	checked: boolean
}
