import addContactPage from './control';

export const getStorage = (id) => {
  const data = localStorage.getItem('contacts');
  try {
    const parsedData = data ? JSON.parse(data) : {}; //
    return parsedData[id] ? parsedData[id] : [];
  } catch {
    return [];
  }
};

export const setStorage = (id, newObj) => {
  if (typeof newObj === 'object' && newObj.name && newObj.surname && newObj.phone) {
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

export const generateRandomKey = () => {
  let contactCounter = 0;
  let key;
  do {
    key = (++contactCounter).toString();
  } while (localStorage.getItem('contacts') && JSON.parse(localStorage.getItem('contacts'))[key]);
  return key;
};

export const addContactLocal = (list) => {
  const contacts = JSON.parse(localStorage.getItem('contacts') || '{}');
  Object.keys(contacts).forEach((id) => {
    contacts[id].forEach((contact) => addContactPage(contact, list, id));
  });
};

export const removeStorage = (id) => {
  const contacts = JSON.parse(localStorage.getItem('contacts') || '{}');
  delete contacts[id];
  localStorage.setItem('contacts', JSON.stringify(contacts));
};
