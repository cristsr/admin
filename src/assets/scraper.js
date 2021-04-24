let categories = [];
let subcategories = [];

let scraper = () => {
  const length = document.querySelector('.fast').childElementCount

  for (let i = 0; i < length; i++) {
    getCategory(i);
    getSubcategories(i);
  }

  console.log('category', JSON.stringify(categories));
  console.log('subcategories', JSON.stringify(subcategories));
}
scraper()

function getCategory(i) {
  const elements = document.querySelector('.fast').children;
  const categoryEl = elements[i].querySelector('.category');
  const categoryName = categoryEl.querySelector('.category-name').innerText;

  categoryEl.click();

  categories.push({
    id: i,
    icon: '',
    color: '',
    name: categoryName,
  })
}

function getSubcategories(categoryId) {
  const $subcategories = document.querySelectorAll('.subcategory');
  for (const subcategory of $subcategories) {
    const name = subcategory.querySelector('.btn-subcategory').innerText;
    subcategories.push({
      categoryId,
      name
    })
  }

  document.querySelector('.btn-actions-modal')
    .firstElementChild
    .lastElementChild
    .click();
}
