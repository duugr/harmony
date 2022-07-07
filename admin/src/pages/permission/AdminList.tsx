import Notiflix from "notiflix";
import { useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Rest } from "../../services/Rest.Services";
import { adminUserInterface } from "../../services/types";
import { UrlService } from "../../services/Url.Services";

export function AdminList() {
	const [adminUsers, setAdminUsers] = useState([])
	// useLayoutEffect, useEffect(callback,arr);
	/*
	useEffect接受两个参数
	callback: 回调函数，第一次会默认执行一次，内部可以return一个回调函数，当卸载组件时执行
	arr: 监控变量的数组，如果不传入arr则默认监控全部的变量，
		 如果传入并且为空，则相当于生命周期的DidMount；
		 如果有值则当里面的值变化时会再执行callback，相当于update生命周期
	*/
	useLayoutEffect(() => {
		Rest.post(UrlService.admin.list, {page:1, limit: 10})
			.then(result => {
				console.log(result)
				if (result.message) {
					Notiflix.Notify.failure(result.message)
				} else {
					setAdminUsers(result.data.Data)
				}
			})
			.catch(error => {
				console.error(error)
			})
	}, [])

	const deleteAdminUser = (id: number) => {
		Notiflix.Notify.failure(id.toString())
	}

	let userContext
	if (adminUsers) {
		userContext = adminUsers.map((user: adminUserInterface) => (
			<tr key={user.adminUserId} id={user.adminUserName}>
				<td>
					<Link to={'/user/' + user.adminUserId}>
						<strong>{user.adminUserName}</strong>
					</Link>
				</td>
				<td>{user.adminUserRoles.join(",")}</td>
				<td>{user.createdAt}</td>
				<td>{user.updatedAt.String}</td>
				<td className="is-right">
					<button className="button is-small is-danger" onClick={() => deleteAdminUser(user.adminUserId)}>删除</button>
				</td>
			</tr>
		))
	}

	return (
		<div className="content">
			<table className="table is-fullwidth is-narrow">
				<thead>
					<tr>
						<th><abbr title="AdminName">用户名称</abbr></th>
						<th><abbr title="Roles">权限</abbr></th>
						<th><abbr title="CreatedAt">创建时间</abbr></th>
						<th><abbr title="UpdatedAt">更新时间</abbr></th>
						<th>操作</th>
					</tr>
				</thead>
				<tfoot>
					<tr>
						<th><abbr title="AdminName">用户名称</abbr></th>
						<th><abbr title="Roles">权限</abbr></th>
						<th><abbr title="CreatedAt">创建时间</abbr></th>
						<th><abbr title="UpdatedAt">更新时间</abbr></th>
						<th>操作</th>
					</tr>
				</tfoot>
				<tbody>
					{userContext}
				</tbody>
			</table>
		</div>
	);
}