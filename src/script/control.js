import {createRow} from './createElement.mjs';

import {generateRandomKey, removeStorage, setStorage} from './serviceStorage';

const addContactPage = (contact, list, id) => {
  list.append(createRow(contact, id));
};

export default addContactPage;

export const formControl = (form, list, closeModal) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const name = formData.get('name');
    const surname = formData.get('surname');
    const phone = formData.get('phone');

    const newContact = {
      name,
      surname,
      phone,
    };

    const id = generateRandomKey();

    setStorage(id, newContact);
    addContactPage(newContact, list, id);

    closeModal();
    form.reset();
  });
};

export const deleteControl = (btnDel, list) => {
  btnDel.addEventListener('click', () => {
    document.querySelectorAll('.delete').forEach((del) => {
      del.classList.toggle('is-visible');
    });
  });
  list.addEventListener('click', (e) => {
    const target = e.target;
    if (target.closest('.del-icon')) {
      const contactRow = target.closest('.contact');
      const key = contactRow.dataset.key;
      removeStorage(key);
      contactRow.remove();
    }
  });
};

export const hoverRow = (allRow, logo) => {
  const text = logo.textContent;
  allRow.forEach((contact) => {
    contact.addEventListener('mouseenter', () => {
      logo.textContent = contact.phoneLink.textContent;
    });
    contact.addEventListener('mouseleave', () => {
      logo.textContent = text;
    });
  });
};

export const modalControl = (btnAdd, formOverlay) => {
  const openModal = () => {
    formOverlay.classList.add('is-visible');
  };

  const closeModal = () => {
    formOverlay.classList.remove('is-visible');
  };

  btnAdd.addEventListener('click', openModal);

  formOverlay.addEventListener('click', (e) => {
    const target = e.target;

    if (target === formOverlay || target.closest('.close') || target.closest('.btn-cancel')) {
      closeModal();
    }
  });

  return {
    closeModal,
  };
};
