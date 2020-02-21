import {
  correctRegister, getItemLocalStorage, AddObjRegisterToArray, saveItemLocalStorage,
} from '../function.js';


export default () => {
  const viewRegister = `
    <div class="container-register">
    <form id="formRegister">
        <label for="name" class="label" required >Nombre:</label></br>
        <input type="text" id="name" class="inputs-register"></br>
        <label for="lastNames" class="label">Apellidos:</label></br>
        <input type="text" id="lastName" class="inputs-register"></br>
        <label for="brithday" class="label">Cumpleaños</label></br>
        <input type="text" id="brithday" placeholder="01-01-01" class="inputs-register"></br>
        <label for="email" class="label">Email:</label></br>
        <input type="email" id="email" class="inputs-register"></br>
        <p id = "errorCorreo"></p>
        <label for="password" class="label">password:</label></br>
        <input type="password" id="password" class="inputs-register"></br>
        <label for="confirmPassword" class="label">Confirm password:</label></br>
        <input type="password" id="confirmPassword" class="inputs-register"></br>
        <p id = "errorComtraseña"></p>
        <input type="submit" class="button">
        </form>
</div>`;

  const divElemt = document.createElement('div');
  divElemt.classList.add('css-register');
  divElemt.innerHTML = viewRegister;


  const formRegister = divElemt.querySelector('#formRegister');
  formRegister.addEventListener('submit', (event) => {
    event.preventDefault();
    const elementsRegister = formRegister.elements;
    const requi = /\S+@\S+.\S+/;
    // const requi = /^\w+([\.\+\-]?\w+)@\w+([\.-]?\w+)(\.\w{2,4})+$/;
    const nombre = divElemt.querySelector('#name').value;
    const apellidos = divElemt.querySelector('#lastName').value;
    const cumpleaños = divElemt.querySelector('#brithday').value;
    const correo = divElemt.querySelector('#email').value;
    const contraseña = divElemt.querySelector('#password').value;
    const confirmarContraseña = divElemt.querySelector('#confirmPassword').value;
    if (correctRegister(nombre, apellidos, cumpleaños,
      correo, contraseña, confirmarContraseña) === true) {
      if (requi.test(elementsRegister.email.value) === true) {
        if (elementsRegister.password.value.length >= 6
      && elementsRegister.password.value === elementsRegister.confirmPassword.value) {
          let dataDeRegister = [];
          if (getItemLocalStorage('usuariosRegistrados') !== 'undefined') {
            dataDeRegister = JSON.parse(getItemLocalStorage('usuariosRegistrados'));
          }
          const ArrayNew = AddObjRegisterToArray(nombre, apellidos, cumpleaños,
            correo, contraseña, confirmarContraseña, dataDeRegister);
          saveItemLocalStorage('usuariosRegistrados', ArrayNew);
          // eslint-disable-next-line no-restricted-globals
          location.href = '#/';
        } else {
          divElemt.querySelector('#errorComtraseña').innerHTML = 'contraseña no valida';
        }
      } else {
        divElemt.querySelector('#errorCorreo').innerHTML = 'correo no valido';
      }
    } else {
      divElemt.querySelector('#errorComtraseña').innerHTML = 'llenar todos los campos';
    }
  });
  return divElemt;
};
