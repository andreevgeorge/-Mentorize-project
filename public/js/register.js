const form = document.getElementById('registerForm');

form?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const { method, action } = event.target;

  let response = await fetch(action, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: event.target.name.value,
      password: event.target.password.value,
      email: event.target.email.value,
      hidden: event.target.hidden.value,
    }),
  });

  if (response.status === 200) {
    return window.location.assign('/');
  }
});
