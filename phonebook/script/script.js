'use strict';

{
  let contactCounter = 0;

  const createContainer = () => {
    const container = document.createElement('div');
    container.classList.add('container');
    return container;
  };

  const createHeader = () => {
    const header = document.createElement('header');
    header.classList.add('header');

    const headerContainer = createContainer();
    header.append(headerContainer);
    header.headerContainer = headerContainer;

    return header;
  };

  const createLogo = (title) => {
    const h1 = document.createElement('h1');
    h1.classList.add('logo');
    h1.textContent = `Телефонный справочник. ${title}`;
    return h1;
  };

  const createMain = () => {
    const main = document.createElement('main');

    const mainContainer = createContainer();
    main.append(mainContainer);
    main.mainContainer = mainContainer;
    return main;
  };

  const createFooter = () => {
    const footer = document.createElement('footer');
    footer.classList.add('footer');
    const footerText = document.createElement('p');
    footerText.classList.add('footerText');
    footerText.textContent = 'Все права защищены ⒸЮрий';
    footer.append(footerText);
    footer.footerText = footerText;

    return footer;
  };

  const createButtonsGroup = (params) => {
    const btnWrapper = document.createElement('div');
    btnWrapper.classList.add('btn-wrapper');

    const btns = params.map(({className, type, text}) => {
      const button = document.createElement('button');
      button.type = type;
      button.textContent = text;
      button.className = className;
      return button;
    });

    btnWrapper.append(...btns);

    return {
      btnWrapper,
      btns,
    };
  };

  const createTable = () => {
    const table = document.createElement('table');
    table.classList.add('table', 'table-striped');

    const thead = document.createElement('thead');
    thead.insertAdjacentHTML(
      'beforeend',
      `
   <tr>
   <th class="delete">Удалить</th>
   <th>Имя</th>
   <th>Фамилия</th>
   <th>Телефон</th>
   </tr>
   `
    );

    const tbody = document.createElement('tbody');

    table.append(thead, tbody);
    table.tbody = tbody;

    return table;
  };

  const createForm = () => {
    const overlay = document.createElement('div');
    overlay.classList.add('form-overlay');

    const form = document.createElement('form');
    form.classList.add('form');
    form.insertAdjacentHTML(
      'beforeend',
      ` <button class="close" type="button"></button>
        <h2 class="form-title"></h2>
        <div class="form-group">
        <label class="form-label" for="name">Имя</label>
        <input class="form-input" name="name" id="name" type="text" required>
        </div>
        <div class="form-group">
        <label class="form-label" for="surname">Фамилия</label>
      <input class="form-input" name="surname" id="surname" type="text" required>
      </div>
     <div class="form-group">
     <label class="form-label" for="phone">Телефон</label>
     <input class="form-input" name="phone" id="phone" type="number" required>
     </div> `
    );
    const buttonGroup = createButtonsGroup([
      {
        className: 'btn btn-primary mr-3',
        type: 'submit',
        text: 'Добавить',
      },
      {
        className: 'btn btn-danger btn-cancel',
        type: 'reset',
        text: 'Отмена',
      },
    ]);

    form.append(...buttonGroup.btns);

    overlay.append(form);

    return {
      overlay,
      form,
    };
  };

  const renderPhoneBook = (selectorApp, title) => {
    const header = createHeader();
    const logo = createLogo(title);
    const main = createMain();
    const footer = createFooter();
    const buttonGroup = createButtonsGroup([
      {
        className: 'btn btn-primary mr-3 js-add',
        type: 'button',
        text: 'Добавить',
      },
      {
        className: 'btn btn-danger',
        type: 'button',
        text: 'Удалить',
      },
    ]);

    const table = createTable();
    const {form, overlay} = createForm();

    header.headerContainer.append(logo);
    main.mainContainer.append(buttonGroup.btnWrapper, table, overlay);

    app.append(header, main, footer);

    return {
      list: table.tbody,
      logo,
      btnAdd: buttonGroup.btns[0],
      btnDel: buttonGroup.btns[1],
      formOverlay: overlay,
      form,
    };
  };

  const createRow = ({name: firstName, surname, phone}, keyLocal) => {
    const tr = document.createElement('tr');
    tr.classList.add('contact');
    const tdDel = document.createElement('td');
    tdDel.classList.add('delete');
    const buttonaDel = document.createElement('button');
    tdDel.append(buttonaDel);
    buttonaDel.classList.add('del-icon');
    const tdName = document.createElement('td');
    tdName.textContent = firstName;
    const tdSurname = document.createElement('td');
    tdSurname.textContent = surname;
    const tdPhone = document.createElement('td');
    const phoneLink = document.createElement('a');
    phoneLink.href = `tel:${phone}`;
    phoneLink.textContent = phone;
    tr.phoneLink = phoneLink;
    tr.dataset.key = keyLocal;
    tdPhone.append(phoneLink);
    tr.append(tdDel, tdName, tdSurname, tdPhone);

    return tr;
  };

  const hoverRow = (allRow, logo) => {
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

  const modalControl = (btnAdd, formOverlay) => {
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

  const getStorage = (id) => {
    const data = localStorage.getItem('contacts');
    try {
      const parsedData = data ? JSON.parse(data) : {}; //
      return parsedData[id] ? parsedData[id] : [];
    } catch {
      return [];
    }
  };

  const setStorage = (id, newObj) => {
    if (
      typeof newObj === 'object' &&
      newObj.hasOwnProperty('name') &&
      newObj.hasOwnProperty('surname') &&
      newObj.hasOwnProperty('phone')
    ) {
      try {
        const currentData = getStorage(id);
        currentData.push(newObj);

        localStorage.setItem(
          'contacts',
          JSON.stringify({...JSON.parse(localStorage.getItem('contacts')), [id]: currentData})
        );
      } catch {
        return [];
      }
    }
  };

  const addContactPage = (contact, list, id) => {
    list.append(createRow(contact, id));
  };

  const generateRandomKey = () => {
    let key;
    do {
      key = (++contactCounter).toString();
    } while (localStorage.getItem('contacts') && JSON.parse(localStorage.getItem('contacts'))[key]);
    return key;
  };

  const formControl = (form, list, closeModal) => {
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

  const addContactLocal = (list) => {
    const contacts = JSON.parse(localStorage.getItem('contacts') || '{}');
    Object.keys(contacts).forEach((id) => {
      contacts[id].forEach((contact) => addContactPage(contact, list, id));
    });
  };

  const removeStorage = (id) => {
    const contacts = JSON.parse(localStorage.getItem('contacts') || '{}');
    delete contacts[id];
    localStorage.setItem('contacts', JSON.stringify(contacts));
  };

  const deleteControl = (btnDel, list) => {
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
