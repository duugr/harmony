package handler

import (
	"net/http"

	"github.com/duugr/harmony/service/admin/auth/internal/logic"
	"github.com/duugr/harmony/service/pkg/work"
	"github.com/duugr/harmony/service/pkg/zaplog"
)

func AuthLogin(w http.ResponseWriter, r *http.Request) {
	working := work.WorkNew(w, r)
	defer working.WriteJson()

	var userForm logic.LoginData
	err := working.GetJson(&userForm)

	if err != nil {
		zaplog.Sugar.Error(err)
		working.SetMessage("传入参数错误")
		return
	}

	err, data := logic.LoginVerify(userForm)

	if err != nil {
		zaplog.Sugar.Error(err)
		zaplog.Sugar.Error(logic.HashPassword(userForm.Password))
		working.SetMessage(err.Error())
		return
	}

	working.SetData(data)
}
