<?php
// Job application form handler for static hosting (e.g., OVH shared hosting)
// Ensure this file is deployed under the web root alongside your static export.

$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';
if ($origin === 'http://localhost:3000' || $origin === 'https://ornate-gaufre-f6276f.netlify.app' || $origin === 'https://www.confoline.com' || $origin === 'https://confoline.com') {
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

$firstName = safe_trim('firstName');
$lastName = safe_trim('lastName');
$email = safe_trim('email');
$phone = safe_trim('phone');
$position = safe_trim('position');
$startDate = safe_trim('startDate');
$employmentStatus = safe_trim('employmentStatus');

// Validate
$errors = [];
if ($firstName === '') { $errors['firstName'] = 'First name is required'; }
if ($lastName === '') { $errors['lastName'] = 'Last name is required'; }
if ($email === '') {
  $errors['email'] = 'Email is required';
} elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  $errors['email'] = 'Invalid email';
}
if ($phone === '') { $errors['phone'] = 'Phone number is required'; }
if ($position === '') { $errors['position'] = 'Position is required'; }
if ($startDate === '') { $errors['startDate'] = 'Start date is required'; }

// Handle file upload
$resumePath = null;
$resumeFileName = null;
if (isset($_FILES['resume']) && $_FILES['resume']['error'] === UPLOAD_ERR_OK) {
  $uploadDir = 'uploads/resumes/';
  
  // Create directory if it doesn't exist
  if (!file_exists($uploadDir)) {
    mkdir($uploadDir, 0755, true);
  }
  
  $fileInfo = pathinfo($_FILES['resume']['name']);
  $extension = strtolower($fileInfo['extension']);
  $allowedExtensions = ['pdf', 'doc', 'docx'];
  
  if (!in_array($extension, $allowedExtensions)) {
    $errors['resume'] = 'Only PDF, DOC, and DOCX files are allowed';
  } elseif ($_FILES['resume']['size'] > 10 * 1024 * 1024) { // 10MB limit
    $errors['resume'] = 'File size must be less than 10MB';
  } else {
    $resumeFileName = time() . '_' . preg_replace('/[^a-zA-Z0-9._-]/', '_', $_FILES['resume']['name']);
    $resumePath = $uploadDir . $resumeFileName;
    
    if (!move_uploaded_file($_FILES['resume']['tmp_name'], $resumePath)) {
      $errors['resume'] = 'Failed to upload resume';
    }
  }
} else {
  $errors['resume'] = 'Resume is required';
}

if (!empty($errors)) {
  http_response_code(400);
  header('Content-Type: application/json');
  echo json_encode([ 'ok' => false, 'errors' => $errors ]);
  exit;
}

// Configure destination (recipient) and sender
$to = getenv('CONTACT_TO') ?: 'farouk.aouadi1@gmail.com';
$from = getenv('CONTACT_FROM') ?: 'no-reply@confoline.com';

// Build message
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$ua = $_SERVER['HTTP_USER_AGENT'] ?? 'unknown';

// Build HTML body
$safeFirstName = htmlspecialchars($firstName);
$safeLastName = htmlspecialchars($lastName);
$safeEmail = htmlspecialchars($email);
$safePhone = htmlspecialchars($phone);
$safePosition = htmlspecialchars($position);
$safeStartDate = htmlspecialchars($startDate);
$safeEmploymentStatus = htmlspecialchars($employmentStatus);

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
        '            <h1 style="margin:0 0 8px 0;font-size:20px;line-height:28px;color:#0f172a;">New Job Application</h1>' .
        '            <p style="margin:0 0 16px 0;font-size:14px;color:#334155;">You received a new job application from the website.</p>' .
        '            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:separate;border-spacing:0 8px;">' .
        '              <tr><td style="width:160px;font-weight:600;color:#0f172a;">Name</td><td style="color:#0f172a;">' . $safeFirstName . ' ' . $safeLastName . '</td></tr>' .
        '              <tr><td style="width:160px;font-weight:600;color:#0f172a;">Email</td><td><a href="mailto:' . $safeEmail . '" style="color:#0891b2;text-decoration:none;">' . $safeEmail . '</a></td></tr>' .
        '              <tr><td style="width:160px;font-weight:600;color:#0f172a;">Phone</td><td style="color:#0f172a;">' . $safePhone . '</td></tr>' .
        '              <tr><td style="width:160px;font-weight:600;color:#0f172a;">Position</td><td style="color:#0f172a;">' . $safePosition . '</td></tr>' .
        '              <tr><td style="width:160px;font-weight:600;color:#0f172a;">Start Date</td><td style="color:#0f172a;">' . $safeStartDate . '</td></tr>' .
        '              <tr><td style="width:160px;font-weight:600;color:#0f172a;">Employment Status</td><td style="color:#0f172a;">' . $safeEmploymentStatus . '</td></tr>' .
        '              <tr><td style="width:160px;font-weight:600;color:#0f172a;">Resume</td><td style="color:#0f172a;">' . $resumeFileName . ' (attached to this email)</td></tr>' .
        '            </table>' .
        '            <div style="margin-top:24px;padding:16px;background:#f1f5f9;border-radius:8px;">' .
        '              <p style="margin:0;font-size:14px;color:#0f172a;font-weight:600;">📎 Resume attached to this email</p>' .
        '              <p style="margin:4px 0 0 0;font-size:12px;color:#64748b;">The candidate\'s resume has been attached as a file to this email.</p>' .
        '            </div>' .
        '          </td>' .
        '        </tr>' .
        '      </table>' .
        '    </td></tr>' .
        '  </table>' .
        '</body></html>';

// Create multipart message with attachment
$boundary = md5(uniqid(time()));
$encodedSubject = '=?UTF-8?B?' . base64_encode('[Job Application] ' . $position . ' - ' . $firstName . ' ' . $lastName) . '?=';

// Read the resume file
$resumeContent = file_get_contents($resumePath);
$resumeEncoded = chunk_split(base64_encode($resumeContent));
$resumeName = basename($resumePath);

// Create multipart message
$message = "--$boundary\r\n";
$message .= "Content-Type: text/html; charset=UTF-8\r\n";
$message .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
$message .= $body . "\r\n\r\n";

// Add attachment
$message .= "--$boundary\r\n";
$message .= "Content-Type: application/octet-stream; name=\"$resumeName\"\r\n";
$message .= "Content-Transfer-Encoding: base64\r\n";
$message .= "Content-Disposition: attachment; filename=\"$resumeName\"\r\n\r\n";
$message .= $resumeEncoded . "\r\n";
$message .= "--$boundary--\r\n";

// Headers
$headers = [];
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-Type: multipart/mixed; boundary="' . $boundary . '"';
$headers[] = 'From: Confoline <' . $from . '>';
$headers[] = 'Reply-To: ' . ($firstName !== '' ? "$firstName $lastName <$email>" : $email);
$headers[] = 'Organization: Confoline';
$headers[] = 'X-Mailer: PHP/' . phpversion();

// Set envelope sender to reduce spam score (Return-Path). Requires a valid mailbox.
$params = '-f' . $from;
$success = @mail($to, $encodedSubject, $message, implode("\r\n", $headers), $params);

header('Content-Type: application/json');
if ($success) {
  echo json_encode([ 'ok' => true ]);
} else {
  http_response_code(500);
  echo json_encode([ 'ok' => false, 'error' => 'Failed to send email' ]);
}
?>
