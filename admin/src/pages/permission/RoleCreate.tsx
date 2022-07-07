import Notiflix from "notiflix";
import React from "react";
import { Rest } from "../../services/Rest.Services";
import { UrlService } from "../../services/Url.Services";

export function RoleCreate() {

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		Rest.post(UrlService.role.create, {
			"adminRoleName": event.currentTarget.roleName.value,
			"adminRoleDescription": event.currentTarget.description.value,
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
			<div className="field">
				<label className="label">角色名称</label>
				<div className="control is-expanded has-icons-left has-icons-right">
					<input className="input" type="text" id="roleName" placeholder="role name" />
					<span className="icon is-small is-left">
						<i className="fas fa-user"></i>
					</span>
					<span className="icon is-small is-right">
						<i className="fas fa-check"></i>
					</span>
				</div>
			</div>

			<div className="field">
				<label className="label">对角色的描述</label>
				<div className="control is-expanded has-icons-left has-icons-right">
					<input className="input" type="text" id="description" placeholder="description" />
					<span className="icon is-small is-left">
						<i className="fas fa-lock"></i>
					</span>
					<span className="icon is-small is-right">
						<i className="fas fa-check"></i>
					</span>
				</div>
			</div>

			<div className="field is-grouped">
				<div className="control">
					<button type="submit" className="button is-primary">Submit</button>
				</div>
			</div>
		</form>
	);
}