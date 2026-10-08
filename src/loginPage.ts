// Login page for the sandbox site (AB#2440). Validation is client-side only: the form never
// submits to the server, so errors and the success message appear without a page reload.
export const loginPageHtml = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Log in</title>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 22rem; margin: 4rem auto; padding: 0 1rem; }
    label { display: block; margin-top: 1rem; }
    input { display: block; width: 100%; padding: 0.4rem; box-sizing: border-box; }
    button { margin-top: 1.25rem; padding: 0.5rem 1rem; }
    .error { color: #b00020; font-size: 0.875rem; min-height: 1.1em; margin: 0.25rem 0 0; }
    .success { color: #1b5e20; margin-top: 1rem; }
  </style>
</head>
<body>
  <h1>Log in</h1>
  <form id="login-form" novalidate>
    <label for="email">Email</label>
    <input id="email" name="email" type="email" autocomplete="email" aria-describedby="email-error">
    <p id="email-error" class="error" role="alert"></p>

    <label for="password">Password</label>
    <input id="password" name="password" type="password" autocomplete="current-password" aria-describedby="password-error">
    <p id="password-error" class="error" role="alert"></p>

    <button type="submit">Log in</button>
  </form>
  <p id="login-success" class="success" role="status" hidden></p>

  <script>
    const form = document.getElementById('login-form')
    const email = document.getElementById('email')
    const password = document.getElementById('password')
    const emailError = document.getElementById('email-error')
    const passwordError = document.getElementById('password-error')
    const success = document.getElementById('login-success')

    form.addEventListener('submit', event => {
      event.preventDefault()
      const emailValue = email.value.trim()
      emailError.textContent = !emailValue
        ? 'Email is required.'
        : /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(emailValue) ? '' : 'Enter a valid email address.'
      passwordError.textContent = password.value ? '' : 'Password is required.'

      const valid = !emailError.textContent && !passwordError.textContent
      success.hidden = !valid
      success.textContent = valid ? 'Login successful.' : ''
    })
  </script>
</body>
</html>
`
