package handler

import (
	"net/http"

	"iering.com/Harmony/service/admin/auth/internal/entity"
	"iering.com/Harmony/service/admin/auth/internal/logic"
	"iering.com/Harmony/service/utils"
)

func AdminRuleList(w http.ResponseWriter, r *http.Request) {
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

	err, data := logic.AdminRuleList(page)

	if err != nil {
		utils.Sugar.Error(err)
		working.SetMessage(err.Error())
		return
	}

	working.SetData(data)
}

func AdminRuleCreate(w http.ResponseWriter, r *http.Request) {
	working := utils.WorkNew(w, r)
	defer working.WriteJson()
	if working.CheckAuth() {
		return
	}

	var user entity.AdminRuleObject
	err := working.GetJson(&user)
	if err != nil {
		utils.Sugar.Error(err)
		working.SetMessage("传入参数错误")
		return
	}

	err = logic.AdminRuleCreate(user)

	if err != nil {
		utils.Sugar.Error(err)
		working.SetMessage(err.Error())
		return
	}
}

func AdminRuleAll(w http.ResponseWriter, r *http.Request) {
	working := utils.WorkNew(w, r)
	defer working.WriteJson()
	if working.CheckAuth() {
		return
	}

	uuid := working.GetInt64("adminRuleId")

	err, ruleData := logic.AdminRuleAll(uuid)
	if err != nil {
		utils.Sugar.Error(err)
		working.SetMessage(err.Error())
		return
	}

	working.SetData(ruleData)
}
