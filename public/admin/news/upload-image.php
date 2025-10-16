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

// Get max width from form data
$maxWidth = isset($_POST['max_width']) ? (int)$_POST['max_width'] : null;

// Function to resize image
function resizeImage($sourcePath, $destPath, $maxWidth = null) {
    $imageInfo = getimagesize($sourcePath);
    if (!$imageInfo) return false;
    
    $originalWidth = $imageInfo[0];
    $originalHeight = $imageInfo[1];
    $mimeType = $imageInfo['mime'];
    
    // If no max width specified or image is smaller, just copy
    if (!$maxWidth || $originalWidth <= $maxWidth) {
        return copy($sourcePath, $destPath);
    }
    
    // Calculate new dimensions
    $newWidth = $maxWidth;
    $newHeight = ($originalHeight * $maxWidth) / $originalWidth;
    
    // Create image resource based on type
    switch ($mimeType) {
        case 'image/jpeg':
            $sourceImage = imagecreatefromjpeg($sourcePath);
            break;
        case 'image/png':
            $sourceImage = imagecreatefrompng($sourcePath);
            break;
        default:
            return false;
    }
    
    if (!$sourceImage) return false;
    
    // Create new image with calculated dimensions
    $newImage = imagecreatetruecolor($newWidth, $newHeight);
    
    // Preserve transparency for PNG
    if ($mimeType === 'image/png') {
        imagealphablending($newImage, false);
        imagesavealpha($newImage, true);
        $transparent = imagecolorallocatealpha($newImage, 255, 255, 255, 127);
        imagefill($newImage, 0, 0, $transparent);
    }
    
    // Resize image
    imagecopyresampled($newImage, $sourceImage, 0, 0, 0, 0, $newWidth, $newHeight, $originalWidth, $originalHeight);
    
    // Save resized image
    $result = false;
    switch ($mimeType) {
        case 'image/jpeg':
            $result = imagejpeg($newImage, $destPath, 85); // 85% quality
            break;
        case 'image/png':
            $result = imagepng($newImage, $destPath, 8); // Compression level 8
            break;
    }
    
    // Clean up
    imagedestroy($sourceImage);
    imagedestroy($newImage);
    
    return $result;
}

// Move and resize image
if ($maxWidth) {
    if (!resizeImage($file['tmp_name'], $destPath, $maxWidth)) {
        echo json_encode(['success' => false, 'error' => 'resize_failed']);
        exit();
    }
} else {
    if (!move_uploaded_file($file['tmp_name'], $destPath)) {
        echo json_encode(['success' => false, 'error' => 'save_failed']);
        exit();
    }
}

echo json_encode(['success' => true, 'url' => $publicSrc]);