package utils

import (
	"encoding/base64"
	"encoding/json"
	"errors"
	"os"
	"time"
)

type (
	Algorithm struct {
		/**
		 * jti(JWT ID)
		 * 签发jwt时给予当前token的唯一ID，通常用于一次性消费的token。
		 */
		Jti int64 `json:"jti"`

		/**
		 * iss(Issuer) jwt的颁发者，其值应为大小写敏感的字符串或Uri。
		**/
		Iss string `json:"iss"`
		/**
		 * aud(Audience)
		 * jwt的适用对象，其值应为大小写敏感的字符串或Uri。一般可以为特定的App、服务或模块。
		 * 比如我们颁发了一个jwt给一个叫”JsonWebToken”的app使用，sub可以是这个app的包签名或者标识。
		 * 服务器端的安全策略在签发时和验证时，aud必须是一致的。
		**/
		Aud string `json:"aud"`

		/**
		 * sub(Subject)
		 * jwt 的所有者，可以是用户ID、唯一标识。
		**/
		Sub interface{} `json:"sub"`

		/**
		 * iat(Issued At)
		 * jwt的签发时间。同exp一样，需为可以解析成时间的数字类型。
		 */
		Iat int64 `json:"iat"` /** 发布时间 **/
		/**
		 * exp(Expiration Time)
		 * jwt的过期时间，必须是可以解析为时间/时间戳的数字类型。服务器端在验证当前时间大于过期时间时，应当验证不予通过。
		 */
		Exp time.Time `json:"exp"`
		/**
		 * nbf(Not Before)
		 * 表示jwt在这个时间后启用。同exp一样，需为可以解析成时间的数字类型。
		 * 在此之前不可用, 表示 JWT Token 在这个时间之前是无效的
		 */
		Nbf time.Time `json:"nbf"`
	}
)

func newJWT(exp int64, iss, aud string) *Algorithm {
	expTime := time.Duration(exp) * time.Hour
	return &Algorithm{
		Iss: iss,
		Aud: aud,
		Nbf: time.Now(),
		Iat: time.Now().Unix(),
		Exp: time.Now().Add(expTime),
		Jti: IdInt64(),
	}
}

func GenerateToken(data interface{}) string {
	exp := StrToInt64(os.Getenv("APP_TOKEN_EXPIRED"))
	iss := os.Getenv("APP_NAME")
	aud := os.Getenv("APP_SUB")
	a := newJWT(exp, iss, aud)
	a.Sub = data

	token, err := a.encode()
	if err != nil {
		return ""
	}

	return token
}

func DecodeToken(token string, data *Algorithm) (err error) {
	dd, err := base64.RawURLEncoding.DecodeString(token)
	if err != nil {
		err = errors.New("invalid signature")
		return
	}

	de, err := RsaDecrypt(dd)
	if err != nil {
		err = errors.New("invalid signature")
		return
	}

	return json.Unmarshal(de, &data)
}

func ValidateToken(token string) (err error) {
	var a Algorithm
	err = DecodeToken(token, &a)
	if err != nil {
		err = errors.New("decode error")
		return
	}

	if err = a.validateExp(); err != nil {
		err = errors.New("failed to validate exp" + err.Error())
		return
	}

	if err = a.validateNbf(); err != nil {
		err = errors.New("failed to validate nbf" + err.Error())
	}

	return nil
}

func (a *Algorithm) encode() (token string, err error) {
	orig, err := json.Marshal(a)
	if err != nil {
		err = errors.New("unable to marshal payload" + err.Error())
		return
	}

	byteToken, err := RsaEncrypt(orig)
	if err != nil {
		err = errors.New("rsa encrypt encode " + err.Error())
		return
	}

	token = base64.RawURLEncoding.EncodeToString(byteToken)

	return
}

func (a *Algorithm) validateExp() error {
	if a.Exp.Before(time.Now()) {
		return errors.New("token has expired")
	}

	return nil
}

func (a *Algorithm) validateNbf() error {
	if a.Nbf.After(time.Now()) {
		return errors.New("token is invalid")
	}

	return nil
}
