Password Validator-3.html
------------------------

Features of the Password Validator
Password Rule Validation

Checks for:

Minimum length (8 characters)

At least one uppercase letter

At least one lowercase letter

At least one number

At least one special character (!@#$%^&*)

Live Validation



Password strength and rule validation happen live as the user types.

Strength Meter with Glowing Dots

Displays glowing colored dots based on password strength.

Confirm Password Matching

Real-time feedback on whether password and confirm password fields match.

Password Visibility Toggle

Eye icon toggles between showing and hiding password.

Responsive Popup Password Rules

A popup appears near the password field showing rule checklist.

Form Validation on Submit

Prevents form submission unless all conditions are met.


✅ Summary
Feature	Logic Used
Password Rule Checking	Regex + length checks
Strength Meter	Score-based glow dots
Rule Popup	.show class toggle
Confirm Match Check	Live match via oninput
Toggle Visibility	Change input type + swap icon
Responsive Design	Media query for small screens
Final Validation	All checks + match on form submission


===================================

✅ Added live character count

✅ Password reveal auto-hides in 10 seconds



✅ Feature 1: Live Character Count
Should appear only when the user starts typing.

Should not be visible when the field is empty.

✅ Applies to both password and confirm password.

✅ Feature 2: Password Reveal Auto-Hides
Clicking the eye icon shows password.

After 10 seconds, it automatically hides the password.

Works independently for both fields.

