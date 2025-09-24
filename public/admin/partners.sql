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
('opentext', '/images/opentext.png', 'https://www.opentext.com/'),
('newrelic', '/images/newrelic.png', 'https://newrelic.com/'),
('elastic', '/images/elastic.png', 'https://www.elastic.co/'),
('tricentis', '/images/tricentis.png', 'https://www.tricentis.com/'),
('zabbix', '/images/Zabbix.png', 'https://www.zabbix.com/'),
('gitLab', '/images/GitLab.png', 'https://about.gitlab.com/'),
('splunk', '/images/Splunk.png', 'https://www.splunk.com/'),
('keysight', '/images/Keysight.png', 'https://www.keysight.com/'),
('ibm', '/images/ibm.png', 'https://www.ibm.com/');


