import Notiflix from "notiflix";
import { useLayoutEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Rest } from "../../services/Rest.Services";
import { OptionInterface } from "../../services/types";
import { UrlService } from "../../services/Url.Services";

export function RoleRuleList() {
	const { roleId } = useParams()
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
		Rest.get(UrlService.role.rules+"?roleId="+roleId)
			.then(result => {
				console.log(result)
				if (result.message) {
					Notiflix.Notify.failure(result.message)
				} else {
					setRules(result.data.Data)
				}
			})
	}, [])

	const postRoleRule = (roleId: any, ruleId: any) => {
		Rest.post(UrlService.role.saveRule, {
			roleId: roleId,
			ruleId: ruleId
		}).then(result => {
			Notiflix.Notify.failure(result.message)
		})
	}

	let ruleContext
	if (rules) {
		ruleContext = rules.map((rule: OptionInterface) => (
			<div className="column">
				<label className="checkbox">
					<input type="checkbox" checked={rule.checked} onChange={() => postRoleRule(roleId, rule.value)}>
						{rule.name}
					</input>
				</label>
			</div>
		))
	}

	return (
		<div className="content">
			<div className="columns">
				{ruleContext}
			</div>
		</div>
	);
}