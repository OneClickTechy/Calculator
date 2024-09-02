const _switch = document.querySelector('.switch');

_switch.addEventListener('click', ()=>{
  if(_switch.classList.contains('fa-sun')){
    _switch.classList.remove('fa-sun');
    _switch.classList.add('fa-moon');
  }else{
    _switch.classList.add('fa-sun');
    _switch.classList.remove('fa-moon');
  }
})