<?php
session_start();
require_once '../config.php';

// Check if user is logged in
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header('Location: ../index.php');
    exit();
}

require_once '../db.php';

// Get opportunity ID
$id = isset($_GET['id']) ? (int)$_GET['id'] : 0;

if ($id <= 0) {
    header('Location: index.php');
    exit();
}

try {
    $pdo = get_pdo();
    
    // Check if opportunity exists
    $stmt = $pdo->prepare("SELECT title FROM opportunities WHERE id = ?");
    $stmt->execute([$id]);
    $opportunity = $stmt->fetch();
    
    if (!$opportunity) {
        header('Location: index.php');
        exit();
    }
    
    // Delete the opportunity
    $stmt = $pdo->prepare("DELETE FROM opportunities WHERE id = ?");
    $stmt->execute([$id]);
    
    // Redirect with success message
    header('Location: index.php?deleted=1');
    exit();
    
} catch (Exception $e) {
    // Redirect with error message
    header('Location: index.php?error=' . urlencode($e->getMessage()));
    exit();
}
?>
