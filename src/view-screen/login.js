import { getItemLocalStorage, saveItemLocalStorage } from '../function.js';

export default () => {
  const viewHome = `
    <section class ="wrapper" id="home">
    <div class="imgLogin">
    <img src="./imagen/girl power.jpeg" class = "img-princial">
    </div>
    <div class="partLogin">
      <p>!Bienvenida!</p>
      <form id="log">
        <span class="icon-user-circle-o iconClass"></span>
        <input id="userName" type="text" placeholder="Ingresar usuario" class="inputsHome">
        </br>
        <span class="icon-lock iconClass"></span>
        <input id="password" type="password" placeholder="Ingresar contraseña" class="inputsHome">
        <p id="error-message" class="text-center error-message"></p>
      </form>
      </br>
      <p>Tambien puedes ingresar con ...</p>
      </br>
      <section>
        <span class="icon-google iconClass"></span>
        <span class="icon-facebook iconClass"></span>
        </section>
      </br>
      <input id="login" type="button" value="INGRESA" class="button">
      <p>¿No tienes una cuenta?<br><a href="#/register" class="icons">Regístrate</a></p>
      </div>
    </section>`;

  const divElemt = document.createElement('div');
  divElemt.innerHTML = viewHome;
  // divElemt.className='wrapper';
  let registers = [];
  if (getItemLocalStorage('usuariosRegistrados') !== 'undefined') {
    registers = JSON.parse(getItemLocalStorage('usuariosRegistrados'));
  }

  const btnLogin = divElemt.querySelector('#login');
  btnLogin.addEventListener('click', (event) => {
    event.preventDefault();
    const emailUsuario = divElemt.querySelector('#userName').value;
    const contraseñaUsuario = divElemt.querySelector('#password').value;
    const usuarios = registers.filter(usuariosRegistrados => usuariosRegistrados.correo
      === emailUsuario && usuariosRegistrados.contraseña === contraseñaUsuario);
    if (usuarios.length >= 1) {
      saveItemLocalStorage('nombreUsuario', usuarios[0].nombre);
      // eslint-disable-next-line no-restricted-globals
      location.href = '#/foro';
    } else {
      divElemt.querySelector('#error-message').innerHTML = 'email o contraseña incorrecta';
    }
  });

  return divElemt;
};
