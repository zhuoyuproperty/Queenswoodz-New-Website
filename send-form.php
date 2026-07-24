<?php
// Simple PHP mail() handler for the lead form on index.html.
// Works out of the box on Hostinger (or any PHP hosting) — no third-party
// account or API key needed. Just upload this file alongside index.html.

// REPLACE this with the inbox that should receive enquiries.
$to = "zhuoyuproperty@gmail.com";

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    header("Location: index.html#enquire");
    exit;
}

function clean($value) {
    $value = trim($value ?? "");
    return str_replace(["\r", "\n"], " ", $value);
}

$name = clean($_POST["name"] ?? "");
$phone = clean($_POST["phone"] ?? "");
$email = clean($_POST["email"] ?? "");
$unitType = clean($_POST["preferred_unit_type"] ?? "");

if ($name === "" || $phone === "") {
    header("Location: index.html?error=1#enquire");
    exit;
}

$subject = "New enquiry: The Queenswoodz @ Bukit Jalil";

$body = "New enquiry from The Queenswoodz landing page\n\n";
$body .= "Name: $name\n";
$body .= "Phone: $phone\n";
$body .= "Email: " . ($email !== "" ? $email : "-") . "\n";
$body .= "Preferred Unit Type: " . ($unitType !== "" ? $unitType : "-") . "\n";

$headers = "From: no-reply@" . $_SERVER["HTTP_HOST"] . "\r\n";
if ($email !== "" && filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $headers .= "Reply-To: $email\r\n";
}

mail($to, $subject, $body, $headers);

header("Location: index.html?sent=1#enquire");
exit;
