<?php
session_start();
require_once '../db.php';

// Vérifier si l'utilisateur est connecté et est admin
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header('Location: ../index.php');
    exit();
}

if ($_SESSION['admin_role'] !== 'admin') {
    header('Location: ../dashboard.php');
    exit();
}

$message = '';
$error = '';

// Traitement des actions
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'] ?? '';
    
    try {
        $pdo = get_pdo();
        
        switch ($action) {
            case 'create_user':
                $username = $_POST['username'] ?? '';
                $password = $_POST['password'] ?? '';
                $email = $_POST['email'] ?? '';
                $role = $_POST['role'] ?? 'user';
                
                if (empty($username) || empty($password)) {
                    $error = 'Username and password are required';
                } else {
                    // Vérifier si l'username existe déjà
                    $stmt = $pdo->prepare("SELECT id FROM users WHERE username = ?");
                    $stmt->execute([$username]);
                    if ($stmt->fetch()) {
                        $error = 'Username already exists';
                    } else {
                        $stmt = $pdo->prepare("INSERT INTO users (username, password, email, role) VALUES (?, ?, ?, ?)");
                        if ($stmt->execute([$username, $password, $email, $role])) {
                            $message = 'User created successfully';
                        } else {
                            $error = 'Failed to create user';
                        }
                    }
                }
                break;
                
            case 'update_user':
                $userId = $_POST['user_id'] ?? '';
                $username = $_POST['username'] ?? '';
                $email = $_POST['email'] ?? '';
                $role = $_POST['role'] ?? '';
                
                if (!empty($userId)) {
                    $stmt = $pdo->prepare("UPDATE users SET username = ?, email = ?, role = ? WHERE id = ?");
                    if ($stmt->execute([$username, $email, $role, $userId])) {
                        $message = 'User updated successfully';
                    } else {
                        $error = 'Failed to update user';
                    }
                }
                break;
                
            case 'change_password':
                $userId = $_POST['user_id'] ?? '';
                $newPassword = $_POST['new_password'] ?? '';
                
                if (!empty($userId) && !empty($newPassword)) {
                    $stmt = $pdo->prepare("UPDATE users SET password = ? WHERE id = ?");
                    if ($stmt->execute([$newPassword, $userId])) {
                        $message = 'Password changed successfully';
                    } else {
                        $error = 'Failed to change password';
                    }
                }
                break;
                
            case 'delete_user':
                $userId = $_POST['user_id'] ?? '';
                if (!empty($userId)) {
                    // Ne pas permettre de supprimer l'admin principal
                    $stmt = $pdo->prepare("SELECT username FROM users WHERE id = ?");
                    $stmt->execute([$userId]);
                    $user = $stmt->fetch();
                    
                    if ($user && $user['username'] === 'admin') {
                        $error = 'Cannot delete main admin user';
                    } else {
                        $stmt = $pdo->prepare("DELETE FROM users WHERE id = ?");
                        if ($stmt->execute([$userId])) {
                            $message = 'User deleted successfully';
                        } else {
                            $error = 'Failed to delete user';
                        }
                    }
                }
                break;
        }
    } catch (Exception $e) {
        $error = 'Database error: ' . $e->getMessage();
    }
}

