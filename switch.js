const switchContainer = document.querySelector('.switch-container');
const _switch = document.querySelector('.switch');
const body = document.body;

switchContainer.addEventListener("click", () => {
  _switch.classList.toggle('active');

  // Toggle dark mode
  if (_switch.classList.contains('active')) {
    body.setAttribute('data-theme', 'dark');
  } else {
    body.setAttribute('data-theme', 'light');
  }
});
