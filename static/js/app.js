//TODO: fix if 2 of the same item are added to cart.
// function to get navbar from header:
function getNav(response) {
  $('header').html(response);
};
$.get('./components/header.html', getNav);


//building cards
let item = ``

function getData(response) {
  for (let i in response) {
      item += `<div class="card"><img src="${response[i]['img_url']}" alt="placeholder"><div class="card-title">${response[i]['name']}</div><div class="item-price">$${response[i]['price']}</div><div class="card-text">${response[i]['description']}</div><a class="btn btn-primary add" id="${response[i]['id']}" onclick="makeCart(${response[i]['id']})">Add to Cart</a></div>`
  }
  $('.insert-cards').html(item);
};
//grabs data from json file - then runs function
$.get('./products.json', getData);


let b = ``
//functinn for add to cart button
function makeCart(id) {
  // checkCart(id);
  $.get('./products.json', function(response) {
    for (let i in response) {
      if (id == response[i]['id']) {
        b += `<tr class="${response[i]['id']}"><td>1</td><td>${response[i]['name']}</td><td>${response[i]['price']}</td><td><a class="remove" onclick="removeFromCart(${response[i]['id']}, ${response[i]['price']})">X</a></td></tr>`;
        $('.body').html(b);
        $('.body2').html(b);
        getTotal(response[i]['price'])
      }
    }
  });
}

//checking if cart has same item
// function checkCart(id) {
//   var check = /102/;
//   var result = b.match(check);
//   console.log(result);
// }
function removeFromCart(id, price) {

  let removeMe = $(`.${id}`)[0].outerHTML;

  //removes from table
  $(`.${id}`).remove();


  // remove from b
  let str = b.replace(removeMe, '');
  b = str
  subTotal(price)
}

//displaying total dollars in cart
let t = 0;

//add total together calls displayTotal() to display total amount.
function getTotal(num) {
      t += num;
      displayTotal(t);
}

function displayTotal(num) {
  num = num.toFixed(2);
  $('#total').text(num);
  $('#total2').text(`Total: ${num}`)
}

function subTotal(num) {
  t -= num;
  displayTotal(t)
}

//=======================================================

// Today's challenge:
//
// In Javascript, write a function that takes in a string and checks for matching brackets and parenthesis and returns true or false depending if they are correctly written. They must be in the correct order, meaning that a parenthesis or bracket must be opened before one can be closed. Examples:

// ```checkValidator("( ( ( [ [ [ ] ] ] ) ) )")     // is true
// checkValidator("( )")          // is true
// checkValidator("] [ [ ] ] ]")      // is false
// checkValidator("( ( ] ) )")       // is false```
// checkValidator("( [ ) ]")     // is false


//
// function checkValidator(things) {
//   things= things.split('');
//   //clearing whitespace
//   for(let i in things) {
//     if (things[i] == ' ') {
//       things.splice(i, 1)
//     }
//   }
//   // console.log(things);
//   if(things.length % 2 == 0 ) {
//     let things1 = things.slice(0,things.length / 2);
//     let things2 = things.slice((things.length / 2)-1, -1);
//     // console.log(things1);
//     // console.log(things2);
//     for (let i in things1) {
//       if (things[i] == ']' || things[i] == ')') {
//         return false;
//       } else {
//         for (i in things1) {
//           console.log(things1[i]);
//           console.log(things2[i]);
//         }
//
//       }
//     }
//   } else {
//   return false;
// }
// }
//
// let w = checkValidator("[(])()[[]]")
// console.log(w);
