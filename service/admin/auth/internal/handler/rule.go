package handler

import (
	"net/http"

	"github.com/duugr/harmony/service/admin/auth/internal/entity"
	"github.com/duugr/harmony/service/admin/auth/internal/logic"
	"github.com/duugr/harmony/service/core/work"
	"github.com/duugr/harmony/service/pkg/zaplog"
)

func AdminRuleList(w http.ResponseWriter, r *http.Request) {
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

	err, data := logic.AdminRuleList(page)

	if err != nil {
		zaplog.Sugar.Error(err)
		working.SetMessage(err.Error())
		return
	}

	working.SetData(data)
}

func AdminRuleCreate(w http.ResponseWriter, r *http.Request) {
	working := work.WorkNew(w, r)
	defer working.WriteJson()
	if working.CheckAuth() {
		return
	}

	var user entity.AdminRuleObject
	err := working.GetJson(&user)
	if err != nil {
		zaplog.Sugar.Error(err)
		working.SetMessage("传入参数错误")
		return
	}

	err = logic.AdminRuleCreate(user)

	if err != nil {
		zaplog.Sugar.Error(err)
		working.SetMessage(err.Error())
		return
	}
}

func AdminRuleAll(w http.ResponseWriter, r *http.Request) {
	working := work.WorkNew(w, r)
	defer working.WriteJson()
	if working.CheckAuth() {
		return
	}

	uuid := working.GetInt64("adminRuleId")

	err, ruleData := logic.AdminRuleAll(uuid)
	if err != nil {
		zaplog.Sugar.Error(err)
		working.SetMessage(err.Error())
		return
	}

	working.SetData(ruleData)
}
