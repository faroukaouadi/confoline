<?php
session_start();
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header('Location: ../index.php');
    exit();
}
require_once __DIR__ . '/../db.php';

$id = isset($_GET['id']) ? (int)$_GET['id'] : 0;
if ($id <= 0) {
    header('Location: index.php?msg=' . urlencode('Invalid ID'));
    exit();
}

$pdo = get_pdo();
$stmt = $pdo->prepare('SELECT * FROM news WHERE id = :id');
$stmt->execute([':id' => $id]);
$news = $stmt->fetch();

if (!$news) {
    header('Location: index.php?msg=' . urlencode('News not found'));
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
        
        $stmt = $pdo->prepare('UPDATE news SET title = :title, content = :content, excerpt = :excerpt, image = :image, category = :category, link = :link, is_featured = :is_featured WHERE id = :id');
        $stmt->execute([
            ':title' => $title,
            ':content' => $content,
            ':excerpt' => isset($_POST['excerpt']) ? trim($_POST['excerpt']) : null,
            ':image' => $image,
            ':category' => $category,
            ':link' => $link ?: null,
            ':is_featured' => $is_featured,
            ':id' => $id
        ]);
        header('Location: index.php?msg=' . urlencode('News updated'));
        exit();
    } catch (Throwable $e) {
        header('Location: edit.php?id=' . $id . '&msg=' . urlencode('Database error'));
        exit();
    }
}

