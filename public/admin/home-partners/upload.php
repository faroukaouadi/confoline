<?php
session_start();
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header('Location: ../index.php');
    exit();
}

require_once __DIR__ . '/../db.php';

$name = isset($_POST['name']) ? trim($_POST['name']) : '';
$link = isset($_POST['link']) ? trim($_POST['link']) : '';

if ($name === '' || $link === '' || !isset($_FILES['logo'])) {
    header('Location: index.php?msg=' . urlencode('Champs manquants'));
    exit();
}

ensure_upload_dir();

$file = $_FILES['logo'];
if ($file['error'] !== UPLOAD_ERR_OK) {
    header('Location: index.php?msg=' . urlencode('Erreur upload'));
    exit();
}

$allowed = [
    'image/png' => 'png',
    'image/jpeg' => 'jpg',
    'image/jpg' => 'jpg',
    'image/svg+xml' => 'svg'
];

$finfo = finfo_open(FILEINFO_MIME_TYPE);
$mime = finfo_file($finfo, $file['tmp_name']);
finfo_close($finfo);

if (!isset($allowed[$mime])) {
    header('Location: index.php?msg=' . urlencode('Type de fichier non supporté'));
    exit();
}

$ext = $allowed[$mime];
$base = preg_replace('/[^a-z0-9_-]+/i', '-', strtolower($name));
$filename = $base . '-' . time() . '.' . $ext;
$destPath = rtrim(PARTNERS_UPLOAD_DIR, DIRECTORY_SEPARATOR) . DIRECTORY_SEPARATOR . $filename;
$publicSrc = rtrim(PARTNERS_PUBLIC_PATH, '/') . '/' . $filename;

if (!move_uploaded_file($file['tmp_name'], $destPath)) {
    header('Location: index.php?msg=' . urlencode("Impossible d'enregistrer le fichier"));
    exit();
}

try {
    $pdo = get_pdo();
    $stmt = $pdo->prepare('INSERT INTO partners_white (name, src, link) VALUES (:name, :src, :link)');
    $stmt->execute([
        ':name' => $name,
        ':src' => $publicSrc,
        ':link' => $link,
    ]);
} catch (Throwable $e) {
    @unlink($destPath);
    header('Location: index.php?msg=' . urlencode('Erreur base de données'));
    exit();
}

header('Location: index.php?msg=' . urlencode('Partenaire ajouté'));
exit();


