<?php
session_start();
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header('Location: index.php');
    exit();
}

$username = isset($_SESSION['admin_username']) ? $_SESSION['admin_username'] : 'admin';
$userRole = isset($_SESSION['admin_role']) ? $_SESSION['admin_role'] : 'user';
?>
<!doctype html>
<html lang="en">
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
        <a href="home-partners/index.php" class="menu-item">Home Partners</a>
        <a href="partners/index.php" class="menu-item">Partners</a>
        <a href="news/index.php" class="menu-item">News</a>
        <a href="gallery/index.php" class="menu-item">Gallery</a>
        <a href="opportunities/index.php" class="menu-item">Career Opportunities</a>
        <?php if ($userRole === 'admin'): ?>
        <a href="users/index.php" class="menu-item">Users</a>
        <?php endif; ?>
      </nav>
      <form action="logout.php" method="post">
        <button class="btn-logout" type="submit">Logout</button>
      </form>
    </aside>

    <main class="content">
      <header class="topbar">
        <h1>Welcome, <?php echo htmlspecialchars($username); ?></h1>
      </header>

      <section class="cards">
        <div class="card">
          <div class="card-title">Visits today</div>
          <div class="card-value">1,248</div>
        </div>
        <div class="card">
          <div class="card-title">New customers</div>
          <div class="card-value">32</div>
        </div>
        <div class="card">
          <div class="card-title">Open tickets</div>
          <div class="card-value">7</div>
        </div>
      </section>

      <section class="panel">
        <div class="panel-header">Recent activity</div>
        <div class="panel-body">
          <ul class="activity">
            <li>User "demo" created</li>
            <li>Global settings updated</li>
            <li>Weekly reports exported</li>
          </ul>
        </div>
      </section>
    </main>
  </body>
</html>


