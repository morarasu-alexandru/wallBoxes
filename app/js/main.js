const variantList = document.getElementById('variantList');
const Buttonversion1 = document.getElementById('version1');
const Buttonversion2 = document.getElementById('version2');

Buttonversion1.addEventListener('click', () => {
  displayOnlyVariant(1);
});

Buttonversion2.addEventListener('click', () => {
  displayOnlyVariant(2);
});


const displayOnlyVariant = (variantId) => {
  let children = [...variantList.children];

  children.forEach((elem, index) => {
    if (!elem.classList.contains('noDisplay' || index !== (variantId - 1))) {
      elem.classList.add('noDisplay');
    }

    if (index === (variantId - 1)) {
      elem.classList.remove('noDisplay')
    }
  });
};