<?php
session_start();

$username = isset($_POST['username']) ? trim($_POST['username']) : '';
$password = isset($_POST['password']) ? trim($_POST['password']) : '';

if ($username === 'admin' && $password === 'admin') {
    $_SESSION['admin_logged_in'] = true;
    $_SESSION['admin_username'] = 'admin';
    header('Location: dashboard.php');
    exit();
}

header('Location: index.php?error=' . urlencode('Identifiants invalides'));
exit();


