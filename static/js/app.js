//TODO: fix if 2 of the same item are added to cart.
// function to get navbar from header:
function getNav(response) {
  $('header').html(response);
  return;
};
$.get('./components/header.html', getNav);

//building cards
let item = ``
function getData(response) {
  for (let i in response) {
      item += `<div class="card"><img src="${response[i]['img_url']}" alt="placeholder"><div class="card-title">${response[i]['name']}</div><div class="item-price">$${response[i]['price']}</div><div class="card-text">${response[i]['description']}</div><a class="btn btn-primary add" id="${response[i]['id']}" onclick="makeCart(${response[i]['id']}, '${response[i]['name']}')">Add to Cart</a></div>`
  }
  $('.insert-cards').html(item);
  return;
};
//grabs data from json file - then runs function
$.get('./products.json', getData);

//function for add to cart button

//variable for making the cart = b
let b = ``;

//list to track id's
let alist = [];
//number of product in cart
let number = 1;

function makeCart(id, name) {
  let trueorfalse = checkId(id)
  if (trueorfalse == true){
    addNumber();
    changeNumber(name);
    return;
  }
  addToList(id)
  //calling products from json file / printing the cart
  $.get('./products.json', function(response) {
    b = ``
    for (let j in alist) {
      for (let i in response) {
        if (alist[j] == response[i]['id']) {
          b += `<tr class="${response[i]['id']}"><td id="${response[i]['name']}">${number}</td><td>${response[i]['name']}</td><td>${response[i]['price']}</td><td><a class="remove" onclick="removeFromCart(${response[i]['id']}, ${response[i]['price']})">X</a></td></tr>`;
          $('.body').html(b);
          $('.body2').html(b);
          getTotal(response[i]['price']);
        }
      }
    }
  });
  return;
}

let str = ``

function removeFromCart(id, price) {
  let removeMe = $(`.${id}`)[0].outerHTML;
  //removes from table
  removeFromTable(id);
  removeFromB(removeMe);
  // remove from b
  subTotal(price);
  return;
}

//displaying total dollars in cart
let t = 0;

//add total together calls displayTotal() to display total amount.
function getTotal(num) {
      t += num;
      displayTotal(t);
    return;
}

function displayTotal(num) {
  num = num.toFixed(2);
  $('#total').text(`Total: $${num}`);
  $('#total2').text(`Total: $${num}`)
  return;
}

function subTotal(num) {
  t -= num;
  displayTotal(t);
  return;
}

function removeFromTable(id) {
  $(`.${id}`).remove();
  removeFromList(id)
  return;
}

function removeFromList(id) {
  for (let i in alist) {
    if (id == alist[i]) {
      alist.splice(i, 1)
    }
  }
  return;
}

function removeFromB(removeMe) {
  str = b.replace(removeMe, '');
  b = str;
  return;
}

function checkId(id) {
  for (let i in alist) {
    if (id == alist[i]) {
      console.log('id is in the list');
      return true
    }
  }
  return false;
}

function addToList(id) {
  //adding id to list
  alist.push(id);
  return;
}
// function addNumber() {
//   number += 1;
//   return;
// }
// function changeNumber(name) {
//   $(`#${name}`).text(number);
// }
// $('.add').click(function(e) {
//   let v = $(this).attr('id');
//   console.log(v);
// });

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
