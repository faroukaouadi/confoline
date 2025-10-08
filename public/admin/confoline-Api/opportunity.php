<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once '../db.php';

try {
    $pdo = get_pdo();
    
    // Get opportunity ID from query parameter
    $id = isset($_GET['id']) ? (int)$_GET['id'] : 0;
    
    if ($id <= 0) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'error' => 'Invalid opportunity ID'
        ]);
        exit();
    }
    
    // Get specific opportunity
    $stmt = $pdo->prepare("
        SELECT 
            id,
            title,
            department,
            location,
            work_type,
            status,
            description,
            requirements,
            responsibilities,
            benefits,
            salary_range,
            experience_level,
            posted_date,
            application_deadline,
            created_at,
            updated_at
        FROM opportunities 
        WHERE id = ? AND status = 'Open'
    ");
    
    $stmt->execute([$id]);
    $opportunity = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$opportunity) {
        http_response_code(404);
        echo json_encode([
            'success' => false,
            'error' => 'Opportunity not found'
        ]);
        exit();
    }
    
    // Format the response
    $response = [
        'success' => true,
        'data' => $opportunity
    ];
    
    echo json_encode($response, JSON_UNESCAPED_UNICODE);
    
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Database error: ' . $e->getMessage()
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Server error: ' . $e->getMessage()
    ]);
}
?>
