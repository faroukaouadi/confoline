-- Table pour gérer les utilisateurs et administrateurs
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL UNIQUE,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `role` enum('admin','user') NOT NULL DEFAULT 'user',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  KEY `idx_username` (`username`),
  KEY `idx_role` (`role`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insérer l'administrateur par défaut
-- Mot de passe: admin (en clair)
INSERT INTO `users` (`username`, `password`, `email`, `role`, `is_active`) 
VALUES ('admin', 'admin', 'admin@confoline.com', 'admin', 1)
ON DUPLICATE KEY UPDATE `username` = `username`;
