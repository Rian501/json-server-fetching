let arrayOfFoods = [];

fetch("http://localhost:8088/food/8")
  .then(foods => foods.json())
  .then(parsedFoods => {
    console.log(parsedFoods)
    arrayOfFoods = parsedFoods;
    console.table(arrayOfFoods);
  })
  
  console.log("arrayOfFood below then", arrayOfFoods);

let pizza = {
  name: "Sausage and mushroom pizza",
  type: "pizza",
  ethnicity: "italian"
}

const addNewFood = (theNewFoodToAdd) => {
fetch("http://localhost:8088/food", {
  method: "POST", // *GET, POST, PUT, DELETE, etc.
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
  body: JSON.stringify(theNewFoodToAdd), // body data type must match "Content-Type" header
  //if you are doing a POST or PUT you must include a body
})
  .then(response => response.json())
  .then(responseFromJsonServer => {
    console.log(responseFromJsonServer)
  }); // parses response to JSON
}

const deleteBadFood = (idOfFoodToDelete) => {
  fetch(`http://localhost:8088/food/${idOfFoodToDelete}`, {
    method: "DELETE"
  })
  .then(response => response.json())
  .then(parsedRes => {
    console.log("response from Delete", parsedRes);
  })
}


// addNewFood(pizza);

deleteBadFood(2);