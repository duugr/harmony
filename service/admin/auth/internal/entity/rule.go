package entity

import (
	"database/sql"
	"fmt"

	"iering.com/Harmony/service/utils"
)

const (
	AdminRuleTable = `admin_rules`
)

type (
	AdminRuleObject struct {
		AdminRuleId       int64          `json:"adminRuleId,omitempty" db:"admin_rule_id"`
		AdminRuleTitle    string         `json:"adminRuleTitle,omitempty" db:"admin_rule_title"`
		AdminRulePid      string         `json:"adminRulePid,omitempty" db:"admin_rule_pid"`
		AdminRuleLink     string         `json:"adminRuleLink,omitempty" db:"admin_rule_link"`
		AdminRuleIcon     string         `json:"adminRuleIcon,omitempty" db:"admin_rule_icon"`
		AdminRuleType     string         `json:"adminRuleType,omitempty" db:"admin_rule_type"`
		AdminRuleActive   string         `json:"adminRuleActive,omitempty" db:"admin_rule_active"`
		AdminRuleSequence string         `json:"adminRuleSequence,omitempty" db:"admin_rule_sequence"`
		CreatedAt         string         `json:"createdAt,omitempty" db:"created_at"`
		UpdatedAt         sql.NullString `json:"updatedAt,omitempty" db:"updated_at"`
		DeletedAt         sql.NullString `json:"deletedAt,omitempty" db:"deleted_at"`
	}
)

func GetRule(ruleId int64) (rule AdminRuleObject) {
	field := "*"
	where := "admin_rule_id=?"

	sql := utils.DbSqlDeleted(field, AdminRuleTable, where, "admin_rule_id", "ASC", 1, 0)

	err := utils.DbGet(&rule, sql, ruleId)

	if err != nil {
		utils.Sugar.Errorf("没有找到，%v", err)
	}
	return
}

func GetRuleAllByPid(pid int64) (rules []AdminRuleObject) {
	var sqlString string = "SELECT * FROM %s WHERE deleted_at IS NULL AND admin_rule_pid = ?"
	sql := fmt.Sprintf(sqlString, AdminRuleTable)

	err := utils.DbSelect(&rules, sql, pid)
	if err != nil {
		utils.Sugar.Errorf("查询出错，%v", err)
	}
	return
}

func GetRuleAll() (rules []AdminRuleObject) {
	var sqlString string = "SELECT * FROM %s WHERE deleted_at IS NULL"
	sql := fmt.Sprintf(sqlString, AdminRuleTable)

	err := utils.DbSelect(&rules, sql)
	if err != nil {
		utils.Sugar.Errorf("查询出错，%v", err)
	}
	return
}

// 按选项查询集合
// offset 跳过
// limit 读取数量
// field  排序字段
// sort  排序   DESC 倒叙 ， ASC 正序
func GetRules(offset, limit int64, sortField, sort string) (rules []AdminRuleObject) {
	field := "*"
	where := "admin_rule_id>0"
	sql := utils.DbSqlDeleted(field, AdminRuleTable, where, sortField, sort, limit, offset)

	err := utils.DbSelect(&rules, sql)
	if err != nil {
		utils.Sugar.Errorf("查询出错，%v", err)
	}
	return
}

func GetRuleCount() int64 {
	var total int64 = 0

	field := "count(1) as total"
	where := "admin_rule_id>0"

	sql := utils.DbSqlDeleted(field, AdminRuleTable, where, "admin_rule_id", "ASC", 1, 0)

	err := utils.DbGet(&total, sql)

	if err != nil {
		utils.Sugar.Errorf("没有找到，%v", err)
	}

	return total
}

func InsertAdminRule(rul AdminRuleObject) int64 {
	// rul.Roles = ""

	return utils.DbNamedInsert(fmt.Sprintf(`INSERT INTO %s
		SET admin_rule_title=:admin_rule_title,
			admin_rule_pid=:admin_rule_pid,
			admin_rule_link=:admin_rule_link,
			admin_rule_icon=:admin_rule_icon,
			admin_rule_type=:admin_rule_type,
			admin_rule_active=:admin_rule_active,
			admin_rule_sequence=:admin_rule_sequence`, AdminRuleTable), rul)
}
