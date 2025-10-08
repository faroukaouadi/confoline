<?php
session_start();
require_once '../config.php';

// Check if user is logged in
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header('Location: ../index.php');
    exit();
}

require_once '../db.php';

// Handle search and filters
$search = isset($_GET['search']) ? trim($_GET['search']) : '';
$department = isset($_GET['department']) ? $_GET['department'] : '';
$status = isset($_GET['status']) ? $_GET['status'] : '';
$work_type = isset($_GET['work_type']) ? $_GET['work_type'] : '';

// Build query
$whereConditions = [];
$params = [];

if (!empty($search)) {
    $whereConditions[] = "(title LIKE ? OR description LIKE ?)";
    $params[] = "%$search%";
    $params[] = "%$search%";
}

if (!empty($department)) {
    $whereConditions[] = "department = ?";
    $params[] = $department;
}

if (!empty($status)) {
    $whereConditions[] = "status = ?";
    $params[] = $status;
}

if (!empty($work_type)) {
    $whereConditions[] = "work_type = ?";
    $params[] = $work_type;
}

$whereClause = !empty($whereConditions) ? "WHERE " . implode(" AND ", $whereConditions) : "";

// Get opportunities
try {
    $pdo = get_pdo();
    
    $sql = "SELECT * FROM opportunities $whereClause ORDER BY created_at DESC";
    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    $opportunities = $stmt->fetchAll();
    
    // Get unique departments for filter
    $deptStmt = $pdo->query("SELECT DISTINCT department FROM opportunities ORDER BY department");
    $departments = $deptStmt->fetchAll(PDO::FETCH_COLUMN);
    
} catch (Exception $e) {
    $error = "Database error: " . $e->getMessage();
    $opportunities = [];
    $departments = [];
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Manage Opportunities - Admin Panel</title>
    <link rel="stylesheet" href="../styles.css">
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
        .opportunity-card {
            background: rgba(17,24,39,.7);
            border: 1px solid rgba(255,255,255,.06);
            border-radius: 14px;
            padding: 20px;
            margin-bottom: 15px;
        }
        .opportunity-title {
            font-size: 1.2em;
            font-weight: 600;
            color: var(--text);
            margin: 0 0 10px 0;
        }
        .opportunity-meta {
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
        .status-badge {
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 0.85em;
            font-weight: 500;
        }
        .status-open { background: rgba(34,197,94,.2); color: #22c55e; }
        .status-closed { background: rgba(239,68,68,.2); color: #ef4444; }
        .status-on-hold { background: rgba(245,158,11,.2); color: #f59e0b; }
        .opportunity-actions {
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
            <h1>Manage Opportunities</h1>
            <div class="header-actions">
                <a href="add.php" class="btn btn-success">Add New Opportunity</a>
            </div>
        </header>

        <?php if (isset($error)): ?>
            <div class="alert alert-danger"><?php echo htmlspecialchars($error); ?></div>
        <?php endif; ?>

        <?php if (isset($_GET['deleted']) && $_GET['deleted'] == '1'): ?>
            <div class="alert alert-success">Opportunity deleted successfully!</div>
        <?php endif; ?>

        <?php if (isset($_GET['error'])): ?>
            <div class="alert alert-danger">Error: <?php echo htmlspecialchars($_GET['error']); ?></div>
        <?php endif; ?>

        <!-- Search and Filters -->
        <div class="search-filters">
            <form method="GET" action="">
                <div class="filter-row">
                    <div class="filter-group">
                        <label for="search">Search</label>
                        <input type="text" id="search" name="search" value="<?php echo htmlspecialchars($search); ?>" 
                               placeholder="Search by title or description...">
                    </div>
                    
                    <div class="filter-group">
                        <label for="department">Department</label>
                        <select id="department" name="department">
                            <option value="">All Departments</option>
                            <?php foreach ($departments as $dept): ?>
                                <option value="<?php echo htmlspecialchars($dept); ?>" 
                                        <?php echo $department === $dept ? 'selected' : ''; ?>>
                                    <?php echo htmlspecialchars($dept); ?>
                                </option>
                            <?php endforeach; ?>
                        </select>
                    </div>
                    
                    <div class="filter-group">
                        <label for="status">Status</label>
                        <select id="status" name="status">
                            <option value="">All Status</option>
                            <option value="Open" <?php echo $status === 'Open' ? 'selected' : ''; ?>>Open</option>
                            <option value="Closed" <?php echo $status === 'Closed' ? 'selected' : ''; ?>>Closed</option>
                            <option value="On-hold" <?php echo $status === 'On-hold' ? 'selected' : ''; ?>>On-hold</option>
                        </select>
                    </div>
                    
                    <div class="filter-group">
                        <label for="work_type">Work Type</label>
                        <select id="work_type" name="work_type">
                            <option value="">All Types</option>
                            <option value="Full-time" <?php echo $work_type === 'Full-time' ? 'selected' : ''; ?>>Full-time</option>
                            <option value="Part-time" <?php echo $work_type === 'Part-time' ? 'selected' : ''; ?>>Part-time</option>
                            <option value="Contract" <?php echo $work_type === 'Contract' ? 'selected' : ''; ?>>Contract</option>
                            <option value="Remote" <?php echo $work_type === 'Remote' ? 'selected' : ''; ?>>Remote</option>
                        </select>
                    </div>
                    
                    <div class="filter-group">
                        <button type="submit" class="btn btn-primary">Filter</button>
                        <a href="index.php" class="btn btn-secondary">Clear</a>
                    </div>
                </div>
            </form>
        </div>

        <!-- Opportunities List -->
        <div class="content">
            <?php if (empty($opportunities)): ?>
                <div class="alert alert-info">
                    No opportunities found matching your criteria.
                </div>
            <?php else: ?>
                <div class="results-count">
                    Found <?php echo count($opportunities); ?> opportunity(ies)
                </div>
                
                <?php foreach ($opportunities as $opportunity): ?>
                    <div class="opportunity-card">
                        <div class="opportunity-header">
                            <div>
                                <h3 class="opportunity-title"><?php echo htmlspecialchars($opportunity['title']); ?></h3>
                                <div class="opportunity-meta">
                                    <span class="meta-item"><?php echo htmlspecialchars($opportunity['department']); ?></span>
                                    <span class="meta-item"><?php echo htmlspecialchars($opportunity['location']); ?></span>
                                    <span class="meta-item"><?php echo htmlspecialchars($opportunity['work_type']); ?></span>
                                    <span class="meta-item"><?php echo htmlspecialchars($opportunity['experience_level']); ?></span>
                                </div>
                                <div class="status-badge status-<?php echo strtolower(str_replace('-', '-', $opportunity['status'])); ?>">
                                    <?php echo htmlspecialchars($opportunity['status']); ?>
                                </div>
                            </div>
                        </div>
                        
                        <div class="opportunity-description">
                            <p><?php echo htmlspecialchars(substr($opportunity['description'], 0, 200)); ?><?php echo strlen($opportunity['description']) > 200 ? '...' : ''; ?></p>
                        </div>
                        
                        <div class="opportunity-actions">
                            <a href="edit.php?id=<?php echo $opportunity['id']; ?>" class="btn btn-primary btn-sm">Edit</a>
                            <a href="view.php?id=<?php echo $opportunity['id']; ?>" class="btn btn-success btn-sm">View</a>
                            <a href="delete.php?id=<?php echo $opportunity['id']; ?>" 
                               class="btn btn-danger btn-sm" 
                               onclick="return confirm('Are you sure you want to delete this opportunity?')">Delete</a>
                        </div>
                    </div>
                <?php endforeach; ?>
            <?php endif; ?>
        </div>
    </main>
</body>
</html>
