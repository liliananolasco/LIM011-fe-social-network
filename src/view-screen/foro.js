import { elementoPost } from './comments.js';
import { getItemLocalStorage, agregaObjPostAlArr, saveItemLocalStorage } from '../function.js';

export default () => {
  const viewForo = `
  <section id="foro"><p class="titulo">Girl Ask</p>
    <div id = "addComent">
      <img src = "./imagen/foto.jpeg" class = "foto" /><p id = "nombre"></p>
    </div>
    </br>
    <input id="commit" class="ePosts" type="text" placeholder="¿Qué estás pensando?">
    </br>
    <select id="publicOrNot">
    <option value="publico">Público</option>
    <option value="privado">Privado</option>
    </select>
    <button type="button" class="button"  id="share">compartir</button>
    <div>
    <section id = "commits"> 
    
    </section>
    </div>
  </section>`;

  const divElemt = document.createElement('div');
  /* divElemt.classList.add('position'); */
  divElemt.innerHTML = viewForo;

  divElemt.querySelector('#nombre').innerHTML = getItemLocalStorage('nombreUsuario');

  const btnCompartir = divElemt.querySelector('#share');
  btnCompartir.addEventListener('click', () => {
    const post = divElemt.querySelector('#commit').value;
    let dataDePosts = [];
    if (getItemLocalStorage('posts') !== 'undefined') {
      dataDePosts = JSON.parse(getItemLocalStorage('posts'));
    }
    const nombre = getItemLocalStorage('nombreUsuario');
    const tipoDePost = divElemt.querySelector('#publicOrNot').value;
    const arrNuevo = agregaObjPostAlArr(post, dataDePosts, nombre, tipoDePost, 0);
    saveItemLocalStorage('posts', arrNuevo);
    divElemt.querySelector('#commits').innerHTML = '';
    dataDePosts.forEach((dataDeUnPost, index) => {
      const nodoPost = elementoPost(dataDeUnPost, index);
      divElemt.querySelector('#commits').appendChild(nodoPost);
    });
  });

  return divElemt;
};
