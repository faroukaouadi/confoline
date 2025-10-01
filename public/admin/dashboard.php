<?php
session_start();
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header('Location: index.php');
    exit();
}

$username = isset($_SESSION['admin_username']) ? $_SESSION['admin_username'] : 'admin';
?>
<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Dashboard</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body class="dash-body">
    <aside class="sidebar">
      <div class="brand">Confoline Admin</div>
      <nav class="menu">
        <a href="#" class="menu-item active">Dashboard</a>
        <a href="partners/index.php" class="menu-item">Partenaires</a>
        <a href="news/index.php" class="menu-item">Actualités</a>
        <a href="gallery/index.php" class="menu-item">Galerie</a>
        <a href="#" class="menu-item">Paramètres</a>
      </nav>
      <form action="logout.php" method="post">
        <button class="btn-logout" type="submit">Déconnexion</button>
      </form>
    </aside>

    <main class="content">
      <header class="topbar">
        <h1>Bienvenue, <?php echo htmlspecialchars($username); ?></h1>
      </header>

      <section class="cards">
        <div class="card">
          <div class="card-title">Visites aujourd'hui</div>
          <div class="card-value">1,248</div>
        </div>
        <div class="card">
          <div class="card-title">Nouveaux clients</div>
          <div class="card-value">32</div>
        </div>
        <div class="card">
          <div class="card-title">Tickets ouverts</div>
          <div class="card-value">7</div>
        </div>
      </section>

      <section class="panel">
        <div class="panel-header">Activité récente</div>
        <div class="panel-body">
          <ul class="activity">
            <li>Utilisateur "demo" créé</li>
            <li>Mise à jour des paramètres globaux</li>
            <li>Export des rapports hebdomadaires</li>
          </ul>
        </div>
      </section>
    </main>
  </body>
</html>


