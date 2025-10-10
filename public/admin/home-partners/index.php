<?php
session_start();
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header('Location: ../index.php');
    exit();
}
require_once __DIR__ . '/../db.php';

$pdo = get_pdo();
$partnersWhite = $pdo->query('SELECT id, name, src, link, created_at FROM partners_white ORDER BY created_at DESC')->fetchAll();
$flash = isset($_GET['msg']) ? htmlspecialchars($_GET['msg']) : '';
?>
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Manage Partners</title>
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
        .filter-group select {
            background: #0b1220;
            border: 1px solid rgba(255,255,255,.08);
            color: var(--text);
            padding: 10px 12px;
            border-radius: 8px;
            outline: none;
            transition: border .2s;
        }
        .filter-group input:focus,
        .filter-group select:focus {
            border: 1px solid var(--acc);
        }
        .partner-card {
            background: rgba(17,24,39,.7);
            border: 1px solid rgba(255,255,255,.06);
            border-radius: 14px;
            padding: 20px;
            margin-bottom: 15px;
        }
        .partner-title {
            font-size: 1.2em;
            font-weight: 600;
            color: var(--text);
            margin: 0 0 10px 0;
        }
        .partner-meta {
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
        .partner-actions {
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
        .partner-logo {
            height: 40px;
            width: auto;
            object-fit: contain;
            border-radius: 4px;
        }
    </style>
  </head>
  <body class="dash-body">
    <aside class="sidebar">
      <div class="brand">Confoline Admin</div>
      <nav class="menu">
        <a href="../dashboard.php" class="menu-item">Dashboard</a>
        <a href="./index.php" class="menu-item active">Home Partners</a>
        <a href="../partners/index.php" class="menu-item ">Partners</a>
        <a href="../news/index.php" class="menu-item">News</a>
        <a href="../gallery/index.php" class="menu-item">Gallery</a>
        <a href="../opportunities/index.php" class="menu-item">Career Opportunities</a>
      </nav>
      <form action="../logout.php" method="post">
        <button class="btn-logout" type="submit">Logout</button>
      </form>
    </aside>

    <main class="content">
      <header class="topbar">
        <h1>Manage Home Partners</h1>
        <div class="header-actions">
          <button onclick="showAddPartnerForm()" class="btn btn-success">Add New Home Partner</button>
        </div>
      </header>

      <?php if ($flash): ?>
        <div class="alert alert-success"><?php echo $flash; ?></div>
      <?php endif; ?>

      <!-- Add New Home Partner Form -->
      <div id="addPartnerForm" class="search-filters" style="display: none;">
        <h3 style="color: var(--text); margin-bottom: 20px;">Add New Home Partner</h3>
        <form action="upload.php" method="post" enctype="multipart/form-data">
          <div class="filter-row">
            <div class="filter-group">
              <label for="name">Partner Name</label>
              <input type="text" id="name" name="name" required placeholder="e.g. OpenText" />
            </div>
            <div class="filter-group">
              <label for="link">Website Link</label>
              <input type="url" id="link" name="link" required placeholder="https://..." />
            </div>
            <div class="filter-group">
              <label for="logo">Logo (PNG/JPG/SVG)</label>
              <input type="file" id="logo" name="logo" accept="image/png,image/jpeg,image/jpg,image/svg+xml" required />
            </div>
            <div class="filter-group">
              <button type="submit" class="btn btn-primary">Add Home Partner</button>
              <button type="button" class="btn btn-secondary" onclick="hideAddPartnerForm()">Cancel</button>
            </div>
          </div>
        </form>
      </div>

      <!-- Home Partners List -->
      <div class="results-count">Found <?php echo count($partnersWhite); ?> home partner(s)</div>
      
      <div class="partners-list">
        <?php foreach ($partnersWhite as $p): ?>
        <div class="partner-card">
          <div class="partner-title"><?php echo htmlspecialchars($p['name']); ?></div>
          <div class="partner-meta">
            <div class="meta-item">ID: <?php echo (int)$p['id']; ?></div>
            <div class="meta-item">Created: <?php echo date('Y-m-d H:i', strtotime($p['created_at'])); ?></div>
          </div>
          <div style="display: flex; gap: 15px; align-items: center; margin-bottom: 15px;">
            <img class="partner-logo" src="<?php echo htmlspecialchars($p['src']); ?>" alt="<?php echo htmlspecialchars($p['name']); ?> logo" />
            <div>
              <a href="<?php echo htmlspecialchars($p['link']); ?>" target="_blank" style="color: var(--acc); text-decoration: none;">
                <?php echo htmlspecialchars($p['link']); ?>
              </a>
            </div>
          </div>
          <div class="partner-actions">
            <form action="remove.php" method="post" onsubmit="return confirm('Delete this home partner?');" style="display:inline">
              <input type="hidden" name="id" value="<?php echo (int)$p['id']; ?>" />
              <button class="btn btn-danger btn-sm" type="submit">Delete</button>
            </form>
          </div>
        </div>
        <?php endforeach; ?>
      </div>
    </main>

    <script>
      function showAddPartnerForm() {
        document.getElementById('addPartnerForm').style.display = 'block';
      }

      function hideAddPartnerForm() {
        document.getElementById('addPartnerForm').style.display = 'none';
      }
    </script>
  </body>
 </html>


