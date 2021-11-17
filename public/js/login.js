const form = document.forms.loginForm;

function failSignin(form) {
  form.name.setCustomValidity('Неверные имя пользователя и/или пароль.');
  form.name.reportValidity();
};

loginForm?.addEventListener('submit', async (event) => {
  event.preventDefault();

  const { method, action } = event.target;
  let response;

  try {
    response = await fetch(action, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        login: event.target.login.value,
        password: event.target.password.value,
      })
    })
  } catch (err) {
    return failSignin(event.target);
  }

  if (response.status === 200) {
    return window.location.assign('/');
  } else {
    return alert('Такого пользователя не сущетсвует :(');
  }
});
