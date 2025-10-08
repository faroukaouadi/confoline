<?php
session_start();
require_once '../config.php';

// Check if user is logged in
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header('Location: ../index.php');
    exit();
}

require_once '../db.php';

$opportunity = null;
$error = '';

// Get opportunity ID
$id = isset($_GET['id']) ? (int)$_GET['id'] : 0;

if ($id <= 0) {
    header('Location: index.php');
    exit();
}

try {
    $pdo = get_pdo();
    
    $stmt = $pdo->prepare("SELECT * FROM opportunities WHERE id = ?");
    $stmt->execute([$id]);
    $opportunity = $stmt->fetch();
    
    if (!$opportunity) {
        header('Location: index.php');
        exit();
    }
    
} catch (Exception $e) {
    $error = "Database error: " . $e->getMessage();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>View Opportunity - Admin Panel</title>
    <link rel="stylesheet" href="../styles.css">
    <style>
        .opportunity-detail {
            max-width: 900px;
            margin: 0 auto;
        }
        .opportunity-header {
            background: rgba(17,24,39,.7);
            border: 1px solid rgba(255,255,255,.06);
            border-radius: 14px;
            padding: 30px;
            margin-bottom: 30px;
        }
        .opportunity-title {
            font-size: 2em;
            font-weight: 600;
            color: var(--text);
            margin: 0 0 15px 0;
        }
        .opportunity-meta {
            display: flex;
            gap: 20px;
            flex-wrap: wrap;
            margin-bottom: 20px;
        }
        .meta-item {
            background: rgba(255,255,255,.08);
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 0.9em;
            color: var(--muted);
        }
        .status-badge {
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 0.9em;
            font-weight: 500;
            display: inline-block;
        }
        .status-open { background: rgba(34,197,94,.2); color: #22c55e; }
        .status-closed { background: rgba(239,68,68,.2); color: #ef4444; }
        .status-on-hold { background: rgba(245,158,11,.2); color: #f59e0b; }
        .opportunity-content {
            display: grid;
            gap: 30px;
        }
        .content-section {
            background: rgba(17,24,39,.7);
            border: 1px solid rgba(255,255,255,.06);
            border-radius: 14px;
            padding: 25px;
        }
        .content-section h3 {
            color: var(--text);
            margin: 0 0 15px 0;
            font-size: 1.3em;
        }
        .content-section p {
            line-height: 1.6;
            color: var(--muted);
            margin: 0;
        }
        .content-section ul {
            margin: 0;
            padding-left: 20px;
        }
        .content-section li {
            margin-bottom: 8px;
            line-height: 1.5;
            color: var(--muted);
        }
        .actions {
            display: flex;
            gap: 15px;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid rgba(255,255,255,.06);
        }
        .btn {
            padding: 12px 16px;
            border: none;
            border-radius: 10px;
            cursor: pointer;
            text-decoration: none;
            display: inline-block;
            font-size: 14px;
            font-weight: 600;
            transition: transform .05s ease-in;
        }
        .btn:active { transform: translateY(1px); }
        .btn-primary { background: linear-gradient(90deg,var(--acc),var(--acc-2)); color: white; }
        .btn-secondary { background: rgba(255,255,255,.1); color: var(--text); border: 1px solid rgba(255,255,255,.2); }
        .btn-danger { background: #ef4444; color: white; }
        .alert {
            padding: 12px 16px;
            border-radius: 8px;
            margin-bottom: 16px;
            font-size: 14px;
        }
        .alert-danger {
            background: rgba(239,68,68,.1);
            border: 1px solid rgba(239,68,68,.3);
            color: #ef4444;
        }
    </style>
</head>
<body class="dash-body">
    <aside class="sidebar">
        <div class="brand">Confoline Admin</div>
        <nav class="menu">
            <a href="../dashboard.php" class="menu-item">Dashboard</a>
            <a href="../home-partners/index.php" class="menu-item">Home Partners</a>
            <a href="../partners/index.php" class="menu-item">Partners</a>
            <a href="../news/index.php" class="menu-item">News</a>
            <a href="../gallery/index.php" class="menu-item">Gallery</a>
            <a href="index.php" class="menu-item active">Career Opportunities</a>
            <a href="#" class="menu-item">Settings</a>
        </nav>
        <form action="../logout.php" method="post">
            <button class="btn-logout" type="submit">Logout</button>
        </form>
    </aside>

    <main class="content">
        <header class="topbar">
            <h1>View Opportunity</h1>
            <div class="header-actions">
                <a href="edit.php?id=<?php echo $id; ?>" class="btn btn-primary">Edit</a>
                <a href="index.php" class="btn btn-secondary">Back to List</a>
            </div>
        </header>

        <?php if ($error): ?>
            <div class="alert alert-danger"><?php echo htmlspecialchars($error); ?></div>
        <?php endif; ?>

        <?php if ($opportunity): ?>
            <div class="opportunity-detail">
                <div class="opportunity-header">
                    <h1 class="opportunity-title"><?php echo htmlspecialchars($opportunity['title']); ?></h1>
                    
                    <div class="opportunity-meta">
                        <span class="meta-item"><?php echo htmlspecialchars($opportunity['department']); ?></span>
                        <span class="meta-item"><?php echo htmlspecialchars($opportunity['location']); ?></span>
                        <span class="meta-item"><?php echo htmlspecialchars($opportunity['work_type']); ?></span>
                        <span class="meta-item"><?php echo htmlspecialchars($opportunity['experience_level']); ?></span>
                        <?php if ($opportunity['salary_range']): ?>
                            <span class="meta-item"><?php echo htmlspecialchars($opportunity['salary_range']); ?></span>
                        <?php endif; ?>
                    </div>
                    
                    <div class="status-badge status-<?php echo strtolower(str_replace('-', '-', $opportunity['status'])); ?>">
                        <?php echo htmlspecialchars($opportunity['status']); ?>
                    </div>
                </div>

                <div class="opportunity-content">
                    <div class="content-section">
                        <h3>Job Description</h3>
                        <p><?php echo nl2br(htmlspecialchars($opportunity['description'])); ?></p>
                    </div>

                    <?php if ($opportunity['responsibilities']): ?>
                        <div class="content-section">
                            <h3>Key Responsibilities</h3>
                            <ul>
                                <?php foreach (explode("\n", $opportunity['responsibilities']) as $responsibility): ?>
                                    <?php if (trim($responsibility)): ?>
                                        <li><?php echo htmlspecialchars(trim($responsibility)); ?></li>
                                    <?php endif; ?>
                                <?php endforeach; ?>
                            </ul>
                        </div>
                    <?php endif; ?>

                    <?php if ($opportunity['requirements']): ?>
                        <div class="content-section">
                            <h3>Requirements</h3>
                            <ul>
                                <?php foreach (explode("\n", $opportunity['requirements']) as $requirement): ?>
                                    <?php if (trim($requirement)): ?>
                                        <li><?php echo htmlspecialchars(trim($requirement)); ?></li>
                                    <?php endif; ?>
                                <?php endforeach; ?>
                            </ul>
                        </div>
                    <?php endif; ?>

                    <?php if ($opportunity['benefits']): ?>
                        <div class="content-section">
                            <h3>Benefits & Perks</h3>
                            <ul>
                                <?php foreach (explode("\n", $opportunity['benefits']) as $benefit): ?>
                                    <?php if (trim($benefit)): ?>
                                        <li><?php echo htmlspecialchars(trim($benefit)); ?></li>
                                    <?php endif; ?>
                                <?php endforeach; ?>
                            </ul>
                        </div>
                    <?php endif; ?>

                    <div class="content-section">
                        <h3>Additional Information</h3>
                        <p><strong>Posted:</strong> <?php echo date('F j, Y', strtotime($opportunity['posted_date'])); ?></p>
                        <?php if ($opportunity['application_deadline']): ?>
                            <p><strong>Application Deadline:</strong> <?php echo date('F j, Y', strtotime($opportunity['application_deadline'])); ?></p>
                        <?php endif; ?>
                        <p><strong>Last Updated:</strong> <?php echo date('F j, Y g:i A', strtotime($opportunity['updated_at'])); ?></p>
                    </div>
                </div>

                <div class="actions">
                    <a href="edit.php?id=<?php echo $id; ?>" class="btn btn-primary">Edit Opportunity</a>
                    <a href="delete.php?id=<?php echo $id; ?>" 
                       class="btn btn-danger" 
                       onclick="return confirm('Are you sure you want to delete this opportunity?')">Delete Opportunity</a>
                    <a href="index.php" class="btn btn-secondary">Back to List</a>
                </div>
            </div>
        <?php endif; ?>
    </main>
</body>
</html>
