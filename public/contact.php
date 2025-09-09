<?php
// Basic contact form handler for static hosting (e.g., OVH shared hosting)
// Ensure this file is deployed under the web root alongside your static export.

// Allow only POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  header('Content-Type: application/json');
  echo json_encode([ 'ok' => false, 'error' => 'Method Not Allowed' ]);
  exit;
}

// Read and sanitize inputs
function safe_trim($key) {
  return isset($_POST[$key]) ? trim((string)$_POST[$key]) : '';
}

$fullName = safe_trim('fullName');
$email = safe_trim('email');
$subject = safe_trim('subject');
$message = safe_trim('message');

// Validate
$errors = [];
if ($fullName === '') { $errors['fullName'] = 'Name is required'; }
if ($email === '') {
  $errors['email'] = 'Email is required';
} elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  $errors['email'] = 'Invalid email';
}
if ($subject === '') { $errors['subject'] = 'Subject is required'; }
if ($message === '') { $errors['message'] = 'Message is required'; }

if (!empty($errors)) {
  http_response_code(400);
  header('Content-Type: application/json');
  echo json_encode([ 'ok' => false, 'errors' => $errors ]);
  exit;
}

// Configure destination (recipient) and sender
$to = getenv('CONTACT_TO') ?: 'contact@confoline.com';
// Use a real mailbox on your domain here (create it in OVH if needed)
$from = getenv('CONTACT_FROM') ?: 'no-reply@confoline.com';

// Build message
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$ua = $_SERVER['HTTP_USER_AGENT'] ?? 'unknown';
$body = "Contact form submission\n\n" .
        "Name: $fullName\n" .
        "Email: $email\n" .
        "Subject: $subject\n" .
        "Message:\n$message\n\n" .
        "---\nIP: $ip\nUA: $ua\n";

// Headers
$encodedSubject = '=?UTF-8?B?' . base64_encode('[Website] ' . $subject) . '?=';
$headers = [];
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-Type: text/plain; charset=UTF-8';
$headers[] = 'From: Confoline <' . $from . '>';
$headers[] = 'Reply-To: ' . ($fullName !== '' ? "$fullName <$email>" : $email);
$headers[] = 'Organization: Confoline';
$headers[] = 'X-Mailer: PHP/' . phpversion();

// Set envelope sender to reduce spam score (Return-Path). Requires a valid mailbox.
$params = '-f' . $from;
$success = @mail($to, $encodedSubject, $body, implode("\r\n", $headers), $params);

header('Content-Type: application/json');
if ($success) {
  echo json_encode([ 'ok' => true ]);
} else {
  http_response_code(500);
  echo json_encode([ 'ok' => false, 'error' => 'Failed to send email' ]);
}


