<?php
// Basic contact form handler for static hosting (e.g., OVH shared hosting)
// Ensure this file is deployed under the web root alongside your static export.

$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';
if ($origin === 'http://localhost:3000' || $origin === 'https://ornate-gaufre-f6276f.netlify.app') {
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
// Build HTML body
$safeMessage = nl2br(htmlspecialchars($message));
$safeName = htmlspecialchars($fullName);
$safeEmail = htmlspecialchars($email);
$safeSubject = htmlspecialchars($subject);
$body = '<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="color-scheme" content="light only"><meta name="supported-color-schemes" content="light only"></head>' .
        '<body style="margin:0;padding:0;background:#f6f7fb;font-family:Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#0f172a;">' .
        '  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f6f7fb;padding:24px;">' .
        '    <tr><td align="center">' .
        '      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;box-shadow:0 4px 16px rgba(2,6,23,0.08);overflow:hidden;">' .
        '        <tr>' .
        '          <td style="background:linear-gradient(90deg,#06b6d4,#22d3ee);height:4px"></td>' .
        '        </tr>' .
        '        <tr>' .
        '          <td align="center" style="padding:16px 0;">' .
        '            <img src="https://confoline.com/confoline.png" alt="Confoline" style="display:block;height:40px;width:auto;max-width:180px;border:0;outline:none;text-decoration:none;" />' .
        '          </td>' .
        '        </tr>' .
        '        <tr>' .
        '          <td style="padding:24px 28px;">' .
        '            <h1 style="margin:0 0 8px 0;font-size:20px;line-height:28px;color:#0f172a;">New contact message</h1>' .
        '            <p style="margin:0 0 16px 0;font-size:14px;color:#334155;">You received a new message from the website contact form.</p>' .
        '            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:separate;border-spacing:0 8px;">' .
        '              <tr><td style="width:160px;font-weight:600;color:#0f172a;">Name</td><td style="color:#0f172a;">' . $safeName . '</td></tr>' .
        '              <tr><td style="width:160px;font-weight:600;color:#0f172a;">Email</td><td><a href="mailto:' . $safeEmail . '" style="color:#0891b2;text-decoration:none;">' . $safeEmail . '</a></td></tr>' .
        '              <tr><td style="width:160px;font-weight:600;color:#0f172a;">Subject</td><td style="color:#0f172a;">' . $safeSubject . '</td></tr>' .
        '              <tr><td style="width:160px;font-weight:600;color:#0f172a;vertical-align:top;">Message</td><td style="color:#0f172a;">' . $safeMessage . '</td></tr>' .
        '            </table>' .
        '          </td>' .
        '        </tr>' .
        '      </table>' .
        '    </td></tr>' .
        '  </table>' .
        '</body></html>';

// Headers
$encodedSubject = '=?UTF-8?B?' . base64_encode('[Website] ' . $subject) . '?=';
$headers = [];
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-Type: text/html; charset=UTF-8';
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