$msg = isset($_GET['msg']) ? htmlspecialchars($_GET['msg']) : '';
?>
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Edit news</title>
    <link rel="stylesheet" href="../styles.css" />
    <link href="https://cdn.jsdelivr.net/npm/quill@1.3.7/dist/quill.snow.css" rel="stylesheet">
    <style>
      .ql-toolbar.ql-snow{border:1px solid rgba(255,255,255,.18);border-radius:8px 8px 0 0;background:#0b1220}
      .ql-container.ql-snow{border:1px solid rgba(255,255,255,.18);border-top:0;border-radius:0 0 8px 8px}
      .ql-container .ql-editor{background:#ffffff;color:#111827;min-height:220px}
    </style>
    <script src="https://cdn.jsdelivr.net/npm/quill@1.3.7/dist/quill.min.js"></script>
    <script>
      document.addEventListener('DOMContentLoaded', function(){
        var ta = document.querySelector('textarea[name="content"]');
        var texcerpt = document.querySelector('textarea[name="excerpt"]');
        if (!ta || !window.Quill) return;
        var editor = document.createElement('div');
        editor.id = 'editor-content';
        editor.style.minHeight = '220px';
        editor.innerHTML = ta.value || '';
        ta.style.display = 'none';
        ta.parentNode.insertBefore(editor, ta);
        
        var exEditor;
        if (texcerpt) {
          exEditor = document.createElement('div');
          exEditor.id = 'editor-excerpt';
          exEditor.style.minHeight = '90px';
          exEditor.innerHTML = texcerpt.value || '';
          texcerpt.style.display = 'none';
          texcerpt.parentNode.insertBefore(exEditor, texcerpt);
        }
        
        var toolbar = [
          ['bold', 'italic', 'underline'],
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          [{ 'align': [] }],
          ['link', 'image'],
          ['clean']
        ];
        var q = new Quill('#editor-content', { theme: 'snow', modules: { toolbar } });
        var qx = exEditor ? new Quill('#editor-excerpt', { theme: 'snow', modules: { toolbar: [['bold','italic','underline'],[{ list:'bullet'}],['clean']] } }) : null;

        var toolbarModule = q.getModule('toolbar');
        toolbarModule.addHandler('image', function(){
          var input = document.createElement('input');
          input.type = 'file';
          input.accept = 'image/*';
          input.onchange = async function(){
            var file = input.files && input.files[0];
            if (!file) return;
            var form = new FormData();
            form.append('image', file);
            try {
              const res = await fetch('../news/upload-image.php', { method: 'POST', body: form, credentials: 'same-origin' });
              if (!res.ok) throw new Error('upload failed');
              const json = await res.json();
              if (json && json.success && json.url) {
                const range = q.getSelection(true);
                q.insertEmbed(range.index, 'image', json.url, 'user');
                q.setSelection(range.index + 1, 0);
              }
            } catch (e) {
              alert('Image upload error');
            }
          };
          input.click();
        });

        var form = ta.closest('form');
        if (form) {
          form.addEventListener('submit', function(){
            ta.value = q.root.innerHTML;
            if (qx && texcerpt) texcerpt.value = qx.root.innerHTML;
          });
        }
      });
    </script>
  </head>
  <body class="dash-body">
    <aside class="sidebar">
      <div class="brand">Confoline Admin</div>
      <nav class="menu">
        <a href="../dashboard.php" class="menu-item">Dashboard</a>
        <a href="../home-partners/index.php" class="menu-item">Home Partners</a>
        <a href="../partners/index.php" class="menu-item">Partners</a>
        <a href="./index.php" class="menu-item active">News</a>
        <a href="../gallery/index.php" class="menu-item">Gallery</a>
        <a href="../index.php" class="menu-item">Statistics</a>
        <a href="../opportunities/index.php" class="menu-item">Career Opportunities</a
      </nav>
      <form action="../logout.php" method="post">
        <button class="btn-logout" type="submit">Logout</button>
      </form>
    </aside>

    <main class="content">
      <header class="topbar">
        <h1>Edit news</h1>
      </header>

      <?php if ($msg): ?>
        <div class="alert-error" style="border-color:rgba(239,68,68,.35);background:rgba(239,68,68,.12);color:#fecaca;">
          <?php echo $msg; ?>
        </div>
      <?php endif; ?>

      <section class="panel">
        <div class="panel-header">Edit news</div>
        <div class="panel-body">
          <form action="edit.php?id=<?php echo $id; ?>" method="post" enctype="multipart/form-data" style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;align-items:end">
            <div>
              <label>Title</label>
              <input type="text" name="title" required value="<?php echo htmlspecialchars($news['title']); ?>" />
            </div>
            <div>
              <label>Category</label>
              <select name="category" required>
                <option value="Report" <?php echo $news['category'] === 'Report' ? 'selected' : ''; ?>>Report</option>
                <option value="Blog" <?php echo $news['category'] === 'Blog' ? 'selected' : ''; ?>>Blog</option>
                <option value="News" <?php echo $news['category'] === 'News' ? 'selected' : ''; ?>>News</option>
              </select>
            </div>
            <div>
              <label>Link (optional)</label>
              <input type="url" name="link" value="<?php echo htmlspecialchars($news['link']); ?>" />
            </div>
            <div style="grid-column:span 3">
              <label>Excerpt (short summary)</label>
              <textarea name="excerpt" rows="3"><?php echo htmlspecialchars($news['excerpt'] ?? ''); ?></textarea>
            </div>
            <div style="grid-column:span 3">
              <label>Content</label>
              <textarea name="content" required rows="6"><?php echo htmlspecialchars($news['content']); ?></textarea>
            </div>
            <div>
              <label>Current image</label>
              <img src="<?php echo htmlspecialchars($news['image']); ?>" alt="current" style="height:60px;width:80px;object-fit:cover;border-radius:4px;" />
            </div>
            <div>
              <label>New image (optional)</label>
              <input type="file" name="image" accept="image/png,image/jpeg,image/jpg" />
            </div>
            <div>
              <label>
                <input type="checkbox" name="is_featured" value="1" <?php echo $news['is_featured'] ? 'checked' : ''; ?> /> Featured
              </label>
            </div>
            <div>
              <button type="submit" class="btn-primary">Save</button>
              <a href="index.php" class="btn-logout" style="margin-left:8px;">Cancel</a>
            </div>
          </form>
        </div>
      </section>
    </main>
  </body>
</html>
