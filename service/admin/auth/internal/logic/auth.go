package logic

import (
	"errors"

	"github.com/duugr/harmony/service/admin/auth/internal/entity"
	"github.com/duugr/harmony/service/utils"
)

type (
	LoginData struct {
		Username string `json:"username"`
		Password string `json:"password"`
	}
	JwtData struct {
		Name  string
		Token string
	}
)

func LoginVerify(data LoginData) (err error, jwtData JwtData) {

	userData := entity.GetAdminName(data.Username)
	if userData.AdminUserId <= 0 {
		err = errors.New("用户或密码出错1")
		return
	}

	is := utils.CheckHashPassword(data.Password, userData.AdminUserPassword)
	if !is {
		err = errors.New("用户或密码出错2")
		return
	}

	jwtData.Name = userData.AdminUserName
	jwtData.Token = utils.GenerateToken(userData.AdminUserId)

	return
}
