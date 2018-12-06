//in here, I need to build and return an HTML thing that contains all my food info, using foodObject.name, foodObject.type, etc.
const foodFactory = (foodObject) => {
  let HTMLfoodSection = (`
  <section class="foodcard">
    <h3>${foodObject.name}</h3>
    <p>${foodObject.type}</p>
    <p>${foodObject.ethnicity}</p>
  </section>
  `)
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
    parsedFoods.forEach(foodObj => {
      console.log("food back from json server", foodObj)
      const foodAsHTML = foodFactory(foodObj)
      addFoodToDom(foodAsHTML)
    })
  })