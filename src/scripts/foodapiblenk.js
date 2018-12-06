//in here, I need to build and return an HTML thing that contains all my food info, using foodObject.name, foodObject.type, etc.
const foodFactory = (foodObject) => {
  let HTMLfoodSection = `
  <section class="foodcard">
    <h3>${foodObject.name}</h3>
    <h5>${foodObject.type}</h5>
    <h6>${foodObject.ethnicity}</h6>
    <p>${foodObject.ingredients}</p>
    <p>Sugars: ${foodObject.sugar}</p>
    <p>Fat: ${foodObject.fat}</p>
    <p>Calories per serving: ${foodObject.calories}</p>
  </section>
  `
  console.log("html string?", HTMLfoodSection);
  return HTMLfoodSection;
}


const addFoodToDom = (foodHTML) => {
  //in here I need to take the HTML thing and append it to the DOM
  const articleContainer = document.querySelector(".foodList");
  articleContainer.innerHTML += foodHTML;
}

fetch("http://localhost:8088/food")
  .then(foods => foods.json())
  .then(parsedFoods => {
    console.log('parsed foods array', parsedFoods);
    parsedFoods.forEach(foodObj => {
      
      fetch(`https://world.openfoodfacts.org/api/v0/product/${foodObj.barcode}.json`)
      .then(response => response.json())
      .then(productInfo => {
        //after the dot is a new key, for which the value is whatever is on the right side of the =
        foodObj.ingredients = productInfo.product.ingredients_text;
        foodObj.country = productInfo.product.countries;
        foodObj.sugar = productInfo.product.nutriments.sugars_value;
        foodObj.fat = productInfo.product.nutriments.fat_serving;
        foodObj.calories = productInfo.product.nutriments.energy_serving;
        const foodAsHTML = foodFactory(foodObj);
        addFoodToDom(foodAsHTML)
        })
    })
  })