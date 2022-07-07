package handler

import (
	"net/http"

	"github.com/duugr/harmony/service/admin/auth/internal/entity"
	"github.com/duugr/harmony/service/admin/auth/internal/logic"
	"github.com/duugr/harmony/service/utils"
)

func AdminUserList(w http.ResponseWriter, r *http.Request) {
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

	err, data := logic.AdminUserList(page)

	if err != nil {
		utils.Sugar.Error(err)
		working.SetMessage(err.Error())
		return
	}

	working.SetData(data)
}

func AdminUserCreate(w http.ResponseWriter, r *http.Request) {
	working := utils.WorkNew(w, r)
	defer working.WriteJson()
	if working.CheckAuth() {
		return
	}

	var user entity.AdminUserObject
	err := working.GetJson(&user)
	if err != nil {
		utils.Sugar.Error(err)
		working.SetMessage("传入参数错误")
		return
	}

	err = logic.AdminUserCreate(user)

	if err != nil {
		utils.Sugar.Error(err)
		working.SetMessage(err.Error())
		return
	}

}
