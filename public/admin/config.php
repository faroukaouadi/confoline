<?php
// Configure your local MySQL connection
// Create DB first (see partners.sql) then update credentials below if needed

define('DB_HOST', '127.0.0.1');
define('DB_PORT', 3306);
define('DB_NAME', 'confoline_admin');
define('DB_USER', 'root');
define('DB_PASS', '');

// Upload settings
define('PARTNERS_UPLOAD_DIR', __DIR__ . '/../images/partners');
define('PARTNERS_PUBLIC_PATH', '/images/partners');


