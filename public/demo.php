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
$to = getenv('CONTACT_TO') ?: 'contact@confoline.com';
$from = getenv('CONTACT_FROM') ?: 'no-reply@confoline.com';

$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$ua = $_SERVER['HTTP_USER_AGENT'] ?? 'unknown';

// Build HTML body
$safe = function($v) { return htmlspecialchars($v); };
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
        '            <h1 style="margin:0 0 8px 0;font-size:20px;line-height:28px;color:#0f172a;">New demo request</h1>' .
        '            <p style="margin:0 0 16px 0;font-size:14px;color:#334155;">A visitor requested a product demo.</p>' .
        '            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:separate;border-spacing:0 8px;">' .
        '              <tr><td style="width:200px;font-weight:600;color:#0f172a;">Topic</td><td style="color:#0f172a;">' . $safe($topic) . '</td></tr>' .
        '              <tr><td style="width:200px;font-weight:600;color:#0f172a;">Persona</td><td style="color:#0f172a;">' . $safe($persona) . '</td></tr>' .
        '              <tr><td style="width:200px;font-weight:600;color:#0f172a;">Name</td><td style="color:#0f172a;">' . $safe($fullName) . '</td></tr>' .
        '              <tr><td style="width:200px;font-weight:600;color:#0f172a;">Company</td><td style="color:#0f172a;">' . $safe($company) . '</td></tr>' .
        '              <tr><td style="width:200px;font-weight:600;color:#0f172a;">Email</td><td><a href="mailto:' . $safe($email) . '" style="color:#0891b2;text-decoration:none;">' . $safe($email) . '</a></td></tr>' .
        '              <tr><td style="width:200px;font-weight:600;color:#0f172a;">Heard from</td><td style="color:#0f172a;">' . $safe($source) . '</td></tr>' .
        '              <tr><td style="width:200px;font-weight:600;color:#0f172a;vertical-align:top;">Message</td><td style="color:#0f172a;">' . nl2br($safe($message !== '' ? $message : '(none)')) . '</td></tr>' .
        '            </table>' .
        '          </td>' .
        '        </tr>' .
        '      </table>' .
        '    </td></tr>' .
        '  </table>' .
        '</body></html>';

$encodedSubject = '=?UTF-8?B?' . base64_encode('[Website] Demo request') . '?=';
$headers = [];
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-Type: text/html; charset=UTF-8';
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


