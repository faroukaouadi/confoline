<?php
session_start();
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header('Location: ../index.php');
    exit();
}
require_once __DIR__ . '/../db.php';

$alt = isset($_POST['alt']) ? trim($_POST['alt']) : '';
if (!isset($_FILES['image'])) {
    header('Location: index.php?msg=' . urlencode('Fichier manquant'));
    exit();
}

if (!is_dir(GALLERY_UPLOAD_DIR)) {
    @mkdir(GALLERY_UPLOAD_DIR, 0775, true);
}

$file = $_FILES['image'];
if ($file['error'] !== UPLOAD_ERR_OK) {
    header('Location: index.php?msg=' . urlencode('Erreur upload'));
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
    header('Location: index.php?msg=' . urlencode('Type de fichier non supporté'));
    exit();
}

$ext = $allowed[$mime];
$base = $alt !== '' ? $alt : 'img';
$base = preg_replace('/[^a-z0-9_-]+/i', '-', strtolower($base));
$filename = $base . '-' . time() . '.' . $ext;
$destPath = rtrim(GALLERY_UPLOAD_DIR, DIRECTORY_SEPARATOR) . DIRECTORY_SEPARATOR . $filename;
$publicSrc = rtrim(GALLERY_PUBLIC_PATH, '/') . '/' . $filename;

if (!move_uploaded_file($file['tmp_name'], $destPath)) {
    header('Location: index.php?msg=' . urlencode("Impossible d'enregistrer le fichier"));
    exit();
}

try {
    $pdo = get_pdo();
    $stmt = $pdo->prepare('INSERT INTO gallery_images (src, alt) VALUES (:src, :alt)');
    $stmt->execute([
        ':src' => $publicSrc,
        ':alt' => $alt ?: null,
    ]);
} catch (Throwable $e) {
    @unlink($destPath);
    header('Location: index.php?msg=' . urlencode('Erreur base de données'));
    exit();
}

header('Location: index.php?msg=' . urlencode('Image ajoutée'));
exit();
