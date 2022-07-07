import Notiflix from "notiflix";
import { useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Rest } from "../../services/Rest.Services";
import { adminRuleInterface } from "../../services/types";
import { UrlService } from "../../services/Url.Services";

export function RuleDetail() {
	let { roleId } = useParams()
	const [rule, setRule] = useState<adminRuleInterface>({
		adminRuleId: 0,
		adminRuleTitle: '',
		adminRulePid: 0,
		adminRuleLink: '',
		adminRuleIcon: '',
		adminRuleType: '',
		adminRuleActive: '',
		adminRuleSequence: 0,
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
		Rest.get(UrlService.rule.detail + roleId)
			.then(result => {
				if (result.message) {
					Notiflix.Notify.failure(result.message)
				} else {
					setRule(result.data)
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
					<div className="level-item is-size-2">{rule.adminRuleTitle}</div>
				</div>
			</div>
		</div>
	);
}