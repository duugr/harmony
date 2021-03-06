package logic

import (
	"errors"

	"github.com/duugr/harmony/service/admin/auth/internal/entity"
	"github.com/duugr/harmony/service/pkg/jwt"
	"golang.org/x/crypto/bcrypt"
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

	is := checkHashPassword(data.Password, userData.AdminUserPassword)
	if !is {
		err = errors.New("用户或密码出错2")
		return
	}

	jwtData.Name = userData.AdminUserName
	jwtData.Token = jwt.GenerateToken(userData.AdminUserId)

	return
}

func HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)

	return string(bytes), err
}

func checkHashPassword(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))

	return err == nil
}
