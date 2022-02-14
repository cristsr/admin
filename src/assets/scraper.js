async function main() {
  const categories = [];

  const length = document.querySelectorAll('.categoryButton').length;

  for (let i = 0; i < length; i++) {
    await waitSeconds(1)

    const buttons = document.querySelectorAll('.categoryButton');

    const category = buttons[i];

    const categoryName = category.lastChild.innerText;

    console.log(categoryName);

    category.click();

    await waitSeconds(1)

    const subcats = Array.from(document.querySelectorAll('.subCategoryElement'))
      .map(subcat => subcat.innerText.toLowerCase())
      .map(subcat => ({name: subcat}));

    console.log(subcats);

    categories.push({
      icon: '',
      color: '',
      name: categoryName.toLowerCase(),
      subcategories: subcats
    });

    const back = document.querySelector('.finerio-accent-outline-color')
    back.click();

  }

  return categories;

}

function waitSeconds(seconds) {
  return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}

main().then(result => console.log(JSON.stringify(result)));
