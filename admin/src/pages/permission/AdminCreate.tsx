import Notiflix from "notiflix";
import React from "react";
import { FromCheckbox } from "../../components/from/FromCheckbox";
import { Rest } from "../../services/Rest.Services";
import { OptionInterface } from "../../services/types";
import { UrlService } from "../../services/Url.Services";

export function AdminCreate() {

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		let roles:any = []
		event.currentTarget.roles.forEach((element:any, index:number) => {
			if (element.checked) {
				roles[index] = element.value
			}
		});
		Rest.post(UrlService.admin.create, {
			"adminUserName": event.currentTarget.username.value,
			"adminUserPassword": event.currentTarget.password.value,
			"adminUserRoles": roles,
		}).then(result => {
			if (result.message) {
				Notiflix.Notify.failure(result.message)
			} else {
				Notiflix.Notify.success('添加成功')
			}
		});

	}

	let checkeds: OptionInterface[] = [{ value: "submited", name: '提交', checked: true }]
	let checkList: OptionInterface[] = [
		{ value: "submited", name: '提交', checked: false },
		{ value: "published", name: '发布', checked: false },
		{ value: "deleted", name: '删除', checked: false },
	]
	return (
		<form onSubmit={event => handleSubmit(event)} method='post'>
			<div className="field">
				<label className="label">用户名</label>
				<div className="control is-expanded has-icons-left has-icons-right">
					<input className="input" type="text" id="username" placeholder="Username" />
					<span className="icon is-small is-left">
						<i className="fas fa-user"></i>
					</span>
					<span className="icon is-small is-right">
						<i className="fas fa-check"></i>
					</span>
				</div>
			</div>

			<div className="field">
				<label className="label">密码</label>
				<div className="control is-expanded has-icons-left has-icons-right">
					<input className="input" type="text" id="password" placeholder="password" />
					<span className="icon is-small is-left">
						<i className="fas fa-lock"></i>
					</span>
					<span className="icon is-small is-right">
						<i className="fas fa-check"></i>
					</span>
				</div>
			</div>

			<FromCheckbox label="角色" id="roles"
				checkeds={checkeds}
				checkList={checkList}
				is=""
				help=""
			/>

			<div className="field is-grouped">
				<div className="control">
					<button type="submit" className="button is-primary">Submit</button>
				</div>
			</div>
		</form>
	);
}