const _switch = document.querySelector('.switch');
const body = document.querySelector('body');

_switch.addEventListener('click', ()=>{
  if(_switch.classList.contains('fa-sun')){
    _switch.classList.remove('fa-sun');
    _switch.classList.add('fa-moon');
    body.classList.add('dark-mode');
  }else{
    _switch.classList.add('fa-sun');
    _switch.classList.remove('fa-moon');
    body.classList.remove('dark-mode');
  }
})