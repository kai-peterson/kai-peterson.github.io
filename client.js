$(document).ready(readyNow);

let garage = [];

function newCar(yearInput, makeInput, modelInput, priceInput, imageInput){
  console.log('in newCar:', yearInput, makeInput, modelInput, priceInput, imageInput);
  const newCarObject = {
    year: yearInput,
    make: makeInput,
    model: modelInput,
    price: priceInput,
    image: imageInput
  }
  garage.push(newCarObject);
  return true;
} // end newCar

function readyNow() {
  console.log('JQ');
  $('#addCar').on('click', addNewCar);
}

function addNewCar() {
  // create variable with values from input fields
  let year = $('#carYear').val();
  let make = $('#carMake').val();
  let model = $('#carModel').val();
  let price = $('#carPrice').val();
  let image = $('#carImage').val();
  // if any of the input fields are empty, alert user and end function
  if (year === '' || make === '' || model === '' || price === '' || image === '') {
    alert('You missed an input. Try again!');
    return false;
  }
/* make a temp garage to check if price has comma in interval. We need to do this
before running newCar so the car doesn't get added to garage and displayed on DOM.
But we 'need' the car to be in the garage to check if the price has a comma, hence the tempGarage */
  let tempGarage = [{
    year: year,
    make: make,
    model: model,
    price: price,
  }]
  if (totalPrice(tempGarage) === false) {
    return false;
  }
  // run values from input fields through newCar function
  newCar(year, make, model, price, image);
  // create variable for h2 tag and empty it
  let priceHeader = $('#totalPrice');
  priceHeader.empty();
  // set that h2 to the value of the garage's total price
  let theTotalPrice = 'Total Net Worth: $' + totalPrice(garage);
  console.log('Total price of garage: $' + totalPrice(garage));
  priceHeader.append(theTotalPrice);
  // assign div with class="garage" to a variable
  let carGarage = $('.garage');
  // empty that div
  carGarage.empty();
  // turn car objects into formatted text and append them into undordered list
  for (let i in garage) {
    let imgId = '#img' + i;
    // this conditional ensures that only the last item in the list is animated
    // only the last car is given class="animatedImage"
    if (i == garage.length - 1) {
      let listOfCars = '<li class="carItems"><img class="animatedImage" src="" alt="image of car" width="200" height="100" id="img' + i + '">';
      listOfCars += '<br>' + garage[i].make + ' ' + garage[i].model + ' (' + garage[i].year + ')';
      // adds $ to price of car if user input a number w/o it
      if (hasDollarSign(garage[i].price)) {
        listOfCars += '<br>Price: ' + garage[i].price;
      }
      else {
        listOfCars += '<br>Price: $' + garage[i].price;
      }
      carGarage.append(listOfCars);
      $(imgId).prop("src", garage[i].image);
    }
    else {
      let listOfCars = '<li class="carItems"><img src="" alt="image of car" width="200" height="100" id="img' + i + '">';
      listOfCars += '<br>' + garage[i].make + ' ' + garage[i].model + ' (' + garage[i].year + ')';
      if (hasDollarSign(garage[i].price)) {
        listOfCars += '<br>Price: ' + garage[i].price;
      }
      else {
        listOfCars += '<br>Price: $' + garage[i].price;
      }
      carGarage.append(listOfCars);
      $(imgId).prop("src", garage[i].image);
    }
    // target each unique img id and set it's source to the user-inputed image
  }
  // reset all input fields
  $('#carYear').val('');
  $('#carMake').val('');
  $('#carModel').val('');
  $('#carPrice').val('');
  $('#carImage').val('');
  // disables inputs and alerts user if garage is full
  if (garage.length >= 12) {
    $('#carYear').prop("disabled", true);
    $('#carMake').prop("disabled", true);
    $('#carModel').prop("disabled", true);
    $('#carPrice').prop("disabled", true);
    $('#carImage').prop("disabled", true);
    alert('The garage is full!')
  }
}

// returns true if a string has a $, false if not
function hasDollarSign(string) {
  if (string.indexOf('$') >= 0) {
    return true;
  }
  return false;
}

// calculates total price of all cars in garage
function totalPrice(garageFullOfCars) {
  let total = 0;
  for (let i in garageFullOfCars) {
    // if the price has a dollar sign in it...
    if (garageFullOfCars[i].price.indexOf('$') >= 0) {
      // remove dollar sign
      let noDollarSign = garageFullOfCars[i].price.substring(1, garageFullOfCars[i].price.length);
      // if it has a comma in it, alert user to remove comma and end function
      if (isNaN(Number(noDollarSign))) {
        alert('Type the price with no comma!')
        return false;
      }
      // add car price with no $ to total
      total += Number(noDollarSign);
    }
    else {
      // if price has a comma in it, alert user to remove comma and end function
      if (isNaN(Number(garageFullOfCars[i].price))) {
        alert('Type the price with no comma!')
        return false;
      }
      // add car price to total
      total += Number(garageFullOfCars[i].price);
    }
  }
  // return total price of all cars
  return total;
}
