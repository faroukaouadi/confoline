<?php
session_start();
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header('Location: ../index.php');
    exit();
}
require_once __DIR__ . '/../db.php';

$pdo = get_pdo();
$partners = $pdo->query('SELECT id, name, src, link, created_at FROM partners ORDER BY created_at DESC')->fetchAll();
$flash = isset($_GET['msg']) ? htmlspecialchars($_GET['msg']) : '';
?>
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Manage Partners</title>
    <link rel="stylesheet" href="../styles.css" />
    <style>table{width:100%;border-collapse:collapse}th,td{border-bottom:1px solid rgba(255,255,255,.08);padding:10px;text-align:left}th{color:#94a3b8;font-weight:600}.thumb{height:28px}</style>
  </head>
  <body class="dash-body">
    <aside class="sidebar">
      <div class="brand">Confoline Admin</div>
      <nav class="menu">
        <a href="../dashboard.php" class="menu-item">Dashboard</a>
        <a href="./index.php" class="menu-item active">Partners</a>
        <a href="../news/index.php" class="menu-item">News</a>
        <a href="../gallery/index.php" class="menu-item">Gallery</a>
      </nav>
      <form action="../logout.php" method="post">
        <button class="btn-logout" type="submit">Logout</button>
      </form>
    </aside>

    <main class="content">
      <header class="topbar">
        <h1>Partners</h1>
      </header>

      <?php if ($flash): ?>
        <div class="alert-error" style="border-color:rgba(34,197,94,.35);background:rgba(34,197,94,.12);color:#bbf7d0;">
          <?php echo $flash; ?>
        </div>
      <?php endif; ?>

      <section class="panel">
        <div class="panel-header">Add partner</div>
        <div class="panel-body">
          <form action="upload.php" method="post" enctype="multipart/form-data" style="display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;align-items:end">
            <div>
              <label>Name</label>
              <input type="text" name="name" required placeholder="e.g. opentext" />
            </div>
            <div>
              <label>Link</label>
              <input type="url" name="link" required placeholder="https://..." />
            </div>
            <div>
              <label>Logo (PNG/JPG/SVG)</label>
              <input type="file" name="logo" accept="image/png,image/jpeg,image/jpg,image/svg+xml" required />
            </div>
            <div>
              <button type="submit" class="btn-primary">Add</button>
            </div>
          </form>
        </div>
      </section>

      <section class="panel" style="margin-top:16px;">
        <div class="panel-header">List</div>
        <div class="panel-body">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Logo</th>
                <th>Name</th>
                <th>Link</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <?php foreach ($partners as $p): ?>
              <tr>
                <td><?php echo (int)$p['id']; ?></td>
                <td><img class="thumb" src="<?php echo htmlspecialchars($p['src']); ?>" alt="logo" /></td>
                <td><?php echo htmlspecialchars($p['name']); ?></td>
                <td><a href="<?php echo htmlspecialchars($p['link']); ?>" target="_blank"><?php echo htmlspecialchars($p['link']); ?></a></td>
                <td>
                  <form action="remove.php" method="post" onsubmit="return confirm('Delete this partner?');" style="display:inline">
                    <input type="hidden" name="id" value="<?php echo (int)$p['id']; ?>" />
                    <button class="btn-logout" type="submit">Delete</button>
                  </form>
                </td>
              </tr>
              <?php endforeach; ?>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  </body>
 </html>


