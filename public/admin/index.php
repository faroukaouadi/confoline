<?php
session_start();
require_once __DIR__ . '/db.php';

// Vérifier si l'utilisateur est déjà connecté
if (isset($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in'] === true) {
    header('Location: dashboard.php');
    exit();
}

$error = isset($_GET['error']) ? htmlspecialchars($_GET['error']) : '';

// Traitement du formulaire de connexion
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'] ?? '';
    $password = $_POST['password'] ?? '';
    
    if (!empty($username) && !empty($password)) {
        try {
            $pdo = get_pdo();
            $stmt = $pdo->prepare("SELECT * FROM users WHERE username = ? AND is_active = 1");
            $stmt->execute([$username]);
            $user = $stmt->fetch();
            
            if ($user && $user['password'] === $password) {
                $_SESSION['admin_logged_in'] = true;
                $_SESSION['admin_username'] = $user['username'];
                $_SESSION['admin_role'] = $user['role'];
                $_SESSION['admin_id'] = $user['id'];
                header('Location: dashboard.php');
                exit();
            } else {
                $error = 'Invalid credentials';
            }
        } catch (Exception $e) {
            $error = 'Database connection error';
        }
    } else {
        $error = 'Please fill in all fields';
    }
}
?>
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Admin Login</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body class="auth-body">
    <div class="auth-container">
      <div class="auth-card">
        <h1 class="auth-title">Administration</h1>
        <p class="auth-subtitle">Sign in to access the dashboard</p>

        <?php if ($error): ?>
          <div class="alert-error"><?php echo $error; ?></div>
        <?php endif; ?>

        <form class="auth-form" method="post" autocomplete="off">
          <div class="form-group">
            <label for="username">Username</label>
            <input id="username" name="username" type="text" required placeholder="admin" />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input id="password" name="password" type="password" required placeholder="admin" />
          </div>
          <button type="submit" class="btn-primary">Sign In</button>
        </form>
      </div>
    </div>
  </body>
</html>


