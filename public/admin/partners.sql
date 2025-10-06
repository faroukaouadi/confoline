-- Create database (optional)
-- CREATE DATABASE IF NOT EXISTS `confoline` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
-- USE `confoline`;

CREATE TABLE IF NOT EXISTS `partners` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(150) NOT NULL,
  `src` VARCHAR(255) NOT NULL,
  `link` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Seed with existing static entries (optional)
INSERT INTO `partners` (`name`, `src`, `link`) VALUES
('opentext', '/images/partners/opentextWHITE.svg', 'https://www.opentext.com/'),
('newrelic', '/images/partners/newrelicWHITE.svg', 'https://newrelic.com/'),
('elastic', '/images/partners/elasticWHITE.svg', 'https://www.elastic.co/'),
('tricentis', '/images/partners/tricentisWHITE.svg', 'https://www.tricentis.com/'),
('zabbix', '/images/partners/zabbixWHITE.svg', 'https://www.zabbix.com/'),
('gitLab', '/images/partners/gitLabWHITE.svg', 'https://about.gitlab.com/'),
('splunk', '/images/partners/splunkWHITE.svg', 'https://www.splunk.com/'),
('keysight', '/images/partners/keysightWHITE.svg', 'https://www.keysight.com/'),
('ibm', '/images/partners/ibmWHITE.svg', 'https://www.ibm.com/');


