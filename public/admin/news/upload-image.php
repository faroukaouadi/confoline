<?php
session_start();
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    http_response_code(403);
    echo json_encode(['success' => false, 'error' => 'forbidden']);
    exit();
}
header('Content-Type: application/json');
require_once __DIR__ . '/../db.php';

if (!isset($_FILES['image'])) {
    echo json_encode(['success' => false, 'error' => 'no_file']);
    exit();
}

if (!is_dir(NEWS_UPLOAD_DIR)) {
    @mkdir(NEWS_UPLOAD_DIR, 0775, true);
}

$file = $_FILES['image'];
if ($file['error'] !== UPLOAD_ERR_OK) {
    echo json_encode(['success' => false, 'error' => 'upload_error']);
    exit();
}

$allowed = [
    'image/png' => 'png',
    'image/jpeg' => 'jpg',
    'image/jpg' => 'jpg'
];

$finfo = finfo_open(FILEINFO_MIME_TYPE);
$mime = finfo_file($finfo, $file['tmp_name']);
finfo_close($finfo);

if (!isset($allowed[$mime])) {
    echo json_encode(['success' => false, 'error' => 'bad_type']);
    exit();
}

$ext = $allowed[$mime];
$filename = 'inline-' . time() . '-' . bin2hex(random_bytes(4)) . '.' . $ext;
$destPath = rtrim(NEWS_UPLOAD_DIR, DIRECTORY_SEPARATOR) . DIRECTORY_SEPARATOR . $filename;
$publicSrc = rtrim(NEWS_PUBLIC_PATH, '/') . '/' . $filename;

if (!move_uploaded_file($file['tmp_name'], $destPath)) {
    echo json_encode(['success' => false, 'error' => 'save_failed']);
    exit();
}

echo json_encode(['success' => true, 'url' => $publicSrc]);