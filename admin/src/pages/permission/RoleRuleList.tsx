import Notiflix from "notiflix";
import { useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Rest } from "../../services/Rest.Services";
import { adminRoleInterface, adminRuleInterface } from "../../services/types";
import { UrlService } from "../../services/Url.Services";

export function RoleRuleList() {
	const [rules, setRules] = useState([])
	// useLayoutEffect, useEffect(callback,arr);
	/*
	useEffect接受两个参数
	callback: 回调函数，第一次会默认执行一次，内部可以return一个回调函数，当卸载组件时执行
	arr: 监控变量的数组，如果不传入arr则默认监控全部的变量，
		 如果传入并且为空，则相当于生命周期的DidMount；
		 如果有值则当里面的值变化时会再执行callback，相当于update生命周期
	*/
	useLayoutEffect(() => {
		Rest.get(UrlService.rule.all)
			.then(result => {
				console.log(result)
				if (result.message) {
					Notiflix.Notify.failure(result.message)
				} else {
					setRules(result.data.Data)
				}
			})
			.catch(error => {
				console.error(error)
			})
	}, [])

	const deleteRule = (id: number) => {
		Notiflix.Notify.failure(id.toString())
	}

	let ruleContext
	if (rules) {
		ruleContext = rules.map((rule: adminRuleInterface) => (
			<tr key={rule.adminRuleId} id={rule.adminRuleTitle}>
				<td>
					<Link to={'/rule/' + rule.adminRuleId}>
						<strong>{rule.adminRuleTitle}</strong>
					</Link>
				</td>
				<td>{rule.adminRuleId}</td>
				<td>{rule.createdAt}</td>
				<td>{rule.updatedAt.String}</td>
				<td>{rule.deletedAt.String}</td>
				<td className="is-right">
					<button className="button is-small is-danger" onClick={() => deleteRule(rule.adminRuleId)}>删除</button>
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
					{ruleContext}
				</tbody>
			</table>
		</div>
	);
}