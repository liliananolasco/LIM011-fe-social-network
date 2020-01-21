import { getItemLocalStorage, saveItemLocalStorage } from '../function.js';

export const elementoPost = (comentario, index) => {
  const onlyComment = document.createElement('div');
  onlyComment.classList.add('publicaciones');
  const date = new Date(comentario.fecha);
  const textoTipoPost = comentario.tipo === 'privado'
    ? '<i id="private" class="icon-user-secret iconClass"></i>' : '';
  onlyComment.innerHTML = `
      <!-- Avatar -->
      <figure class="comment-avatar"> <img src="./imagen/usuario.png" alt=""/> </figure>
      <!-- Contenedor del Comentario -->
      <div class="comment-box">
      <section class="comment-head iconClass">
        <h6 class="comment-name by-author">${comentario.nombre}</h6>
        <span>${date.toString().slice(3, -40)}</span>
        ${textoTipoPost}
        <button id="modify-${index}" class="icon-pencil iconClass" ></button>
        <button id="delete-${index}" class="icon-trash-1 iconClass"></button>
      </section>
      <section class="comment-content">${comentario.texto}</section>
      <section id="ModifyComment" class ="none">
      <textarea id="story" name="story" rows="2%" cols="95%">${comentario.texto}</textarea>
      <input id="modify" type="button" value="modificar" class="button">
      </section>
      <section class="comment-opinion">
      <button class="icon-heart iconClass" id="reactionPostLove-${index}"><p id="comentario">${comentario.meGusta}</p></button>
      <button type="button" id="comentarComentario" <i class="icon-chat iconClass"></i>comentar</button>
      </section>
    </div>
  </div> `;

  // eliminar post
  const registroPosts = JSON.parse(getItemLocalStorage('posts'));
  const deletePost = onlyComment.querySelector(`#delete-${index}`);
  deletePost.addEventListener('click', () => {
    const newPost = [];
    registroPosts.forEach((element, index1Post) => {
      if (index1Post !== index) {
        newPost.push(element);
      }
    });
    saveItemLocalStorage('posts', JSON.stringify(newPost));
    const postsActuales = JSON.parse(getItemLocalStorage('posts'));
    const divPadrePosts = document.querySelector('#commits');
    divPadrePosts.innerHTML = '';
    postsActuales.forEach((element, indice) => {
      const newNodoPost = elementoPost(element, indice);
      divPadrePosts.appendChild(newNodoPost);
    });
  });

  // editar post

  const editPost = onlyComment.querySelector(`#modify-${index}`);
  editPost.addEventListener('click', () => {
    const registro = JSON.parse(getItemLocalStorage('posts'));
    registro.forEach((element, index1Post) => {
      if (index1Post === index) {
        onlyComment.querySelector(`#modify-${index}`).classList.add('none');
        onlyComment.querySelector('#ModifyComment').classList.remove('none');
        /* newPost.push(element); */
      }
    });
  });
  const savePostEdit = onlyComment.querySelector('#modify');
  savePostEdit.addEventListener('click', () => {
    const registro = JSON.parse(getItemLocalStorage('posts'));
    registro.forEach((element, index1Post) => {
      if (index1Post === index) {
        // eslint-disable-next-line no-param-reassign
        element.texto = onlyComment.querySelector('#story').value;
      }
    });
    saveItemLocalStorage('posts', JSON.stringify(registro));
    const postsActuales = JSON.parse(getItemLocalStorage('posts'));
    const divPadrePosts = document.querySelector('#commits');
    divPadrePosts.innerHTML = '';
    postsActuales.forEach((element, indice) => {
      const newNodoPost = elementoPost(element, indice);
      divPadrePosts.appendChild(newNodoPost);
    });
  });

  // me gusta
  // let contadorLove = 0;
  const registerReactionCountLove = JSON.parse(localStorage.getItem('posts'));
  const reactionPostLove = onlyComment.querySelector(`#reactionPostLove-${index}`);
  reactionPostLove.addEventListener('click', () => {
    const nuevoArr = [];
    registerReactionCountLove.forEach((element, index1love) => {
      if (index1love === index) {
        const nombreDeUsuario = element.nombre;
        const textoDelPost = element.texto;
        const tipoDePost = element.tipo;
        const lovePost = element.meGusta;
        const nuevoObj = {
          nombre: nombreDeUsuario,
          texto: textoDelPost,
          fecha: new Date(),
          tipo: tipoDePost,
          meGusta: lovePost + 1,
        };
        nuevoArr.push(nuevoObj);
      } else {
        nuevoArr.push(element);
      }
    });
    console.log(nuevoArr);
    saveItemLocalStorage('posts', JSON.stringify(nuevoArr));
    const loveActuales = JSON.parse(getItemLocalStorage('posts'));
    const divPadrePosts = document.querySelector('#commits');
    divPadrePosts.innerHTML = '';
    loveActuales.forEach((element, indice) => {
      const newNodoPost = elementoPost(element, indice);
      divPadrePosts.appendChild(newNodoPost);
    });
  });
  return onlyComment;
};
