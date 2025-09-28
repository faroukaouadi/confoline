<?php
session_start();
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header('Location: ../index.php');
    exit();
}
require_once __DIR__ . '/../db.php';

$id = isset($_GET['id']) ? (int)$_GET['id'] : 0;
if ($id <= 0) {
    header('Location: index.php?msg=' . urlencode('ID invalide'));
    exit();
}

$pdo = get_pdo();
$stmt = $pdo->prepare('SELECT * FROM news WHERE id = :id');
$stmt->execute([':id' => $id]);
$news = $stmt->fetch();

if (!$news) {
    header('Location: index.php?msg=' . urlencode('Actualité introuvable'));
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $title = trim($_POST['title']);
    $content = trim($_POST['content']);
    $category = trim($_POST['category']);
    $link = trim($_POST['link']);
    $is_featured = isset($_POST['is_featured']) ? 1 : 0;
    
    $image = $news['image']; // Keep existing image by default
    
    // Handle new image upload if provided
    if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
        $file = $_FILES['image'];
        $allowed = ['image/png' => 'png', 'image/jpeg' => 'jpg', 'image/jpg' => 'jpg'];
        
        $finfo = finfo_open(FILEINFO_MIME_TYPE);
        $mime = finfo_file($finfo, $file['tmp_name']);
        finfo_close($finfo);
        
        if (isset($allowed[$mime])) {
            $ext = $allowed[$mime];
            $base = preg_replace('/[^a-z0-9_-]+/i', '-', strtolower($title));
            $filename = $base . '-' . time() . '.' . $ext;
            $destPath = rtrim(NEWS_UPLOAD_DIR, DIRECTORY_SEPARATOR) . DIRECTORY_SEPARATOR . $filename;
            $publicSrc = rtrim(NEWS_PUBLIC_PATH, '/') . '/' . $filename;
            
            if (move_uploaded_file($file['tmp_name'], $destPath)) {
                // Delete old image if it's in our news uploads folder
                $oldPath = rtrim(NEWS_UPLOAD_DIR, DIRECTORY_SEPARATOR) . DIRECTORY_SEPARATOR . basename($news['image']);
                if (is_file($oldPath)) @unlink($oldPath);
                $image = $publicSrc;
            }
        }
    }
    
    try {
        // If this news is featured, unfeature all others first
        if ($is_featured) {
            $pdo->prepare('UPDATE news SET is_featured = 0 WHERE id != :id')->execute([':id' => $id]);
        }
        
        $stmt = $pdo->prepare('UPDATE news SET title = :title, content = :content, image = :image, category = :category, link = :link, is_featured = :is_featured WHERE id = :id');
        $stmt->execute([
            ':title' => $title,
            ':content' => $content,
            ':image' => $image,
            ':category' => $category,
            ':link' => $link ?: null,
            ':is_featured' => $is_featured,
            ':id' => $id
        ]);
        header('Location: index.php?msg=' . urlencode('Actualité modifiée'));
        exit();
    } catch (Throwable $e) {
        header('Location: edit.php?id=' . $id . '&msg=' . urlencode('Erreur base de données'));
        exit();
    }
}

$msg = isset($_GET['msg']) ? htmlspecialchars($_GET['msg']) : '';
?>
<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Modifier l'actualité</title>
    <link rel="stylesheet" href="../styles.css" />
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
        <h1>Modifier l'actualité</h1>
      </header>

      <?php if ($msg): ?>
        <div class="alert-error" style="border-color:rgba(239,68,68,.35);background:rgba(239,68,68,.12);color:#fecaca;">
          <?php echo $msg; ?>
        </div>
      <?php endif; ?>

      <section class="panel">
        <div class="panel-header">Modifier l'actualité</div>
        <div class="panel-body">
          <form action="edit.php?id=<?php echo $id; ?>" method="post" enctype="multipart/form-data" style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;align-items:end">
            <div>
              <label>Titre</label>
              <input type="text" name="title" required value="<?php echo htmlspecialchars($news['title']); ?>" />
            </div>
            <div>
              <label>Catégorie</label>
              <select name="category" required>
                <option value="Report" <?php echo $news['category'] === 'Report' ? 'selected' : ''; ?>>Report</option>
                <option value="Blog" <?php echo $news['category'] === 'Blog' ? 'selected' : ''; ?>>Blog</option>
                <option value="News" <?php echo $news['category'] === 'News' ? 'selected' : ''; ?>>News</option>
              </select>
            </div>
            <div>
              <label>Lien (optionnel)</label>
              <input type="url" name="link" value="<?php echo htmlspecialchars($news['link']); ?>" />
            </div>
            <div style="grid-column:span 3">
              <label>Contenu</label>
              <textarea name="content" required rows="3"><?php echo htmlspecialchars($news['content']); ?></textarea>
            </div>
            <div>
              <label>Image actuelle</label>
              <img src="<?php echo htmlspecialchars($news['image']); ?>" alt="current" style="height:60px;width:80px;object-fit:cover;border-radius:4px;" />
            </div>
            <div>
              <label>Nouvelle image (optionnel)</label>
              <input type="file" name="image" accept="image/png,image/jpeg,image/jpg" />
            </div>
            <div>
              <label>
                <input type="checkbox" name="is_featured" value="1" <?php echo $news['is_featured'] ? 'checked' : ''; ?> /> Mise en avant
              </label>
            </div>
            <div>
              <button type="submit" class="btn-primary">Modifier</button>
              <a href="index.php" class="btn-logout" style="margin-left:8px;">Annuler</a>
            </div>
          </form>
        </div>
      </section>
    </main>
  </body>
</html>
