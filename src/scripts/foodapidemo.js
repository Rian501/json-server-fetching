fetch("http://localhost:8088/food")
  .then(foods => foods.json())
  .then(parsedFoods => {
    parsedFoods.forEach(food => {
      fetch(`https://world.openfoodfacts.org/api/v0/product/${food.barcode}.json`)
        .then(response => response.json())
        .then(foodDetails => {
          console.log("product details", foodDetails.product)
          food.ingredients = foodDetails.product.ingredients_text_en;
          food.calories = foodDetails.product.nutriments.energy_serving;
          food.fat = foodDetails.product.nutriments.fat_serving;
          food.sugar = foodDetails.product.nutriments.sugars_serving;
          console.log("food obj", food)
          const foodAsHTML = foodFactory(food)
          addFoodToDom(foodAsHTML)
        })
    })
  })

const DOMref = document.querySelector(".foodList");

const foodFactory = (foodObject) => {
  let HTMLfoodString = ""
  //in here, I need to build and return an HTML thing that contains all my food info
  console.log(foodObject);
  if (foodObject.ingredients) {
    HTMLfoodString += `
    <section class="card">
    <h3>${foodObject.name}</h3>
    <p>${foodObject.ethnicity}</p>
    <p>${foodObject.type}</p>
    <p>${foodObject.ingredients}</p>
    <p>calories: ${foodObject.calories}</p>
    <p>fat: ${foodObject.fat}</p>
    <p>sugar: ${foodObject.sugar}</p>
    </section>
    `
  } else {
    HTMLfoodString += `
    <section class="card">
    <h3>${foodObject.name}</h3>
    <p>${foodObject.ethnicity}</p>
    <p>${foodObject.type}</p>
    <p>calories: ${foodObject.calories}</p>
    <p>fat: ${foodObject.fat}</p>
    <p>sugar: ${foodObject.sugar}</p>
    </section>
    `
  }
  return HTMLfoodString;
}

const addFoodToDom = (foodHTML) => {
  DOMref.innerHTML += (foodHTML);
  //in here I need to take the HTML thing and append it to the DOM
}