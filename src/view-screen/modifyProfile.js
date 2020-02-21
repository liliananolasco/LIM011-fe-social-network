import { getItemLocalStorage, saveItemLocalStorage } from '../function.js';

export default (datos, index) => {
  const viewModifyProfile = `
    <div class="container-register">
    <form id="formRegister">
    <button id="modifyProfile-${index}"></button>
      <label for="name" class="label">Nombre:</label></br>
      <input type="text" id="name" class="inputs-register"></br>
      <label for="lastNames" class="label">Apellidos:</label></br>
      <input type="text" id="lastName" class="inputs-register"></br>
      <label for="brithday" class="label">Cumpleaños</label></br>
      <input type="text" id="brithday" placeholder="01-01-01" class="inputs-register"></br>
      <label for="email" class="label">Email:</label></br>
      <input type="email" id="email" class="inputs-register"></br>
      <label for="password" class="label">password:</label></br>
      <input type="password" id="password" class="inputs-register"></br>
      <label for="confirmPassword" class="label">Confirm password:</label></br>
      <input type="password" id="confirmPassword" class="inputs-register"></br>
      <input type="submit" id="buttonModifyProfile" class="button" value="modificar">
    </form>
</div>`;

  const divElemt = document.createElement('div');
  divElemt.classList.add('css-ModifyProfile');
  divElemt.innerHTML = viewModifyProfile;

  const editProfile = divElemt.querySelector(`modifyProfile-${index}`);
  editProfile.addEventListener('click', () => {
    const registro = JSON.parse(getItemLocalStorage('usuariosRegistrados'));
    registro.forEach((element, indexregistro) => {
      if (indexregistro === index) {
        // eslint-disable-next-line no-param-reassign
        element.nombre = divElemt.querySelector('#name').value;
        element.apellidos = divElemt.querySelector('#lastName').value;
        element.cumpleaños = divElemt.querySelector('#brithday').value;
        element.correo = divElemt.querySelector('#email').value;
        element.contraseña = divElemt.querySelector('#password').value;
        element.confirmarContraseña = divElemt.querySelector('#confirmPassword').value;

      }
    });
    saveItemLocalStorage('posts', JSON.stringify(registro));
    /* const postsActuales = JSON.parse(getItemLocalStorage('posts'));
    const divPadrePosts = document.querySelector('#commits');
    divPadrePosts.innerHTML = '';
    postsActuales.forEach((element, indice) => {
      const newNodoPost = elementoPost(element, indice);
      divPadrePosts.appendChild(newNodoPost);
    }); */
  });


  return divElemt;
};
