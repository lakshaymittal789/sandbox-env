// Client-side validation for the login page. Kept dependency-free because its source is embedded
// into the page script as-is, so the browser runs exactly the logic the tests exercise.
// Returns an error message, or null when the input looks valid.
export function validateLogin(email: string, password: string): string | null {
  if (!email.trim() || !password) return 'Email and password are required.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return 'Enter a valid email address.'
  return null
}

export const loginPageHtml = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Log in</title>
</head>
<body>
  <h1>Log in</h1>
  <form id="login-form" novalidate>
    <label for="email">Email</label>
    <input id="email" name="email" type="email" autocomplete="email">
    <label for="password">Password</label>
    <input id="password" name="password" type="password" autocomplete="current-password">
    <button type="submit">Log in</button>
    <p id="login-message" role="alert" aria-live="polite"></p>
  </form>
  <script>
    ${validateLogin.toString()}
    document.getElementById('login-form').addEventListener('submit', event => {
      event.preventDefault()
      const message = document.getElementById('login-message')
      const error = validateLogin(document.getElementById('email').value, document.getElementById('password').value)
      message.textContent = error ?? 'Login successful.'
      message.style.color = error ? 'crimson' : 'green'
    })
  </script>
</body>
</html>
`
