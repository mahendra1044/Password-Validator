let hideTimeout;
let visibilityTimers = {};

function showRules() {
  clearTimeout(hideTimeout);
  document.getElementById('password-rules').classList.add('show');
}

function hideRulesWithDelay() {
  hideTimeout = setTimeout(() => {
    document.getElementById('password-rules').classList.remove('show');
  }, 200);
}

function validatePassword() {
  const pwd = document.getElementById('password').value;
  const container = document.getElementById('strength-container');
  container.style.visibility = pwd.length > 0 ? 'visible' : 'hidden';

  document.getElementById('password-count').style.display = pwd ? 'block' : 'none';
  document.getElementById('password-count').innerText = pwd.length + " characters";

  let score = 0;
  const rules = [
    [pwd.length >= 8, 'rule-length'],
    [/[A-Z]/.test(pwd), 'rule-uppercase'],
    [/[a-z]/.test(pwd), 'rule-lowercase'],
    [/[0-9]/.test(pwd), 'rule-number'],
    [/[!@#$%^&*]/.test(pwd), 'rule-special']
  ];

  rules.forEach(([valid, id]) => {
    updateRule(id, valid);
    if (valid) score++;
  });

  updateStrengthMeter(score);
  validateConfirm();
}

function validateConfirm() {
  const pwd = document.getElementById('password').value;
  const confirm = document.getElementById('confirm').value;
  const msg = document.getElementById('match-message');
  const confirmCount = document.getElementById('confirm-count');

  confirmCount.style.display = confirm ? 'block' : 'none';
  confirmCount.innerText = confirm.length + " characters";

  if (confirm === '') {
    msg.innerText = '';
    return;
  }

  if (pwd === confirm) {
    msg.style.color = 'green';
    msg.innerText = '✅ Passwords match';
  } else {
    msg.style.color = 'red';
    msg.innerText = '❌ Passwords do not match';
  }
}

function updateRule(id, isValid) {
  const rule = document.getElementById(id);
  const icon = rule.querySelector('span');
  icon.innerText = isValid ? '✅' : '❌';
  rule.classList.toggle('valid', isValid);
  rule.classList.toggle('invalid', !isValid);
}

function updateStrengthMeter(score) {
  const container = document.getElementById('strength-container');
  const label = document.getElementById('strength-label');
  const texts = ["Very Weak", "Weak", "Moderate", "Strong", "Very Strong"];
  const existingDots = container.querySelectorAll('.strength-dot');
  existingDots.forEach(dot => dot.remove());

  for (let i = 0; i < 5; i++) {
    const dot = document.createElement('div');
    dot.classList.add('strength-dot');
    if (i < score) {
      dot.style.background = getGlowColor(score);
      dot.style.boxShadow = `0 0 12px ${getGlowColor(score, 0.6)}`;
    }
    container.insertBefore(dot, label);
  }

  const clampedScore = Math.min(score, texts.length - 1);
  label.innerText = texts[clampedScore];
  label.style.color = getGlowColor(score);
}

function getGlowColor(score, opacity = 1) {
  const percent = Math.min(score / 5, 1);
  const r = Math.round(255 - percent * 200);
  const g = Math.round(50 + percent * 180);
  const b = 50;
  return `rgba(${r},${g},${b},${opacity})`;
}

function togglePassword(svg, id) {
  const input = document.getElementById(id);
  const use = svg.querySelector('use');
  const isHidden = input.type === 'password';
  input.type = isHidden ? 'text' : 'password';
  use.setAttribute('href', isHidden ? '#eye-off' : '#eye');

  if (isHidden) {
    clearTimeout(visibilityTimers[id]);
    visibilityTimers[id] = setTimeout(() => {
      input.type = 'password';
      use.setAttribute('href', '#eye');
    }, 10000);
  }
}

document.getElementById('password-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const password = document.getElementById('password').value;
  const confirm = document.getElementById('confirm').value;
  const error = document.getElementById('error-message');

  const allValid = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[a-z]/.test(password),
    /[0-9]/.test(password),
    /[!@#$%^&*]/.test(password),
    password === confirm
  ].every(Boolean);

  if (!allValid) {
    error.style.display = 'block';
  } else {
    error.style.display = 'none';
    alert("✅ Password is valid. Form submitted!");
  }
});
