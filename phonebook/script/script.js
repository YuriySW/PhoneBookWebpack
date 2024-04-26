import {renderPhoneBook} from './modules/render.js';
import {addContactLocal} from './modules/serviceStorage.js';
import {formControl, deleteControl, hoverRow, modalControl} from './modules/control.js';

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
}
