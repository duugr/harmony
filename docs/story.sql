
DROP TABLE IF EXISTS `admin_users`;
CREATE TABLE `admin_users` (
  `admin_user_id` int AUTO_INCREMENT,
  `admin_user_name` varchar(255) NULL DEFAULT '',
  `admin_user_roles` varchar(255) NULL DEFAULT '',
  `admin_user_password` varchar(255) NULL DEFAULT '',
  `created_at` datetime NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`admin_user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
DROP TABLE IF EXISTS `admin_roles`;
CREATE TABLE `admin_roles` (
  `admin_role_id` int NOT NULL AUTO_INCREMENT,
  `admin_role_name` varchar(255) NOT NULL DEFAULT '',
  `admin_role_description` varchar(255) NOT NULL DEFAULT '',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL,
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
  `deleted_at` datetime DEFAULT NULL,
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
DROP TABLE IF EXISTS `bank_prcptcds`;

DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `product_name` varchar(255) NOT NULL,
  `product_code` varchar(255) NOT NULL COMMENT '编号',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`product_id`),
  KEY `index_code` (`product_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='产品表';
DROP TABLE IF EXISTS `product_stories`;
CREATE TABLE `product_stories` (
  `product_story_id` int NOT NULL AUTO_INCREMENT,
  `product_story_name` varchar(255) NOT NULL,
  `product_story_code` varchar(255) NOT NULL COMMENT '编号',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`product_story_id`),
  KEY `index_code` (`product_story_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='产品故事表';
