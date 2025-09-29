<?php
session_start();
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header('Location: ../index.php');
    exit();
}
require_once __DIR__ . '/../db.php';

$id = isset($_POST['id']) ? (int)$_POST['id'] : 0;
if ($id <= 0) {
    header('Location: index.php?msg=' . urlencode('ID invalide'));
    exit();
}

$pdo = get_pdo();
$stmt = $pdo->prepare('SELECT src FROM gallery_images WHERE id = :id');
$stmt->execute([':id' => $id]);
$row = $stmt->fetch();

if (!$row) {
    header('Location: index.php?msg=' . urlencode('Introuvable'));
    exit();
}

$pdo->prepare('DELETE FROM gallery_images WHERE id = :id')->execute([':id' => $id]);

$src = $row['src'];
$prefix = rtrim(GALLERY_PUBLIC_PATH, '/');
if (strpos($src, $prefix . '/') === 0) {
    $filename = substr($src, strlen($prefix) + 1);
    $path = rtrim(GALLERY_UPLOAD_DIR, DIRECTORY_SEPARATOR) . DIRECTORY_SEPARATOR . $filename;
    if (is_file($path)) @unlink($path);
}

header('Location: index.php?msg=' . urlencode('Supprimé'));
exit();
