<?php
session_start();
require_once '../config.php';

// Check if user is logged in
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header('Location: ../index.php');
    exit();
}

require_once '../db.php';

$success = '';
$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $pdo = get_pdo();
        
        $title = trim($_POST['title']);
        $department = trim($_POST['department']);
        $location = trim($_POST['location']);
        $work_type = $_POST['work_type'];
        $status = $_POST['status'];
        $description = trim($_POST['description']);
        $requirements = trim($_POST['requirements']);
        $responsibilities = trim($_POST['responsibilities']);
        $benefits = trim($_POST['benefits']);
        $salary_range = trim($_POST['salary_range']);
        $experience_level = trim($_POST['experience_level']);
        $application_deadline = $_POST['application_deadline'] ?: null;
        
        // Validation
        if (empty($title) || empty($department) || empty($location) || empty($description)) {
            throw new Exception('Please fill in all required fields.');
        }
        
        $stmt = $pdo->prepare("
            INSERT INTO opportunities (
                title, department, location, work_type, status, description,
                requirements, responsibilities, benefits, salary_range,
                experience_level, application_deadline
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ");
        
        $stmt->execute([
            $title, $department, $location, $work_type, $status, $description,
            $requirements, $responsibilities, $benefits, $salary_range,
            $experience_level, $application_deadline
        ]);
        
        $success = 'Opportunity added successfully!';
        
        // Clear form data
        $_POST = [];
        
    } catch (Exception $e) {
        $error = $e->getMessage();
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Add Opportunity - Admin Panel</title>
    <link rel="stylesheet" href="../styles.css">
    <style>
        .form-container {
            max-width: 800px;
            margin: 0 auto;
        }
        .form-group {
            margin-bottom: 20px;
        }
        .form-row {
            display: flex;
            gap: 20px;
        }
        .form-row .form-group {
            flex: 1;
        }
        .form-group label {
            display: block;
            margin-bottom: 5px;
            font-weight: 500;
            color: var(--muted);
            font-size: 13px;
        }
        .form-group input,
        .form-group select,
        .form-group textarea {
            width: 100%;
            padding: 12px 14px;
            background: #0b1220;
            border: 1px solid rgba(255,255,255,.08);
            color: var(--text);
            border-radius: 10px;
            font-size: 14px;
            outline: none;
            transition: border .2s;
            font-family: inherit;
        }
        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
            border: 1px solid var(--acc);
        }
        .form-group textarea {
            min-height: 100px;
            resize: vertical;
        }
        .form-group textarea.large {
            min-height: 150px;
        }
        .required {
            color: #ef4444;
        }
        .form-actions {
            display: flex;
            gap: 10px;
            justify-content: flex-end;
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
            <h1>Add New Opportunity</h1>
            <div class="header-actions">
                <a href="index.php" class="btn btn-secondary">Back to List</a>
            </div>
        </header>

        <?php if ($success): ?>
            <div class="alert alert-success"><?php echo htmlspecialchars($success); ?></div>
        <?php endif; ?>

        <?php if ($error): ?>
            <div class="alert alert-danger"><?php echo htmlspecialchars($error); ?></div>
        <?php endif; ?>

        <div class="form-container">
            <form method="POST" action="">
                <div class="form-row">
                    <div class="form-group">
                        <label for="title">Job Title <span class="required">*</span></label>
                        <input type="text" id="title" name="title" required 
                               value="<?php echo htmlspecialchars($_POST['title'] ?? ''); ?>">
                    </div>
                    <div class="form-group">
                        <label for="department">Department <span class="required">*</span></label>
                        <input type="text" id="department" name="department" required 
                               value="<?php echo htmlspecialchars($_POST['department'] ?? ''); ?>">
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label for="location">Location <span class="required">*</span></label>
                        <input type="text" id="location" name="location" required 
                               value="<?php echo htmlspecialchars($_POST['location'] ?? ''); ?>">
                    </div>
                    <div class="form-group">
                        <label for="work_type">Work Type</label>
                        <select id="work_type" name="work_type">
                            <option value="Full-time" <?php echo ($_POST['work_type'] ?? '') === 'Full-time' ? 'selected' : ''; ?>>Full-time</option>
                            <option value="Part-time" <?php echo ($_POST['work_type'] ?? '') === 'Part-time' ? 'selected' : ''; ?>>Part-time</option>
                            <option value="Contract" <?php echo ($_POST['work_type'] ?? '') === 'Contract' ? 'selected' : ''; ?>>Contract</option>
                            <option value="Remote" <?php echo ($_POST['work_type'] ?? '') === 'Remote' ? 'selected' : ''; ?>>Remote</option>
                        </select>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label for="status">Status</label>
                        <select id="status" name="status">
                            <option value="Open" <?php echo ($_POST['status'] ?? 'Open') === 'Open' ? 'selected' : ''; ?>>Open</option>
                            <option value="Closed" <?php echo ($_POST['status'] ?? '') === 'Closed' ? 'selected' : ''; ?>>Closed</option>
                            <option value="On-hold" <?php echo ($_POST['status'] ?? '') === 'On-hold' ? 'selected' : ''; ?>>On-hold</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="experience_level">Experience Level</label>
                        <select id="experience_level" name="experience_level">
                            <option value="Entry-level" <?php echo ($_POST['experience_level'] ?? '') === 'Entry-level' ? 'selected' : ''; ?>>Entry-level</option>
                            <option value="Mid-level" <?php echo ($_POST['experience_level'] ?? '') === 'Mid-level' ? 'selected' : ''; ?>>Mid-level</option>
                            <option value="Senior" <?php echo ($_POST['experience_level'] ?? '') === 'Senior' ? 'selected' : ''; ?>>Senior</option>
                            <option value="Executive" <?php echo ($_POST['experience_level'] ?? '') === 'Executive' ? 'selected' : ''; ?>>Executive</option>
                        </select>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label for="salary_range">Salary Range</label>
                        <input type="text" id="salary_range" name="salary_range" 
                               placeholder="e.g., $50,000 - $80,000"
                               value="<?php echo htmlspecialchars($_POST['salary_range'] ?? ''); ?>">
                    </div>
                    <div class="form-group">
                        <label for="application_deadline">Application Deadline</label>
                        <input type="date" id="application_deadline" name="application_deadline" 
                               value="<?php echo htmlspecialchars($_POST['application_deadline'] ?? ''); ?>">
                    </div>
                </div>

                <div class="form-group">
                    <label for="description">Job Description <span class="required">*</span></label>
                    <textarea id="description" name="description" class="large" required 
                              placeholder="Describe the role, what the candidate will do, and what makes this opportunity exciting..."><?php echo htmlspecialchars($_POST['description'] ?? ''); ?></textarea>
                </div>

                <div class="form-group">
                    <label for="requirements">Requirements</label>
                    <textarea id="requirements" name="requirements" 
                              placeholder="List the required skills, experience, and qualifications..."><?php echo htmlspecialchars($_POST['requirements'] ?? ''); ?></textarea>
                </div>

                <div class="form-group">
                    <label for="responsibilities">Key Responsibilities</label>
                    <textarea id="responsibilities" name="responsibilities" 
                              placeholder="List the main responsibilities and duties..."><?php echo htmlspecialchars($_POST['responsibilities'] ?? ''); ?></textarea>
                </div>

                <div class="form-group">
                    <label for="benefits">Benefits & Perks</label>
                    <textarea id="benefits" name="benefits" 
                              placeholder="List the benefits, perks, and what you offer..."><?php echo htmlspecialchars($_POST['benefits'] ?? ''); ?></textarea>
                </div>

                <div class="form-actions">
                    <a href="index.php" class="btn btn-secondary">Cancel</a>
                    <button type="submit" class="btn btn-primary">Add Opportunity</button>
                </div>
            </form>
        </div>
    </main>
</body>
</html>
