import { components } from '../view-screen/index.js';

export const changeTmp = (hash) => {
  const id = hash.split('/')[1];
  const sectionMain = document.getElementById('container');
  sectionMain.innerHTML = '';

  switch (hash) {
    case '':
    case '#':
    case '#/':
    { return sectionMain.appendChild(components.login()); }
    case '#/register':
    case '#/foro':
    case '#/modifyProfile':
    // case '#/contact':
    { return sectionMain.appendChild(components[id]()); }
    default:
    { return sectionMain.appendChild(components.different()); }
  }
};
