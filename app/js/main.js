const variantList = document.getElementById('variantList');
const buttonsSection = document.getElementById('buttonsSection');
const htmlCodeList = document.getElementById('htmlCodeList');
const cssCodeList = document.getElementById('cssCodeList');
const buttonVersion1 = document.getElementById('version1');
const buttonVersion2 = document.getElementById('version2');
const buttoVersion3 = document.getElementById('version3');

buttonVersion1.addEventListener('click', () => {
  displayOnlyVariant(1);
});

buttonVersion2.addEventListener('click', () => {
  displayOnlyVariant(2);
});

buttoVersion3.addEventListener('click', () => {
  displayOnlyVariant(3);
});


const displayOnlyVariant = (variantId) => {
  let variantItems = [...variantList.children];
  let buttons = [...buttonsSection.children];
  let htmlCodeItems = [...htmlCodeList.children];
  let cssCodeItems = [...cssCodeList.children];

  variantItems.forEach((elem, index) => {
    if (!elem.classList.contains('noDisplay' || index !== (variantId - 1))) {
      elem.classList.add('noDisplay');
    }

    if (index === (variantId - 1)) {
      elem.classList.remove('noDisplay')
    }
  });

  buttons.forEach((elem, index) => {
    if (elem.classList.contains('active')) {
      elem.classList.remove('active')
    }

    if (index === (variantId - 1)) {
      elem.classList.add('active')
    }
  });

  htmlCodeItems.forEach((elem, index) => {
    if (!elem.classList.contains('noDisplay' || index !== (variantId - 1))) {
      elem.classList.add('noDisplay');
    }

    if (index === (variantId - 1)) {
      elem.classList.remove('noDisplay')
    }
  });

  cssCodeItems.forEach((elem, index) => {
    if (!elem.classList.contains('noDisplay' || index !== (variantId - 1))) {
      elem.classList.add('noDisplay');
    }

    if (index === (variantId - 1)) {
      elem.classList.remove('noDisplay')
    }
  });
};