// Récupérer la liste des utilisateurs
try {
    $pdo = get_pdo();
    $stmt = $pdo->prepare("SELECT * FROM users ORDER BY created_at DESC");
    $stmt->execute();
    $users = $stmt->fetchAll();
} catch (Exception $e) {
    $users = [];
    $error = 'Failed to load users';
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Users Management - Confoline Admin</title>
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
        .user-card {
            background: rgba(17,24,39,.7);
            border: 1px solid rgba(255,255,255,.06);
            border-radius: 14px;
            padding: 20px;
            margin-bottom: 15px;
        }
        .user-title {
            font-size: 1.2em;
            font-weight: 600;
            color: var(--text);
            margin: 0 0 10px 0;
        }
        .user-meta {
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
        .status-admin { background: rgba(239,68,68,.2); color: #ef4444; }
        .status-user { background: rgba(59,130,246,.2); color: #3b82f6; }
        .status-active { background: rgba(34,197,94,.2); color: #22c55e; }
        .status-inactive { background: rgba(107,114,128,.2); color: #6b7280; }
        .user-actions {
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
        .modal {
            position: fixed;
            z-index: 1000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.7);
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .modal-content {
            background: rgba(17,24,39,.95);
            border: 1px solid rgba(255,255,255,.1);
            border-radius: 14px;
            padding: 30px;
            width: 90%;
            max-width: 500px;
            backdrop-filter: blur(10px);
        }
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }
        .modal-header h3 {
            color: var(--text);
            margin: 0;
        }
        .close {
            font-size: 24px;
            font-weight: bold;
            cursor: pointer;
            color: var(--muted);
        }
        .close:hover {
            color: var(--text);
        }
        .form-group {
            margin-bottom: 20px;
        }
        .form-group label {
            display: block;
            margin-bottom: 8px;
            color: var(--text);
            font-weight: 500;
        }
        .form-group input,
        .form-group select {
            width: 100%;
            background: #0b1220;
            border: 1px solid rgba(255,255,255,.08);
            color: var(--text);
            padding: 12px;
            border-radius: 8px;
            outline: none;
            transition: border .2s;
        }
        .form-group input:focus,
        .form-group select:focus {
            border: 1px solid var(--acc);
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
            <a href="../opportunities/index.php" class="menu-item">Career Opportunities</a>
            <a href="index.php" class="menu-item active">Users</a>
            <a href="#" class="menu-item">Settings</a>
        </nav>
        <form action="../logout.php" method="post">
            <button class="btn-logout" type="submit">Logout</button>
        </form>
    </aside>

    <main class="content">
        <header class="topbar">
            <h1>Users Management</h1>
            <div class="header-actions">
                <button onclick="showAddUserForm()" class="btn btn-success">Add New User</button>
            </div>
        </header>

        <?php if ($error): ?>
            <div class="alert alert-danger"><?php echo htmlspecialchars($error); ?></div>
        <?php endif; ?>

        <?php if ($message): ?>
            <div class="alert alert-success"><?php echo htmlspecialchars($message); ?></div>
        <?php endif; ?>

        <!-- Add New User Form -->
        <div id="addUserForm" class="search-filters" style="display: none;">
            <h3 style="color: var(--text); margin-bottom: 20px;">Add New User</h3>
            <form method="POST">
                <input type="hidden" name="action" value="create_user">
                
                <div class="filter-row">
                    <div class="filter-group">
                        <label for="username">Username</label>
                        <input type="text" id="username" name="username" required>
                    </div>
                    
                    <div class="filter-group">
                        <label for="password">Password</label>
                        <input type="password" id="password" name="password" required>
                    </div>
                    
                    <div class="filter-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" name="email">
                    </div>
                    
                    <div class="filter-group">
                        <label for="role">Role</label>
                        <select id="role" name="role">
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    
                    <div class="filter-group">
                        <button type="submit" class="btn btn-primary">Create User</button>
                        <button type="button" class="btn btn-secondary" onclick="hideAddUserForm()">Cancel</button>
                    </div>
                </div>
            </form>
        </div>

        <!-- Users List -->
        <div class="results-count">Found <?php echo count($users); ?> user(s)</div>
        
        <div class="users-list">
            <?php foreach ($users as $user): ?>
            <div class="user-card">
                <div class="user-title"><?php echo htmlspecialchars($user['username']); ?></div>
                <div class="user-meta">
                    <div class="meta-item">ID: <?php echo htmlspecialchars($user['id']); ?></div>
                    <div class="meta-item">Email: <?php echo htmlspecialchars($user['email'] ?? 'Not set'); ?></div>
                    <div class="meta-item">Created: <?php echo date('Y-m-d H:i', strtotime($user['created_at'])); ?></div>
                </div>
                <div style="display: flex; gap: 10px; margin-bottom: 15px;">
                    <span class="status-badge status-<?php echo $user['role']; ?>">
                        <?php echo ucfirst($user['role']); ?>
                    </span>
                    <span class="status-badge status-<?php echo $user['is_active'] ? 'active' : 'inactive'; ?>">
                        <?php echo $user['is_active'] ? 'Active' : 'Inactive'; ?>
                    </span>
                </div>
                <div class="user-actions">
                    <button class="btn btn-secondary btn-sm" onclick="editUser(<?php echo $user['id']; ?>, '<?php echo htmlspecialchars($user['username']); ?>', '<?php echo htmlspecialchars($user['email'] ?? ''); ?>', '<?php echo $user['role']; ?>')">
                        Edit
                    </button>
                    <button class="btn btn-warning btn-sm" onclick="changePassword(<?php echo $user['id']; ?>)">
                        Password
                    </button>
                    <?php if ($user['username'] !== 'admin'): ?>
                    <button class="btn btn-danger btn-sm" onclick="deleteUser(<?php echo $user['id']; ?>)">
                        Delete
                    </button>
                    <?php endif; ?>
                </div>
            </div>
            <?php endforeach; ?>
        </div>
    </main>

    <!-- Edit User Modal -->
    <div id="editModal" class="modal" style="display: none;">
        <div class="modal-content">
            <div class="modal-header">
                <h3>Edit User</h3>
                <span class="close" onclick="closeModal()">&times;</span>
            </div>
            <form method="POST">
                <input type="hidden" name="action" value="update_user">
                <input type="hidden" name="user_id" id="edit_user_id">
                
                <div class="form-group">
                    <label for="edit_username">Username</label>
                    <input type="text" id="edit_username" name="username" required>
                </div>
                
                <div class="form-group">
                    <label for="edit_email">Email</label>
                    <input type="email" id="edit_email" name="email">
                </div>
                
                <div class="form-group">
                    <label for="edit_role">Role</label>
                    <select id="edit_role" name="role">
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <button type="submit" class="btn btn-primary">Save Changes</button>
                    <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancel</button>
                </div>
            </form>
        </div>
    </div>

    <!-- Change Password Modal -->
    <div id="passwordModal" class="modal" style="display: none;">
        <div class="modal-content">
            <div class="modal-header">
                <h3>Change Password</h3>
                <span class="close" onclick="closePasswordModal()">&times;</span>
            </div>
            <form method="POST">
                <input type="hidden" name="action" value="change_password">
                <input type="hidden" name="user_id" id="password_user_id">
                
                <div class="form-group">
                    <label for="new_password">New Password</label>
                    <input type="password" id="new_password" name="new_password" required>
                </div>
                
                <div class="form-group">
                    <button type="submit" class="btn btn-primary">Change Password</button>
                    <button type="button" class="btn btn-secondary" onclick="closePasswordModal()">Cancel</button>
                </div>
            </form>
        </div>
    </div>

    <!-- Delete User Form -->
    <form id="deleteForm" method="POST" style="display: none;">
        <input type="hidden" name="action" value="delete_user">
        <input type="hidden" name="user_id" id="delete_user_id">
    </form>

    <script>
        function showAddUserForm() {
            document.getElementById('addUserForm').style.display = 'block';
        }

        function hideAddUserForm() {
            document.getElementById('addUserForm').style.display = 'none';
        }

        function editUser(id, username, email, role) {
            document.getElementById('edit_user_id').value = id;
            document.getElementById('edit_username').value = username;
            document.getElementById('edit_email').value = email;
            document.getElementById('edit_role').value = role;
            document.getElementById('editModal').style.display = 'flex';
        }

        function changePassword(id) {
            document.getElementById('password_user_id').value = id;
            document.getElementById('passwordModal').style.display = 'flex';
        }

        function deleteUser(id) {
            if (confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
                document.getElementById('delete_user_id').value = id;
                document.getElementById('deleteForm').submit();
            }
        }

        function closeModal() {
            document.getElementById('editModal').style.display = 'none';
        }

        function closePasswordModal() {
            document.getElementById('passwordModal').style.display = 'none';
        }

        // Close modal when clicking outside
        window.onclick = function(event) {
            const editModal = document.getElementById('editModal');
            const passwordModal = document.getElementById('passwordModal');
            if (event.target === editModal) {
                closeModal();
            }
            if (event.target === passwordModal) {
                closePasswordModal();
            }
        }
    </script>
</body>
</html>
