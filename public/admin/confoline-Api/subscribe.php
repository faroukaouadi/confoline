<?php
// En-têtes pour les requêtes API
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // à restreindre plus tard si besoin
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Test endpoint for GET requests
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    echo json_encode([
        'success' => true,
        'message' => 'Subscribe API is working',
        'timestamp' => date('Y-m-d H:i:s')
    ]);
    exit();
}

// Utiliser la configuration existante
require_once __DIR__ . '/../db.php';

try {
    $pdo = get_pdo();
} catch (Exception $e) {
    echo json_encode(['success' => false, 'error' => 'Database connection failed']);
    exit;
}

// --- 2️⃣ Lecture du corps de la requête ---
$input = json_decode(file_get_contents('php://input'), true);

if (!isset($input['email']) || empty(trim($input['email']))) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Email is required']);
    exit;
}

$email = trim($input['email']);

// --- 3️⃣ Validation de l'email ---
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid email format']);
    exit;
}

// --- 4️⃣ Vérification si l'email existe déjà ---
try {
    $check = $pdo->prepare("SELECT id, status FROM subscribers WHERE email = ?");
    $check->execute([$email]);
    $existing = $check->fetch();
    
    if ($existing) {
        if ($existing['status'] === 'active') {
            http_response_code(409);
            echo json_encode(['success' => false, 'error' => 'Email already subscribed']);
            exit;
        } else {
            // Réactiver un email désabonné
            $stmt = $pdo->prepare("UPDATE subscribers SET status = 'active', updated_at = NOW() WHERE email = ?");
            $stmt->execute([$email]);
            echo json_encode(['success' => true, 'message' => 'Email subscription reactivated successfully']);
            exit;
        }
    }
} catch (PDOException $e) {
    error_log('Database check error: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Database check error']);
    exit;
}

// --- 5️⃣ Insertion dans la table ---
try {
    $stmt = $pdo->prepare("INSERT INTO subscribers (email, status, created_at, updated_at) VALUES (?, 'active', NOW(), NOW())");
    $stmt->execute([$email]);
    echo json_encode(['success' => true, 'message' => 'Email subscription successful']);
} catch (PDOException $e) {
    error_log('Database insert error: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Database insert error']);
}
