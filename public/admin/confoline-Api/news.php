<?php
// Public JSON endpoint for news
// URL (when serving with `-t public`): /admin/confoline-Api/news.php

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, max-age=0');
header('Access-Control-Allow-Origin: *');

require_once __DIR__ . '/../db.php';

try {
    $pdo = get_pdo();
    $stmt = $pdo->query('SELECT id, title, content, image, category, link, is_featured, created_at FROM news ORDER BY is_featured DESC, created_at DESC');
    $rows = $stmt->fetchAll();
    echo json_encode([
        'success' => true,
        'count' => count($rows),
        'data' => $rows,
    ], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'database_error'
    ]);
}
