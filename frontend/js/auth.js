const API = 'http://localhost:3000/api';

function toggleAuth() {
  document.getElementById('loginBox').classList.toggle('hidden');
  document.getElementById('signupBox').classList.toggle('hidden');
}

function showError(elementId, message) {
  const el = document.getElementById(elementId);
  el.textContent = message;
  el.style.display = 'block';
}

function hideError(elementId) {
  const el = document.getElementById(elementId);
  el.style.display = 'none';
}

// LOGIN
document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  hideError('loginError');

  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  try {
    const res = await fetch(`${API}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (!res.ok) {
      showError('loginError', data.message || 'Login failed');
      return;
    }

    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    window.location.href = 'index.html';
  } catch (err) {
    showError('loginError', 'Unable to connect to server. Is it running?');
  }
});

// SIGNUP
document.getElementById('signupForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  hideError('signupError');

  const name = document.getElementById('signupName').value;
  const email = document.getElementById('signupEmail').value;
  const password = document.getElementById('signupPassword').value;
  const passwordConfirm = document.getElementById('signupPasswordConfirm').value;

  if (password !== passwordConfirm) {
    showError('signupError', 'Passwords do not match');
    return;
  }

  if (password.length < 6) {
    showError('signupError', 'Password must be at least 6 characters');
    return;
  }

  try {
    const res = await fetch(`${API}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });

    const data = await res.json();

    if (!res.ok) {
      showError('signupError', data.message || 'Signup failed');
      return;
    }

    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    window.location.href = 'index.html';
  } catch (err) {
    showError('signupError', 'Unable to connect to server. Is it running?');
  }
});

// Redirect if already logged in
if (localStorage.getItem('token')) {
  window.location.href = 'index.html';
}
