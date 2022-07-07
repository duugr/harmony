-- -------------------------------------------------------------
-- TablePlus 3.11.0(352)
--
-- https://tableplus.com/
--
-- Database: books
-- Generation Time: 2022-02-11 18:00:45.7960
-- -------------------------------------------------------------


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


DROP TABLE IF EXISTS `book`;
CREATE TABLE `book` (
  `uuid` varchar(255) NULL DEFAULT '',
  `title` varchar(255) NULL DEFAULT '',
  `author` varchar(255) NULL DEFAULT '',
  `state` varchar(255) NULL DEFAULT '',
  `description` varchar(255) NULL DEFAULT '',
  `creation_start_date` date DEFAULT NULL,
  `creation_end_date` date DEFAULT NULL,
  `publisher` varchar(255) NULL DEFAULT '',
  `published_date` datetime DEFAULT NULL,
  `like` bigint NULL DEFAULT '0',
  `click` bigint NULL DEFAULT '0',
  `recommend` int NULL DEFAULT '0',
  `created_at` datetime NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL,
  UNIQUE KEY `uuid` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `book_tag`;
CREATE TABLE `book_tag` (
  `book_uuid` varchar(255) CHARACTER SET utf8mb4 NULL,
  `tag_uuid` varchar(255) CHARACTER SET utf8mb4 NULL,
  UNIQUE KEY `book_tag_uuid` (`book_uuid`,`tag_uuid`),
  KEY `book_uuid` (`book_uuid`),
  KEY `tag_uuid` (`tag_uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `chapter`;
CREATE TABLE `chapter` (
  `uuid` varchar(255) NULL DEFAULT '',
  `book_uuid` varchar(255) NULL DEFAULT '',
  `title` varchar(255) NULL DEFAULT '',
  `publisher` varchar(255) NULL DEFAULT '',
  `content` longtext NULL,
  `created_at` datetime NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL,
  `chapter` int NULL DEFAULT '0',
  `language` varchar(255) NULL DEFAULT '',
  `like` bigint NULL DEFAULT '0',
  `click` bigint NULL DEFAULT '0',
  `recommend` int NULL DEFAULT '0',
  UNIQUE KEY `uuid` (`uuid`),
  KEY `book_uuid` (`book_uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `chapter_tag`;
CREATE TABLE `chapter_tag` (
  `chapter_uuid` varchar(255) CHARACTER SET utf8mb4 NULL,
  `tag_uuid` varchar(255) CHARACTER SET utf8mb4 NULL,
  UNIQUE KEY `chapter_tag_uuid` (`chapter_uuid`,`tag_uuid`),
  KEY `chapter_uuid` (`chapter_uuid`),
  KEY `tag_uuid` (`tag_uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments` (
  `uuid` varchar(255) CHARACTER SET utf8mb4 NULL,
  `book_uuid` varchar(255) CHARACTER SET utf8mb4 NULL,
  `chapter_uuid` varchar(255) CHARACTER SET utf8mb4 NULL,
  `author` varchar(255) NULL DEFAULT '',
  `text` longtext CHARACTER SET utf8mb4 NULL,
  `email` varchar(255) NULL DEFAULT '',
  `created_at` datetime NULL DEFAULT CURRENT_TIMESTAMP,
  `state` varchar(255) CHARACTER SET utf8mb4 NULL DEFAULT 'submitted',
  `like` bigint NULL DEFAULT '0',
  `click` bigint NULL DEFAULT '0',
  `recommend` int NULL DEFAULT '0',
  UNIQUE KEY `uuid` (`uuid`),
  KEY `book_uuid` (`book_uuid`),
  KEY `chapter_uuid` (`chapter_uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `tag`;
CREATE TABLE `tag` (
  `uuid` varchar(255) CHARACTER SET utf8mb4 NULL,
  `name` varchar(255) NULL DEFAULT '',
  `created_at` datetime NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL,
  `hot` int NULL DEFAULT '0',
  UNIQUE KEY `uuid` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `admin_users`;
CREATE TABLE `admin_users` (
  `admin_user_id` int AUTO_INCREMENT,
  `admin_user_username` varchar(180) NULL DEFAULT '',
  `admin_user_roles` varchar(255) NULL DEFAULT '',
  `admin_user_password` varchar(255) NULL DEFAULT '',
  `created_at` datetime NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`admin_user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
DROP TABLE IF EXISTS `admin_roles`;
CREATE TABLE `admin_roles` (
  `admin_role_id` int NOT NULL AUTO_INCREMENT,
  `admin_role_name` varchar(255) NOT NULL DEFAULT '',
  `admin_role_description` varchar(255) NOT NULL DEFAULT '',
  `admin_role_state` varchar(255) NOT NULL DEFAULT '',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`admin_role_id`),
  UNIQUE KEY `name` (`admin_role_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `admin_role_rules`;
CREATE TABLE `admin_role_rules` (
	`admin_role_id` int unsigned NOT NULL DEFAULT 0,
	`admin_rule_id` int unsigned NOT NULL DEFAULT 0,
  UNIQUE KEY `uni_role_rule_id` (`admin_role_id`,`admin_rule_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `admin_rules`;
CREATE TABLE `admin_rules` (
  `admin_rule_id` int NOT NULL AUTO_INCREMENT,
  `admin_rule_pid` int NOT NULL DEFAULT '0',
  `admin_rule_title` varchar(255) NOT NULL DEFAULT '',
  `admin_rule_link` varchar(255) NOT NULL DEFAULT '',
  `admin_rule_icon` varchar(255) NOT NULL DEFAULT '',
  `admin_rule_type` varchar(255) NOT NULL DEFAULT '',
  `admin_rule_active` varchar(255) NOT NULL DEFAULT '',
  `admin_rule_sequence` int NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`admin_rule_id`),
  KEY `pid` (`admin_rule_pid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `configs`;
CREATE TABLE `configs` (
  `config_id` int unsigned NOT NULL AUTO_INCREMENT,
  `config_type` varchar(255) DEFAULT NULL,
  `config_name` varchar(255) NOT NULL DEFAULT '' COMMENT '分类名称',
  `config_value` text,
  `config_title` varchar(255) DEFAULT NULL,
  `created_at` datetime NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`config_id`) USING BTREE,
  KEY `name` (`config_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='配置信息';

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `user_id` int AUTO_INCREMENT,
  `user_name` varchar(255) NULL COMMENT '',
  `user_avatar` varchar(255) NULL COMMENT '',
  `user_nick_name` varchar(255) NULL COMMENT '',
  `user_password` varchar(255) NULL COMMENT '',
  `user_account_amount` decimal(15,2) COMMENT '账户金额',
  `created_at` datetime NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `UNIQ_USERNAME` (`user_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
DROP TABLE IF EXISTS `user_accounts`;
CREATE TABLE `user_accounts` (
  `user_account_id` int AUTO_INCREMENT,
  `user_account_user_id` int NOT NULL,
  `user_account_before` decimal(15,2) NULL COMMENT '变更前金额',
  `user_account_change` decimal(15,2) NULL COMMENT '变更金额',
  `user_account_after` decimal(15,2) NULL COMMENT '变更后金额',
  `user_account_remark` varchar(255) NULL COMMENT '变更说明',
  `user_account_table` varchar(255) NULL COMMENT '变更对应的表',
  `user_account_table_id` bigint NULL COMMENT '变更对应表的ID',
  `created_at` datetime NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_account_id`),
  KEY `user_id` (`user_account_user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `user_auths`;
CREATE TABLE `user_auths` (
  `user_auth_id` int AUTO_INCREMENT,
  `user_auth_user_id` int NOT NULL,
  `user_auth_type` varchar(255) NULL DEFAULT '' COMMENT 'personal, company',
  `user_auth_state` varchar(255) NULL DEFAULT '' COMMENT 'pass, fail',
  `user_auth_method` varchar(255) NULL DEFAULT '' COMMENT 'API认证, person本站, face人脸核身',
  `user_auth_identity_number` varchar(255) DEFAULT NULL COMMENT '身份证号',
  `user_auth_unified_social` varchar(255) DEFAULT NULL COMMENT '统一社会信用代码',
  `user_auth_front_photo` varchar(255) DEFAULT NULL COMMENT '正面照',
  `user_auth_back_photo` varchar(255) DEFAULT NULL COMMENT '背面照',
  `user_auth_hand_photo` text COMMENT '手持照片',
  `user_auth_unified_social_photo` varchar(255) DEFAULT NULL COMMENT '营业执照照片',
  `user_auth_company_name` varchar(255) DEFAULT NULL COMMENT '企业名称',
  `user_auth_remarks` varchar(255) NOT NULL DEFAULT '',

  `created_at` datetime NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`user_auth_id`),
  KEY `user_auth_user_id` (`user_auth_user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `user_banks`;
CREATE TABLE `user_banks` (
  `user_bank_id` int NOT NULL AUTO_INCREMENT,
  `user_bank_user_id` int NOT NULL,
  `user_bank_name` varchar(255) NOT NULL,
  `user_bank_accounts` varchar(255) NOT NULL,
  `user_bank_user` varchar(255) NOT NULL,
  `user_bank_bankid` int NOT NULL DEFAULT '0' COMMENT '-1支付宝 -2微信',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`user_bank_id`),
  UNIQUE KEY `user_bank_name` (`user_bank_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `banks`;
CREATE TABLE `banks` (
  `bank_id` int NOT NULL AUTO_INCREMENT,
  `bank_abbr` varchar(255) DEFAULT NULL,
  `bank_state` int NOT NULL DEFAULT '1',
  `bank_bankname` varchar(255) DEFAULT NULL,
  `bank_logo` varchar(255) DEFAULT NULL,
  `bank_logo1` varchar(255) DEFAULT NULL,
  `bank_procode` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`bank_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='银行';
DROP TABLE IF EXISTS `bank_prcptcds`;
CREATE TABLE `bank_prcptcds` (
  `bank_prcptcd_id` int NOT NULL AUTO_INCREMENT,
  `bank_prcptcd_bankname` varchar(255) NOT NULL,
  `bank_prcptcd_bank_code` varchar(255) NOT NULL COMMENT '银行编号',
  `bank_prcptcd_prcptcd` varchar(255) NOT NULL COMMENT '行号',
  `bank_prcptcd_city_code` varchar(255) DEFAULT NULL COMMENT '所属地区编号',
  `bank_prcptcd_province` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`bank_prcptcd_id`),
  KEY `index_code` (`bank_prcptcd_bank_code`,`bank_prcptcd_city_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='银行行号表';

DROP TABLE IF EXISTS `card_services`;
CREATE TABLE `card_services` (
  `card_service_id` int unsigned NOT NULL AUTO_INCREMENT,
  `card_service_name` varchar(255)  DEFAULT NULL COMMENT '标题',
  `card_service_class_name` varchar(255)  DEFAULT NULL COMMENT '类名',
  `card_service_content` text ,
  `card_service_fields` text ,
  `card_service_status` varchar(255) NOT NULL DEFAULT 'enable' COMMENT '状态: enable 启用, disable 停用',
  `card_service_load` varchar(255) NOT NULL DEFAULT 'go' COMMENT 'go不等待, wait可等待',
  `card_service_install` varchar(255) NULL DEFAULT 'installed' COMMENT 'not未安装, installed已安装, missing已安装文件丢失',
  `card_service_type` varchar(255) NULL DEFAULT 'card' COMMENT 'card卡类接口,bank银行接口,recharge充值接口, bill话单接口, recharge_api充值API',
  `card_service_url` varchar(255)  DEFAULT NULL,
  `card_service_qq` varchar(255)  DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`card_service_id`) USING BTREE,
  KEY `install` (`card_service_install`),
  KEY `status` (`card_service_status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='接口服务商';

DROP TABLE IF EXISTS `card_lists`;
CREATE TABLE `card_lists` (
  `card_list_id` int unsigned NOT NULL AUTO_INCREMENT,
  `card_list_category` varchar(255) NULL DEFAULT '' COMMENT '分类',
  `card_list_channel` varchar(255) DEFAULT NULL COMMENT '通道',
  `card_list_channel_number` varchar(255) DEFAULT NULL COMMENT '通道代码',
  `card_list_class` varchar(255) DEFAULT NULL,
  `card_list_title` varchar(255) NOT NULL DEFAULT '' COMMENT '标题',
  `card_list_iconurl` varchar(255) DEFAULT NULL COMMENT '点卡图标',
  `card_list_icon` varchar(255) DEFAULT NULL COMMENT '点卡图标',

  `card_list_is_batch` varchar(255) NULL DEFAULT 'not' COMMENT '是否可以批量提交卡密,yes是,not不',
  `card_list_is_single` varchar(255) NULL DEFAULT 'not' COMMENT '是否可以单张提交卡密,yes是,not不',
  `card_list_is_photo` varchar(255) NULL DEFAULT 'not' COMMENT 'not不提交图片, code二维码, photo实体图',
  `card_list_status` varchar(255) NOT NULL DEFAULT 'enable' COMMENT '状态: enable 启用, disable 停用',
  `card_list_regularity` varchar(255) DEFAULT NULL COMMENT '验证规则',

  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`card_list_id`) USING BTREE,
  KEY `category` (`card_list_category`),
  KEY `channel` (`card_list_channel`),
  KEY `channel_number` (`card_list_channel_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='点卡列表';

DROP TABLE IF EXISTS `card_channels`;
CREATE TABLE `card_channels` (
  `card_channel_id` int unsigned NOT NULL AUTO_INCREMENT,
  `card_channel_card_list_id` bigint unsigned NOT NULL DEFAULT '0' COMMENT '对应卡类',
  `card_channel_number` varchar(255) DEFAULT '' COMMENT '通道代码',
  `card_channel_mianzhi` varchar(255) NOT NULL,
  `card_channel_rate` decimal(10,4) NOT NULL DEFAULT '0.0000',
  `card_channel_system_rate` decimal(10,4) NOT NULL DEFAULT '0.0000',

  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`card_channel_id`) USING BTREE,
  KEY `list_id` (`card_channel_card_list_id`),
  KEY `channel_number` (`card_channel_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='通道对应卡列表';

DROP TABLE IF EXISTS `cards`;
CREATE TABLE `cards` (
  `card_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `card_card_list_id` int unsigned NOT NULL DEFAULT '0',
  `card_card_channel_id` int unsigned NOT NULL DEFAULT '0' COMMENT '金额表',
  `card_card_operator_id` int unsigned NOT NULL DEFAULT '0' COMMENT '服务商表',
  `card_scenes` tinyint unsigned NOT NULL DEFAULT '0' COMMENT '环境[10:H5, 20:api]',
  `card_code` int NOT NULL DEFAULT '0' COMMENT '编码[服务商提供不同的编码,用于不同的环境]',
  `card_weight` tinyint unsigned NOT NULL DEFAULT '0' COMMENT '金额在销卡中服务商占比, 权重',
  `card_rate` decimal(10,4) NOT NULL DEFAULT '0.0000',
  `card_system_rate` decimal(10,4) NOT NULL DEFAULT '0.0000',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`card_id`),
  UNIQUE KEY `uni_id` (`card_card_list_id`,`card_card_channel_id`,`card_card_operator_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='卡与卡商多渠道销售配置';

DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `order_uid` int NOT NULL DEFAULT '0' COMMENT '商户ID',
  `order_type` int NOT NULL COMMENT '运营商',
  `order_class` varchar(255) COMMENT '通道',
  `order_number` varchar(255) COMMENT '订单',
  `order_tmporder` varchar(255) DEFAULT '0' COMMENT '来源订单',
  `order_batchno` varchar(255) DEFAULT NULL,
  `order_custom` varchar(255) DEFAULT NULL COMMENT '自定义参数',
  `order_notify` varchar(255) DEFAULT NULL COMMENT '异步通知',
  `order_source` varchar(255) DEFAULT NULL COMMENT '来源网址',
  `order_money` int NOT NULL COMMENT '金额',
  `order_xitmoney` decimal(10,4) NOT NULL DEFAULT '0.0000',
  `order_seccode` varchar(255) DEFAULT '' COMMENT '验证码CVV2码',
  `order_ip` char(20),
  `order_state` int NOT NULL DEFAULT '0' COMMENT '0等待验证1处理中2成功3失败4待审核5超时6待匹配7失败重提8成功面值不符9缓存失败10充值次数过多',
  `order_amount` decimal(10,4) NOT NULL DEFAULT '0.0000' COMMENT '结算金额',
  `order_status` int NOT NULL DEFAULT '0' COMMENT '错误状态码',
  `order_qiang` int NOT NULL DEFAULT '0',
  `order_card_no` varchar(255) COMMENT '卡号',
  `order_card_key` varchar(255) COMMENT '密码',
  `order_settle_amt` decimal(10,4) NOT NULL DEFAULT '0.0000' COMMENT '实际金额',
  `order_remarks` longtext,
  `order_tongzhi` text,
  `order_mcode` varchar(255) DEFAULT NULL,
  `order_chulitime` int DEFAULT NULL,
  `order_profit` decimal(10,4) NOT NULL DEFAULT '0.0000',
  `order_yong` decimal(10,4) NOT NULL DEFAULT '0.0000',
  `order_feilv` decimal(10,4) NOT NULL DEFAULT '0.0000',
  `order_jiajiok` bigint NOT NULL DEFAULT '0',
  `order_restok` bigint NOT NULL DEFAULT '0' COMMENT '0正常1过期卡2面值不符成功卡3错卡',
  `order_ispei` tinyint(1) NOT NULL DEFAULT '0',
  `order_priority` int NOT NULL DEFAULT '8',
  `order_region` char(150) DEFAULT NULL,
  `order_bindid` varchar(255) DEFAULT NULL,
  `order_tc` tinyint(1) NOT NULL DEFAULT '0' COMMENT '1为同程',
  `order_wxtype` tinyint(1) NOT NULL DEFAULT '0',
  `order_uname` char(150) DEFAULT NULL,
  `order_uaccount` varchar(255) DEFAULT NULL,
  `order_source_uid` char(150) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`card_id`),
  UNIQUE KEY `orderno` (`order_number`) USING BTREE,
  KEY `tmporder` (`order_tmporder`),
  KEY `uid` (`order_uid`),
  KEY `card_no` (`order_card_no`),
  KEY `batchno` (`order_batchno`),
  KEY `money` (`order_money`),
  KEY `feilv` (`order_feilv`),
  KEY `card_key` (`order_card_key`) USING BTREE,
  KEY `smog` (`order_state`,`order_money`,`order_class`,`order_chulitime`),
  KEY `sss` (`order_tmporder`,`order_create_time`,`order_id`),
  KEY `bts` (`order_tmporder`,`order_chulitime`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='订单';

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;