<?php
session_start();
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header('Location: ../index.php');
    exit();
}
require_once __DIR__ . '/../db.php';

$pdo = get_pdo();
$images = $pdo->query('SELECT id, src, alt, created_at FROM gallery_images ORDER BY created_at DESC')->fetchAll();
$msg = isset($_GET['msg']) ? htmlspecialchars($_GET['msg']) : '';
?>
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Manage Gallery</title>
    <link rel="stylesheet" href="../styles.css" />
    <style>table{width:100%;border-collapse:collapse}th,td{border-bottom:1px solid rgba(255,255,255,.08);padding:10px;text-align:left}th{color:#94a3b8;font-weight:600}.thumb{height:60px;width:80px;object-fit:cover;border-radius:6px}</style>
  </head>
  <body class="dash-body">
    <aside class="sidebar">
      <div class="brand">Confoline Admin</div>
      <nav class="menu">
        <a href="../dashboard.php" class="menu-item">Dashboard</a>
        <a href="../partners/index.php" class="menu-item">Partners</a>
        <a href="../news/index.php" class="menu-item">News</a>
        <a href="./index.php" class="menu-item active">Gallery</a>
      </nav>
      <form action="../logout.php" method="post">
        <button class="btn-logout" type="submit">Logout</button>
      </form>
    </aside>

    <main class="content">
      <header class="topbar">
        <h1>Gallery</h1>
      </header>

      <?php if ($msg): ?>
        <div class="alert-error" style="border-color:rgba(34,197,94,.35);background:rgba(34,197,94,.12);color:#bbf7d0;">
          <?php echo $msg; ?>
        </div>
      <?php endif; ?>

      <section class="panel">
        <div class="panel-header">Add image</div>
        <div class="panel-body">
          <form action="upload.php" method="post" enctype="multipart/form-data" style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;align-items:end">
            <div>
              <label>Alt (optional)</label>
              <input type="text" name="alt" placeholder="Description" />
            </div>
            <div>
              <label>Image (PNG/JPG)</label>
              <input type="file" name="image" accept="image/png,image/jpeg,image/jpg" required />
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
                <th>Preview</th>
                <th>Alt</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <?php foreach ($images as $i): ?>
              <tr>
                <td><?php echo (int)$i['id']; ?></td>
                <td><img class="thumb" src="<?php echo htmlspecialchars($i['src']); ?>" alt="thumb" /></td>
                <td><?php echo htmlspecialchars($i['alt']); ?></td>
                <td>
                  <form action="remove.php" method="post" onsubmit="return confirm('Delete this image?');" style="display:inline">
                    <input type="hidden" name="id" value="<?php echo (int)$i['id']; ?>" />
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
