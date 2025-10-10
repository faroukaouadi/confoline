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
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Manage News</title>
    <link rel="stylesheet" href="../styles.css" />
    <style>
        .search-filters {
            background: rgba(17,24,39,.7);
            border: 1px solid rgba(255,255,255,.06);
            border-radius: 14px;
            padding: 20px;
            margin-bottom: 20px;
        }
        .filter-row {
            display: flex;
            gap: 15px;
            flex-wrap: wrap;
            align-items: end;
        }
        .filter-group {
            display: flex;
            flex-direction: column;
            min-width: 150px;
        }
        .filter-group label {
            font-weight: 500;
            margin-bottom: 5px;
            color: var(--muted);
            font-size: 13px;
        }
        .filter-group input,
        .filter-group select,
        .filter-group textarea {
            background: #0b1220;
            border: 1px solid rgba(255,255,255,.08);
            color: var(--text);
            padding: 10px 12px;
            border-radius: 8px;
            outline: none;
            transition: border .2s;
        }
        .filter-group input:focus,
        .filter-group select:focus,
        .filter-group textarea:focus {
            border: 1px solid var(--acc);
        }
        .news-card {
            background: rgba(17,24,39,.7);
            border: 1px solid rgba(255,255,255,.06);
            border-radius: 14px;
            padding: 20px;
            margin-bottom: 15px;
        }
        .news-title {
            font-size: 1.2em;
            font-weight: 600;
            color: var(--text);
            margin: 0 0 10px 0;
        }
        .news-meta {
            display: flex;
            gap: 15px;
            flex-wrap: wrap;
            margin-bottom: 10px;
        }
        .meta-item {
            background: rgba(255,255,255,.08);
            padding: 4px 8px;
            border-radius: 6px;
            font-size: 0.9em;
            color: var(--muted);
        }
        .category-badge {
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 0.85em;
            font-weight: 500;
        }
        .category-report { background: rgba(34,197,94,.2); color: #22c55e; }
        .category-blog { background: rgba(59,130,246,.2); color: #3b82f6; }
        .category-news { background: rgba(168,85,247,.2); color: #a855f7; }
        .featured-badge {
            background: rgba(245,158,11,.2);
            color: #f59e0b;
            padding: 4px 8px;
            border-radius: 6px;
            font-size: 0.85em;
            font-weight: 500;
        }
        .news-actions {
            display: flex;
            gap: 10px;
            margin-top: 15px;
        }
        .btn {
            padding: 8px 16px;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            text-decoration: none;
            display: inline-block;
            font-size: 0.9em;
            transition: transform .05s ease-in;
        }
        .btn:active { transform: translateY(1px); }
        .btn-primary { background: linear-gradient(90deg,var(--acc),var(--acc-2)); color: white; }
        .btn-success { background: #22c55e; color: white; }
        .btn-warning { background: #f59e0b; color: white; }
        .btn-danger { background: #ef4444; color: white; }
        .btn-secondary { background: rgba(255,255,255,.1); color: var(--text); border: 1px solid rgba(255,255,255,.2); }
        .btn-sm { padding: 6px 12px; font-size: 0.8em; }
        .results-count {
            color: var(--muted);
            margin-bottom: 15px;
            font-size: 14px;
        }
        .alert {
            padding: 12px 16px;
            border-radius: 8px;
            margin-bottom: 16px;
            font-size: 14px;
        }
        .alert-success {
            background: rgba(34,197,94,.1);
            border: 1px solid rgba(34,197,94,.3);
            color: #22c55e;
        }
        .alert-danger {
            background: rgba(239,68,68,.1);
            border: 1px solid rgba(239,68,68,.3);
            color: #ef4444;
        }
        .alert-info {
            background: rgba(59,130,246,.1);
            border: 1px solid rgba(59,130,246,.3);
            color: #3b82f6;
        }
        .news-image {
            height: 60px;
            width: 80px;
            object-fit: cover;
            border-radius: 4px;
        }
        .news-content {
            max-height: 100px;
            overflow: hidden;
            color: var(--muted);
            font-size: 0.9em;
            line-height: 1.4;
        }
    </style>
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
        if (!ta || !window.Quill) return;
        var editor = document.createElement('div');
        editor.id = 'editor-content';
        editor.style.minHeight = '220px';
        editor.innerHTML = ta.value || '';
        ta.style.display = 'none';
        ta.parentNode.insertBefore(editor, ta);
        
        // Excerpt editor
        var texcerpt = document.querySelector('textarea[name="excerpt"]');
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

        // Keep textareas synced
        q.on('text-change', function(){ ta.value = q.root.innerHTML; });
        if (qx && texcerpt) qx.on('text-change', function(){ texcerpt.value = qx.root.innerHTML; });

        // Custom image upload handler
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
        <a href="../opportunities/index.php" class="menu-item">Career Opportunities</a>
      </nav>
      <form action="../logout.php" method="post">
        <button class="btn-logout" type="submit">Logout</button>
      </form>
    </aside>

    <main class="content">
      <header class="topbar">
        <h1>Manage News</h1>
        <div class="header-actions">
          <button onclick="showAddNewsForm()" class="btn btn-success">Add New Article</button>
        </div>
      </header>

      <?php if ($flash): ?>
        <div class="alert alert-success"><?php echo $flash; ?></div>
      <?php endif; ?>

      <!-- Add New News Form -->
      <div id="addNewsForm" class="search-filters" style="display: none;">
        <h3 style="color: var(--text); margin-bottom: 20px;">Add New Article</h3>
        <form action="add.php" method="post" enctype="multipart/form-data">
          <div class="filter-row">
            <div class="filter-group">
              <label for="title">Title</label>
              <input type="text" id="title" name="title" required placeholder="News title" />
            </div>
            <div class="filter-group">
              <label for="category">Category</label>
              <select id="category" name="category" required>
                <option value="Report">Report</option>
                <option value="Blog">Blog</option>
                <option value="News">News</option>
              </select>
            </div>
            <div class="filter-group">
              <label for="link">Link (optional)</label>
              <input type="url" id="link" name="link" placeholder="https://..." />
            </div>
            <div class="filter-group">
              <label for="image">Cover Image (optional)</label>
              <input type="file" id="image" name="image" accept="image/png,image/jpeg,image/jpg" />
            </div>
            <div class="filter-group">
              <label>
                <input type="checkbox" name="is_featured" value="1" /> Featured
              </label>
            </div>
          </div>
          <div class="filter-row">
            <div class="filter-group" style="flex: 1;">
              <label for="excerpt">Excerpt (short summary)</label>
              <textarea id="excerpt" name="excerpt" placeholder="Short paragraph shown on cards" rows="3"></textarea>
            </div>
          </div>
          <div class="filter-row">
            <div class="filter-group" style="flex: 1;">
              <label for="content">Content</label>
              <textarea id="content" name="content" placeholder="News content" rows="6"></textarea>
            </div>
          </div>
          <div class="filter-row">
            <div class="filter-group">
              <button type="submit" class="btn btn-primary">Add Article</button>
              <button type="button" class="btn btn-secondary" onclick="hideAddNewsForm()">Cancel</button>
            </div>
          </div>
        </form>
      </div>

      <!-- News List -->
      <div class="results-count">Found <?php echo count($news); ?> article(s)</div>
      
      <div class="news-list">
        <?php foreach ($news as $n): ?>
        <div class="news-card">
          <div class="news-title"><?php echo htmlspecialchars($n['title']); ?></div>
          <div class="news-meta">
            <div class="meta-item">ID: <?php echo (int)$n['id']; ?></div>
            <div class="meta-item">Created: <?php echo date('Y-m-d H:i', strtotime($n['created_at'])); ?></div>
            <?php if ($n['link']): ?>
            <div class="meta-item">
              <a href="<?php echo htmlspecialchars($n['link']); ?>" target="_blank" style="color: var(--acc); text-decoration: none;">
                External Link
              </a>
            </div>
            <?php endif; ?>
          </div>
          <div style="display: flex; gap: 10px; margin-bottom: 15px; align-items: center;">
            <span class="category-badge category-<?php echo strtolower($n['category']); ?>">
              <?php echo htmlspecialchars($n['category']); ?>
            </span>
            <?php if ($n['is_featured']): ?>
            <span class="featured-badge">★ Featured</span>
            <?php endif; ?>
          </div>
          <?php if ($n['image']): ?>
          <div style="margin-bottom: 15px;">
            <img class="news-image" src="<?php echo htmlspecialchars($n['image']); ?>" alt="<?php echo htmlspecialchars($n['title']); ?>" />
          </div>
          <?php endif; ?>
          <?php if ($n['content']): ?>
          <div class="news-content">
            <?php echo htmlspecialchars(substr(strip_tags($n['content']), 0, 200)) . '...'; ?>
          </div>
          <?php endif; ?>
          <div class="news-actions">
            <a href="edit.php?id=<?php echo (int)$n['id']; ?>" class="btn btn-secondary btn-sm">Edit</a>
            <form action="delete.php" method="post" onsubmit="return confirm('Delete this article?');" style="display:inline">
              <input type="hidden" name="id" value="<?php echo (int)$n['id']; ?>" />
              <button class="btn btn-danger btn-sm" type="submit">Delete</button>
            </form>
          </div>
        </div>
        <?php endforeach; ?>
      </div>
    </main>

    <script>
      function showAddNewsForm() {
        document.getElementById('addNewsForm').style.display = 'block';
      }

      function hideAddNewsForm() {
        document.getElementById('addNewsForm').style.display = 'none';
      }
    </script>
  </body>
</html>
