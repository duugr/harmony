package utils

import (
	"fmt"
	"math/rand"
	"os"
	"strconv"
	"strings"
	"time"
)

/**
 * 时间差
 */
func LeftTime(dateInt int64) int {
	objTime := time.Unix(dateInt, 0)

	return int(objTime.Sub(time.Now()).Seconds())
}

/**
 * 时间戳 转为 日期
 */
func FormatTime(dateInt int64) string {
	objTime := time.Unix(dateInt, 0)

	return objTime.Format(os.Getenv("YMDHI"))
}

/**
 * 时间戳 转为 日期
 */
func FormatDate(dateInt int64, dateType string) string {
	objTime := time.Unix(dateInt, 0)

	return objTime.Format(dateType)
}

/**
 * 时间戳 转为 日期
 */
func FormatTimeByString(dateStr string) string {
	objTime, err := time.Parse(os.Getenv("YMDHIS"), dateStr)
	if err != nil {
		return ""
	}

	return objTime.Format(os.Getenv("YMDHI"))
}

/**
 * 日期 转为 时间戳
 */
func FormatStringToTime(dateStr string) int64 {
	local, _ := time.LoadLocation("Local")
	objTime, err := time.ParseInLocation(os.Getenv("YMDHIS"), dateStr, local)
	if err != nil {
		return 0
	}

	return objTime.Unix()
}

/**
 * 日期 转为 时间戳
 */
func FormatDateStringToTime(dateStr string) int64 {
	local, _ := time.LoadLocation("Local")
	objTime, err := time.ParseInLocation(os.Getenv("YMD"), dateStr, local)
	if err != nil {
		return 0
	}

	return objTime.Unix()
}

/**
 * 反回固定长度字符串
 * @param  {[type]} str interface{} 原字符串
 * @param  {[type]} len int         需要返回的长度
 * @param  {[type]} pad string      填充的字符
 * @return {[type]} string          返回字符串
 */
func PadLeft(str int, oringLen int, pad string) string {
	strLen := len(strconv.Itoa(str))
	if strLen < oringLen {
		return fmt.Sprintf("%s%d", strings.Repeat(pad, oringLen-strLen), str)
	}
	return fmt.Sprintf("%#v", str)
}

func RandString(n int) string {
	const letterBytes = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
	const (
		letterIdxBits = 6                    // 6 bits to represent a letter index
		letterIdxMask = 1<<letterIdxBits - 1 // All 1-bits, as many as letterIdxBits
		letterIdxMax  = 63 / letterIdxBits   // # of letter indices fitting in 63 bits
	)
	var src = rand.NewSource(time.Now().UnixNano())
	b := make([]byte, n)
	// A src.Int63() generates 63 random bits, enough for letterIdxMax characters!
	for i, cache, remain := n-1, src.Int63(), letterIdxMax; i >= 0; {
		if remain == 0 {
			cache, remain = src.Int63(), letterIdxMax
		}
		if idx := int(cache & letterIdxMask); idx < len(letterBytes) {
			b[i] = letterBytes[idx]
			i--
		}
		cache >>= letterIdxBits
		remain--
	}
	return string(b)
}

/**
 * 随机字符串 --- 数字
 */
func RandInt(length int) string {
	r := rand.New(rand.NewSource(time.Now().Unix()))

	bytes := make([]byte, length)
	for i := 0; i < length; i++ {
		bytes[i] = byte(r.Intn(10))
	}

	return string(bytes)
}
