import Notiflix from "notiflix";
import { useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
		Rest.get(UrlService.role.rules + "?roleId=" + roleId)
			.then(result => {
				console.log(result)
				if (result.message) {
					Notiflix.Notify.failure(result.message)
				} else {
					setRules(result.data)
				}
			})
	}, [])

	const postRoleRule = (roleId: any, ruleId: any, checked:boolean) => {
		Rest.post(UrlService.role.saveRule, {
			roleId: Math.abs(roleId),
			ruleId: ruleId,
			checked: checked
		}).then(result => {
			Notiflix.Notify.success(result.message)
		})
	}

	return (
		<div className="content">
			<div className="columns">
				{rules.map((rule: OptionInterface) => (
					<div className="column" key={rule.value} id={rule.name}>
						<label className="checkbox">
							<input type="checkbox" id="{rule.value}" value={rule.value} checked={rule.checked} onChange={() => postRoleRule(roleId, rule.value, !rule.checked)} />
							{rule.name}
						</label>
					</div>
				))}
			</div>
		</div>
	);
}