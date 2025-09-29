-- Gallery images table
CREATE TABLE IF NOT EXISTS `gallery_images` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `src` VARCHAR(255) NOT NULL,
  `alt` VARCHAR(255) DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Optional seed
INSERT INTO `gallery_images` (`src`, `alt`) VALUES
('/images/employee1.jpg', 'employee1'),
('/images/employee2.jpg', 'employee2'),
('/images/employee3.jpg', 'employee3'),
('/images/team.jpg', 'team');
