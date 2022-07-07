import Notiflix from "notiflix";
import { useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Rest } from "../../services/Rest.Services";
import { adminRoleInterface } from "../../services/types";
import { UrlService } from "../../services/Url.Services";

export function RoleList() {
	const [roles, setRoles] = useState([])
	// useLayoutEffect, useEffect(callback,arr);
	/*
	useEffect接受两个参数
	callback: 回调函数，第一次会默认执行一次，内部可以return一个回调函数，当卸载组件时执行
	arr: 监控变量的数组，如果不传入arr则默认监控全部的变量，
		 如果传入并且为空，则相当于生命周期的DidMount；
		 如果有值则当里面的值变化时会再执行callback，相当于update生命周期
	*/
	useLayoutEffect(() => {
		Rest.post(UrlService.role.list, { page: 1, limit: 10 })
			.then(result => {
				if (result.message) {
					Notiflix.Notify.failure(result.message)
				} else {
					setRoles(result.data.Data)
				}
			})
			.catch(error => {
				console.error(error)
			})
	}, [])

	const deleteRole = (id: number) => {
		Notiflix.Notify.failure(id.toString())
	}

	let roleContext
	if (roles) {
		roleContext = roles.map((role: adminRoleInterface) => (
			<tr key={role.adminRoleId} id={role.adminRoleName}>
				<td>
					<Link to={'/permission/role/' + role.adminRoleId}>
						<strong>{role.adminRoleName}</strong>
					</Link>
				</td>
				<td>{role.adminRoleDescription}</td>
				<td>{role.createdAt}</td>
				<td>{role.updatedAt.String}</td>
				<td>{role.deletedAt.String}</td>
				<td className="is-right">
					<Link className="button is-small is-info" to={'rule/' + role.adminRoleId}>
						<strong>管理节点</strong>
					</Link>
					<button className="button is-small is-danger" onClick={() => deleteRole(role.adminRoleId)}>删除</button>
				</td>
			</tr>
		))
	}

	return (
		<div className="content">
			<table className="table is-fullwidth is-narrow">
				<thead>
					<tr>
						<th><abbr title="Name">用户名称</abbr></th>
						<th><abbr title="Description">描述</abbr></th>
						<th><abbr title="CreatedTime">创建</abbr></th>
						<th><abbr title="UpdatedTime">更新</abbr></th>
						<th><abbr title="DeletedTime">删除</abbr></th>
						<th>操作</th>
					</tr>
				</thead>
				<tfoot>
					<tr>
						<th><abbr title="Name">用户名称</abbr></th>
						<th><abbr title="Description">描述</abbr></th>
						<th><abbr title="CreatedTime">创建</abbr></th>
						<th><abbr title="UpdatedTime">更新</abbr></th>
						<th><abbr title="DeletedTime">删除</abbr></th>
						<th>操作</th>
					</tr>
				</tfoot>
				<tbody>
					{roleContext}
				</tbody>
			</table>
		</div>
	);
}