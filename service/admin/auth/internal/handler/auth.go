package handler

import (
	"net/http"

	"iering.com/Harmony/service/admin/auth/internal/logic"
	"iering.com/Harmony/service/utils"
)

func AuthLogin(w http.ResponseWriter, r *http.Request) {
	working := utils.WorkNew(w, r)
	defer working.WriteJson()

	var userForm logic.LoginData
	err := working.GetJson(&userForm)

	if err != nil {
		utils.Sugar.Error(err)
		working.SetMessage("传入参数错误")
		return
	}

	err, data := logic.LoginVerify(userForm)

	if err != nil {
		utils.Sugar.Error(err)
		utils.Sugar.Error(utils.HashPassword(userForm.Password))
		working.SetMessage(err.Error())
		return
	}

	working.SetData(data)
}
