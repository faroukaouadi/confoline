<?php
session_start();

if (isset($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in'] === true) {
    header('Location: dashboard.php');
    exit();
}

$error = isset($_GET['error']) ? htmlspecialchars($_GET['error']) : '';
?>
<!doctype html>
<html lang="fr">
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
        <p class="auth-subtitle">Connectez-vous pour accéder au tableau de bord</p>

        <?php if ($error): ?>
          <div class="alert-error"><?php echo $error; ?></div>
        <?php endif; ?>

        <form class="auth-form" method="post" action="login.php" autocomplete="off">
          <div class="form-group">
            <label for="username">Utilisateur</label>
            <input id="username" name="username" type="text" required placeholder="admin" />
          </div>
          <div class="form-group">
            <label for="password">Mot de passe</label>
            <input id="password" name="password" type="password" required placeholder="admin" />
          </div>
          <button type="submit" class="btn-primary">Se connecter</button>
        </form>
      </div>
    </div>
  </body>
</html>


