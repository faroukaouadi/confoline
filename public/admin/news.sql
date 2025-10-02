-- News table for dynamic news management
CREATE TABLE IF NOT EXISTS `news` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `content` TEXT NOT NULL,
  `excerpt` TEXT NULL,
  `image` VARCHAR(255) NOT NULL,
  `category` VARCHAR(50) NOT NULL DEFAULT 'Report',
  `link` VARCHAR(255) DEFAULT NULL,
  `is_featured` TINYINT(1) NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_featured` (`is_featured`),
  KEY `idx_category` (`category`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Seed with sample data
INSERT INTO `news` (`title`, `content`, `excerpt`, `image`, `category`, `link`, `is_featured`) VALUES
('2025 Gartner Critical Capabilities for Enterprise Low‑Code Applications', 'Discover why ServiceNow was ranked #1 for Building and Managing AI Agents Use Case in the 2025 report.', 'Discover why ServiceNow was ranked #1...', '/images/team.jpg', 'Report', '#', 1),
('2025 Gartner Magic Quadrant for Enterprise Low‑Code Application', 'Latest insights on enterprise low-code application platforms and market leaders.', 'Latest insights on enterprise low-code...', '/images/employee2.jpg', 'Report', '#', 0),
('IDC MarketScape: Worldwide Business Automation Platforms 2025 Vendor Assessment', 'Comprehensive analysis of business automation platforms and vendor capabilities.', 'Comprehensive analysis of automation...', '/images/employee2.jpg', 'Report', '#', 0);
