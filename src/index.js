import {renderPhoneBook} from './script/render';
import {addContactLocal} from './script/serviceStorage';
import {formControl, deleteControl, hoverRow, modalControl} from './script/control';

import './index.html';
import './scss/index.scss';

{
  const init = (selectorApp, title) => {
    const app = document.querySelector(selectorApp);

    const {list, logo, btnAdd, formOverlay, form, btnDel} = renderPhoneBook(app, title);

    // Функционал
    addContactLocal(list);
    const {closeModal} = modalControl(btnAdd, formOverlay);

    hoverRow(list.querySelectorAll('.contact'), logo);
    deleteControl(btnDel, list);
    formControl(form, list, closeModal);
  };

  window.phoneBookInit = init;
  document.addEventListener('DOMContentLoaded', () => {
    phoneBookInit('#app', 'Юрий');
  });
}
