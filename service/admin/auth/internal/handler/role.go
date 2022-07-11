package handler

import (
	"net/http"

	"github.com/duugr/harmony/service/admin/auth/internal/entity"
	"github.com/duugr/harmony/service/admin/auth/internal/logic"
	"github.com/duugr/harmony/service/pkg/work"
	"github.com/duugr/harmony/service/pkg/zaplog"
)

func AdminRoleList(w http.ResponseWriter, r *http.Request) {
	working := work.WorkNew(w, r)
	defer working.WriteJson()
	if working.CheckAuth() {
		return
	}

	var page logic.Page
	err := working.GetJson(&page)
	if err != nil {
		zaplog.Sugar.Error(err)
		working.SetMessage("传入参数错误")
		return
	}

	err, data := logic.AdminRoleList(page)

	if err != nil {
		zaplog.Sugar.Error(err)
		working.SetMessage(err.Error())
		return
	}

	working.SetData(data)
}

func AdminRoleCreate(w http.ResponseWriter, r *http.Request) {
	working := work.WorkNew(w, r)
	defer working.WriteJson()
	if working.CheckAuth() {
		return
	}

	var user entity.AdminRoleObject
	err := working.GetJson(&user)
	if err != nil {
		zaplog.Sugar.Error(err)
		working.SetMessage("传入参数错误")
		return
	}

	err = logic.AdminRoleCreate(user)

	if err != nil {
		zaplog.Sugar.Error(err)
		working.SetMessage(err.Error())
		return
	}
}

func AdminRoleRuleList(w http.ResponseWriter, r *http.Request) {
	working := work.WorkNew(w, r)
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
		zaplog.Sugar.Error(err)
		working.SetMessage(err.Error())
		return
	}

	working.SetData(data)
}

func AdminRoleAll(w http.ResponseWriter, r *http.Request) {
	working := work.WorkNew(w, r)
	defer working.WriteJson()
	if working.CheckAuth() {
		return
	}

	err, data := logic.AdminRoleAll()

	if err != nil {
		zaplog.Sugar.Error(err)
		working.SetMessage(err.Error())
		return
	}

	working.SetData(data)
}

func AdminRoleSaveRule(w http.ResponseWriter, r *http.Request) {
	working := work.WorkNew(w, r)
	defer working.WriteJson()
	if working.CheckAuth() {
		return
	}

	var roleRule entity.AdminRoleRuleObject
	err := working.GetJson(&roleRule)
	if err != nil {
		zaplog.Sugar.Error(err)
		working.SetMessage("传入参数错误")
		return
	}

	err = logic.AdminRoleSaveRule(roleRule)

	if err != nil {
		zaplog.Sugar.Error(err)
		working.SetMessage(err.Error())
		return
	}
	working.SetMessage("设置成功")
}
