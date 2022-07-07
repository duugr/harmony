import Notiflix from "notiflix";
import { useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Rest } from "../../services/Rest.Services";
import { adminUserInterface } from "../../services/types";
import { UrlService } from "../../services/Url.Services";

export function AdminDetail() {
	let { roleId } = useParams()
	const [user, setUser] = useState<adminUserInterface>({
		adminUserId: 0,
		adminUserName: '',
		adminUserPassword: '',
		adminUserRoles: [],
		createdAt: '',
		updatedAt: {
			String: '',
			Valid: false
		},
		deletedAt: {
			String: '',
			Valid: false
		}
	})
	// useLayoutEffect, useEffect(callback,arr);
	/*
	useEffect接受两个参数
	callback: 回调函数，第一次会默认执行一次，内部可以return一个回调函数，当卸载组件时执行
	arr: 监控变量的数组，如果不传入arr则默认监控全部的变量，
		 如果传入并且为空，则相当于生命周期的DidMount；
		 如果有值则当里面的值变化时会再执行callback，相当于update生命周期
	*/
	useLayoutEffect(() => {
		Rest.get(UrlService.admin.detail + roleId)
			.then(result => {
				if (result.message) {
					Notiflix.Notify.failure(result.message)
				} else {
					setUser(result.data)
				}
			})
			.catch(error => {
				console.error(error)
			})
	}, [roleId])

	return (
		<div className="content">
			<div className="level">
				<div className="level-left">
					<div className="level-item is-size-2">{user.adminUserName}</div>
				</div>
			</div>
		</div>
	);
}