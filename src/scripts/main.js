import '../styles/style.scss'

const elemento = document.createElement('h2');
elemento.textContent = 'Esto es un titulo';

document.querySelector('#app').appendChild(elemento);