<?php
// Demo request handler for static hosting (e.g., OVH shared hosting)
// Deploy this file under your web root (www/) alongside the static export.

// Optional CORS for allowed origins (Netlify + local dev)
$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';
$allowed_origins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'https://ornate-gaufre-f6276f.netlify.app'
];
if (in_array($origin, $allowed_origins, true)) {
  header('Access-Control-Allow-Origin: ' . $origin);
  header('Vary: Origin');
}

// Allow only POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  header('Content-Type: application/json');
  echo json_encode([ 'ok' => false, 'error' => 'Method Not Allowed' ]);
  exit;
}

function safe_trim($key) {
  return isset($_POST[$key]) ? trim((string)$_POST[$key]) : '';
}

$topic = safe_trim('topic');
$persona = safe_trim('persona');
$fullName = safe_trim('fullName');
$company = safe_trim('company');
$email = safe_trim('email');
$source = safe_trim('source');
$message = safe_trim('message');

$errors = [];
if ($topic === '') { $errors['topic'] = 'Topic is required'; }
if ($persona === '') { $errors['persona'] = 'Persona is required'; }
if ($fullName === '') { $errors['fullName'] = 'Name is required'; }
if ($email === '') {
  $errors['email'] = 'Email is required';
} elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  $errors['email'] = 'Invalid email';
}
if ($company === '') { $errors['company'] = 'Company is required'; }
if ($source === '') { $errors['source'] = 'Source is required'; }

if (!empty($errors)) {
  http_response_code(400);
  header('Content-Type: application/json');
  echo json_encode([ 'ok' => false, 'errors' => $errors ]);
  exit;
}

// Configure destination (same recipient as contact) and sender
$to = getenv('CONTACT_TO') ?: 'faouadi@confoline.com';
$from = getenv('CONTACT_FROM') ?: 'no-reply@confoline.com';

$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$ua = $_SERVER['HTTP_USER_AGENT'] ?? 'unknown';
$body = "Demo request\n\n" .
        "Topic: $topic\n" .
        "Persona: $persona\n" .
        "Name: $fullName\n" .
        "Company: $company\n" .
        "Email: $email\n" .
        "Source: $source\n" .
        "Message:\n" . ($message !== '' ? $message : '(none)') . "\n\n" .
        "---\nIP: $ip\nUA: $ua\n";

$encodedSubject = '=?UTF-8?B?' . base64_encode('[Website] Demo request') . '?=';
$headers = [];
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-Type: text/plain; charset=UTF-8';
$headers[] = 'From: Confoline <' . $from . '>';
$headers[] = 'Reply-To: ' . ($fullName !== '' ? "$fullName <$email>" : $email);
$headers[] = 'Organization: Confoline';
$headers[] = 'X-Mailer: PHP/' . phpversion();

$params = '-f' . $from;
$success = @mail($to, $encodedSubject, $body, implode("\r\n", $headers), $params);

header('Content-Type: application/json');
if ($success) {
  echo json_encode([ 'ok' => true ]);
} else {
  http_response_code(500);
  echo json_encode([ 'ok' => false, 'error' => 'Failed to send email' ]);
}


