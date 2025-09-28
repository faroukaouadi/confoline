<?php
session_start();
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header('Location: ../index.php');
    exit();
}
require_once __DIR__ . '/../db.php';

$pdo = get_pdo();
$news = $pdo->query('SELECT id, title, content, image, category, link, is_featured, created_at FROM news ORDER BY is_featured DESC, created_at DESC')->fetchAll();
$flash = isset($_GET['msg']) ? htmlspecialchars($_GET['msg']) : '';
?>
<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Gérer les actualités</title>
    <link rel="stylesheet" href="../styles.css" />
    <style>table{width:100%;border-collapse:collapse}th,td{border-bottom:1px solid rgba(255,255,255,.08);padding:10px;text-align:left}th{color:#94a3b8;font-weight:600}.thumb{height:28px;width:40px;object-fit:cover;border-radius:4px}.featured{color:#22d3ee;font-weight:600}</style>
  </head>
  <body class="dash-body">
    <aside class="sidebar">
      <div class="brand">Confoline Admin</div>
      <nav class="menu">
        <a href="../dashboard.php" class="menu-item">Dashboard</a>
        <a href="../partners/index.php" class="menu-item">Partenaires</a>
        <a href="./index.php" class="menu-item active">Actualités</a>
      </nav>
      <form action="../logout.php" method="post">
        <button class="btn-logout" type="submit">Déconnexion</button>
      </form>
    </aside>

    <main class="content">
      <header class="topbar">
        <h1>Actualités</h1>
      </header>

      <?php if ($flash): ?>
        <div class="alert-error" style="border-color:rgba(34,197,94,.35);background:rgba(34,197,94,.12);color:#bbf7d0;">
          <?php echo $flash; ?>
        </div>
      <?php endif; ?>

      <section class="panel">
        <div class="panel-header">Ajouter une actualité</div>
        <div class="panel-body">
          <form action="add.php" method="post" enctype="multipart/form-data" style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;align-items:end">
            <div>
              <label>Titre</label>
              <input type="text" name="title" required placeholder="Titre de l'actualité" />
            </div>
            <div>
              <label>Catégorie</label>
              <select name="category" required>
                <option value="Report">Report</option>
                <option value="Blog">Blog</option>
                <option value="News">News</option>
              </select>
            </div>
            <div>
              <label>Lien (optionnel)</label>
              <input type="url" name="link" placeholder="https://..." />
            </div>
            <div style="grid-column:span 3">
              <label>Contenu</label>
              <textarea name="content" required placeholder="Description de l'actualité" rows="3"></textarea>
            </div>
            <div>
              <label>Image</label>
              <input type="file" name="image" accept="image/png,image/jpeg,image/jpg" required />
            </div>
            <div>
              <label>
                <input type="checkbox" name="is_featured" value="1" /> Mise en avant
              </label>
            </div>
            <div>
              <button type="submit" class="btn-primary">Ajouter</button>
            </div>
          </form>
        </div>
      </section>

      <section class="panel" style="margin-top:16px;">
        <div class="panel-header">Liste des actualités</div>
        <div class="panel-body">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Image</th>
                <th>Titre</th>
                <th>Catégorie</th>
                <th>Mise en avant</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <?php foreach ($news as $n): ?>
              <tr>
                <td><?php echo (int)$n['id']; ?></td>
                <td><img class="thumb" src="<?php echo htmlspecialchars($n['image']); ?>" alt="image" /></td>
                <td><?php echo htmlspecialchars($n['title']); ?></td>
                <td><?php echo htmlspecialchars($n['category']); ?></td>
                <td class="<?php echo $n['is_featured'] ? 'featured' : ''; ?>">
                  <?php echo $n['is_featured'] ? '★' : '○'; ?>
                </td>
                <td>
                  <a href="edit.php?id=<?php echo (int)$n['id']; ?>" class="btn-logout" style="margin-right:8px;">Modifier</a>
                  <form action="delete.php" method="post" onsubmit="return confirm('Supprimer cette actualité ?');" style="display:inline">
                    <input type="hidden" name="id" value="<?php echo (int)$n['id']; ?>" />
                    <button class="btn-logout" type="submit">Supprimer</button>
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
