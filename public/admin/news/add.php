<?php
session_start();
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header('Location: ../index.php');
    exit();
}

require_once __DIR__ . '/../db.php';

$title = isset($_POST['title']) ? trim($_POST['title']) : '';
$content = isset($_POST['content']) ? trim($_POST['content']) : '';
$category = isset($_POST['category']) ? trim($_POST['category']) : '';
$link = isset($_POST['link']) ? trim($_POST['link']) : '';
$is_featured = isset($_POST['is_featured']) ? 1 : 0;

if ($title === '' || $content === '' || $category === '' || !isset($_FILES['image'])) {
    header('Location: index.php?msg=' . urlencode('Champs manquants'));
    exit();
}

// Ensure news upload directory exists
if (!is_dir(NEWS_UPLOAD_DIR)) {
    @mkdir(NEWS_UPLOAD_DIR, 0775, true);
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
$base = preg_replace('/[^a-z0-9_-]+/i', '-', strtolower($title));
$filename = $base . '-' . time() . '.' . $ext;
$destPath = rtrim(NEWS_UPLOAD_DIR, DIRECTORY_SEPARATOR) . DIRECTORY_SEPARATOR . $filename;
$publicSrc = rtrim(NEWS_PUBLIC_PATH, '/') . '/' . $filename;

if (!move_uploaded_file($file['tmp_name'], $destPath)) {
    header('Location: index.php?msg=' . urlencode("Impossible d'enregistrer le fichier"));
    exit();
}

try {
    $pdo = get_pdo();
    
    // If this news is featured, unfeature all others first
    if ($is_featured) {
        $pdo->prepare('UPDATE news SET is_featured = 0')->execute();
    }
    
    $stmt = $pdo->prepare('INSERT INTO news (title, content, image, category, link, is_featured) VALUES (:title, :content, :image, :category, :link, :is_featured)');
    $stmt->execute([
        ':title' => $title,
        ':content' => $content,
        ':image' => $publicSrc,
        ':category' => $category,
        ':link' => $link ?: null,
        ':is_featured' => $is_featured,
    ]);
} catch (Throwable $e) {
    @unlink($destPath);
    header('Location: index.php?msg=' . urlencode('Erreur base de données'));
    exit();
}

header('Location: index.php?msg=' . urlencode('Actualité ajoutée'));
exit();
