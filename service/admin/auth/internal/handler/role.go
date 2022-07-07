package handler

import (
	"net/http"

	"iering.com/Harmony/service/admin/auth/internal/entity"
	"iering.com/Harmony/service/admin/auth/internal/logic"
	"iering.com/Harmony/service/utils"
)

func AdminRoleList(w http.ResponseWriter, r *http.Request) {
	working := utils.WorkNew(w, r)
	defer working.WriteJson()
	if working.CheckAuth() {
		return
	}

	var page logic.Page
	err := working.GetJson(&page)
	if err != nil {
		utils.Sugar.Error(err)
		working.SetMessage("传入参数错误")
		return
	}

	err, data := logic.AdminRoleList(page)

	if err != nil {
		utils.Sugar.Error(err)
		working.SetMessage(err.Error())
		return
	}

	working.SetData(data)
}

func AdminRoleCreate(w http.ResponseWriter, r *http.Request) {
	working := utils.WorkNew(w, r)
	defer working.WriteJson()
	if working.CheckAuth() {
		return
	}

	var user entity.AdminRoleObject
	err := working.GetJson(&user)
	if err != nil {
		utils.Sugar.Error(err)
		working.SetMessage("传入参数错误")
		return
	}

	err = logic.AdminRoleCreate(user)

	if err != nil {
		utils.Sugar.Error(err)
		working.SetMessage(err.Error())
		return
	}
}

func AdminRoleRuleList(w http.ResponseWriter, r *http.Request) {
	working := utils.WorkNew(w, r)
	defer working.WriteJson()
	if working.CheckAuth() {
		return
	}

	roleId := working.GetInt64("roleId")
	if roleId <= 0 {
		working.SetMessage("传入参数错误")
		return
	}

	err, data := logic.AdminRoleRuleList(roleId)

	if err != nil {
		utils.Sugar.Error(err)
		working.SetMessage(err.Error())
		return
	}

	working.SetData(data)
}

func AdminRoleAll(w http.ResponseWriter, r *http.Request) {
	working := utils.WorkNew(w, r)
	defer working.WriteJson()
	if working.CheckAuth() {
		return
	}

	err, data := logic.AdminRoleAll()

	if err != nil {
		utils.Sugar.Error(err)
		working.SetMessage(err.Error())
		return
	}

	working.SetData(data)
}
