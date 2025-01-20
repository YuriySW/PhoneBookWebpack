import * as create from './createElement.mjs';
const {
  createImageLogo,
  createHeader,
  createLogo,
  createMain,
  createFooter,
  createButtonsGroup,
  createTable,
  createForm,
} = create;

export const renderPhoneBook = (selectorApp, title) => {
  const header = createHeader();
  const imageLogo = createImageLogo();
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

  header.headerContainer.append(imageLogo, logo);
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
