import Notiflix from "notiflix";
import React, { useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Input } from "../../components/from/Input";
import { FromSelect } from "../../components/from/Select";
import { Rest } from "../../services/Rest.Services";
import { OptionInterface } from "../../services/types";
import { UrlService } from "../../services/Url.Services";

export function RuleCreate() {
	let { uuid } = useParams()
	const [rules, setRules] = useState<OptionInterface[]>([])
	if (uuid === undefined) {
		uuid = '0'
	}

	useLayoutEffect(() => {
		Rest.get(UrlService.rule.all + '?adminRuleId=' + uuid)
			.then(result => {
				const defaultRule = [{ value: '0', name: '父级', checked: false }];
				setRules(defaultRule)
				if (result.message) {
					Notiflix.Notify.failure(result.message)
				} else {
					setRules([...defaultRule, ...result.data.Data])
				}
			})
			.catch(error => {
				console.error(error)
			})
	}, [])

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		Rest.post(UrlService.rule.create, {
			"adminRulePid": event.currentTarget.adminRulePid.value,
			"adminRuleName": event.currentTarget.adminRuleName.value,
			"adminRuleLink": event.currentTarget.adminRuleLink.value,
			"adminRuleIcon": event.currentTarget.adminRuleIcon.value,
			"adminRuleType": event.currentTarget.adminRuleType.value,
			"adminRuleActive": event.currentTarget.adminRuleActive.value,
			"adminRuleSequence": event.currentTarget.adminRuleSequence.value,
		}).then(result => {
			if (result.message) {
				Notiflix.Notify.failure(result.message)
			} else {
				Notiflix.Notify.success('添加成功')
			}
		});

	}

	return (
		<form onSubmit={event => handleSubmit(event)} method='post'>

			<FromSelect label="权限节点上级" id="adminRulePid" multiple="" selected="" selectList={rules} is="" iconLeft="fa-globe" iconRight="" help="" />
			<Input label="权限节点名称" id="adminRuleName" type="text" value="" placeholder="名称" is="" iconLeft="" iconRight="fa-check" help="" />
			<Input label="权限节点URL" id="adminRuleLink" type="text" value="" placeholder="URL" is="" iconLeft="" iconRight="fa-check" help="" />
			<Input label="权限节点Icon" id="adminRuleIcon" type="text" value="" placeholder="Icon" is="" iconLeft="" iconRight="fa-check" help="" />
			<Input label="权限节点类型" id="adminRuleType" type="text" value="" placeholder="类型" is="" iconLeft="" iconRight="fa-check" help="" />
			<Input label="权限节点状态" id="adminRuleActive" type="text" value="" placeholder="状态" is="" iconLeft="" iconRight="fa-check" help="" />
			<Input label="权限节点排序" id="adminRuleSequence" type="text" value="" placeholder="排序" is="" iconLeft="" iconRight="fa-check" help="" />

			<div className="field is-grouped">
				<div className="control">
					<button type="submit" className="button is-primary">Submit</button>
				</div>
			</div>
		</form>
	);
}