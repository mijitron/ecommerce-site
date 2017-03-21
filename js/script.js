//JQUERY FUNCTIONS
$(".add-to-cart").click(function(event) {
  event.preventDefault();
  var name = $(this).attr("data-name");
  var price = Number($(this).attr("data-price")); //converts string into a number value
  
  addItemToCart(name, price, 1);
  displayCart();
  saveCart();
});

$(".remove-from-cart").click(function(event) {
  event.preventDefault();
  var name = $(this).attr("data-name");
  var price = Number($(this).attr("data-price")); //converts string into a number value
  
  removeItemFromCart(name, price, 1);
  displayCart();
  saveCart();
});

$("#clear-cart").click(function(event) {
  clearCart();
  displayCart();
  saveCart();
});

//call on this function to display current cart
//+= adds onto existing output
function displayCart() {
  
  var cartArray = listCart();
  
  var output = "";
  for (var i in cartArray) {
    output += "<li>"+cartArray[i].name+" "
      +cartArray[i].count
      +" X "+cartArray[i].price
      +" = "+cartArray[i].total+"</li>"
  }
  $("#show-cart").html(output);
  $("#count-cart").html( countCart() );
  $("#total-cart").html( totalCart() ); //call on the function and return the total value for the cart and print it into the html
}

//***************************************************************************
//SHOPPING CART FUNCTIONS


//var cart is an array that will contain all of the items added/removed to the shopping cart
var cart = [];


//function that will take variables and turn them into objects, class naming conventions call for an uppercase I
var Item = function(name, price, count){
  this.name = name
  this.price = price
  this.count = count
};

//function that items to the cart, addItemToCart(name, price, count)
function addItemToCart(name, price, count){
  for (var i in cart) {
    if(cart[i].name === name){
      cart[i].count += count;
      saveCart();
      return; 
    }
  } 
  var item = new Item(name, price, count);
  cart.push(item);
  saveCart();
}

//function that removes items from the cart, removeItemFromCart(name), assume all items have a unique name but generally you should use a product id number or sku
function removeItemFromCart(name){ //removes one quantity of an item
  for(var i in cart) {
    if(cart[i].name === name) {
      cart[i].count --;
      if (cart[i].count === 0){
        cart.splice(i,1); //removes item from cart after quantity reaches 0
      }
      break;
    }
  }
  saveCart();
}

//function that removes all of item name, removeItemFromCartAll(name)
function removeItemFromCartAll(name){
  for (var i in cart){
    if (cart[i].name === name){
      cart.splice(i, 1);
      break;
    }
  }
  saveCart();
  updateCartIcon();
}

//function to clear entire cart, clearCart();
function clearCart(){
  cart = [];
}

//function to count the number of items in the cart, countCart() ->returns total count
function countCart (){
  var totalCount = 0;
  for (var i in cart){
    totalCount += cart[i].count;
  }
  return totalCount;
}

//function to total your cart items ->returns total cost of cart items
function totalCart() {
  var totalCost = 0;
  for(var i in cart){
    totalCost += cart[i].price * cart[i].count;
  }
  return totalCost.toFixed(2); //rounds value to a number with x decimal places
}

//function returns an array of all items in the cart, listCart()
//understand concept of reference, arrays and objects are always references to the master array, splicing a list will change the original code.
function listCart () {
  var cartCopy = [];
  for (var i in cart) {
    var item = cart[i];
    var itemCopy = {};
    for (var p in item) {
      itemCopy[p] = item[p];
    }
    itemCopy.total = item.price * item.count;
    cartCopy.push(itemCopy);
  }
  return cartCopy;
}

//function to save the cart, local storage, saveCart()
function saveCart() {
  localStorage.setItem("shoppingCart", JSON.stringify(cart));
}

//function to load the cart, looks for previous data in the local storage, loadCart()
function loadCart() {
  cart = JSON.parse(localStorage.getItem("shoppingCart"));
}

loadCart();
displayCart();

var array = listCart();
console.log(array);

//***************************************************************************
//SORT BY ATTRIBUTE
function filterItems() {
  var sortMethod = document.filterBy.filter.value;
  if(sortMethod == "name") {
    sortName();
  }
  else if (sortMethod == "price") {
     { 
      sortPrice();
  } 
}
  event.preventDefault();
}

function sortName(){
  products.sort(function(a,b){
    if(a.name.toLowerCase() < b.name.toLowerCase())
      return -1;
    if(a.name.toLowerCase() > b.name.toLowerCase())
      return 1;
    return 0;
  });
  console.log(products);
}

function sortPrice(){
  products.sort(function(a,b){
    return a.price - b.price;
});
  console.log(products);
}

//***************************************************************************
//OBJECTS
var products = [
//list each product as an object to be listed within the products array
  {
    "name": "Reversible Plaid",
    "price": 26.99,
    "description": "Two classic patterns in one great look: This supersoft and cozy reversible scarf instantly doubles your street-style cred. 100% acrylic.",
    "imageTitle": "red.jpg",
    "count": 0
  },
  {
    "name": "Wool Cable Knit",
    "price": 49.99,
    "description": "Warm yourself with this women's natural cable knit scarf, crafted from 100% Merino wool. Imported.",
    "imageTitle": "white.jpg",
    "count": 0
  },
  {
    "name": "Northern Lights",
    "price": 29.99,
    "description": "Handmade by women in Agra, sales provide medical and educational support in this remote area of India. Crinkly 100% cotton.",
    "imageTitle": "rainbow.jpg",
    "count": 0
  },
  {
    "name": "Ombre Infinity",
    "price": 11.99,
    "description": "A dip-dye effect adds color and dimension to a cozy infinity scarf featuring a soft, chunky knit. 100% acrylic.",
    "imageTitle": "brown.jpg",
    "count": 0
  },
  {
    "name": "Fringed Plaid",
    "price": 18.99,
    "description": "Generously sized, extra soft and featuring a dazzling fringe, this scarf is rendered in a versatile gray, black and white plaid. Expertly beat the cold with style. 100% acrylic.",
    "imageTitle": "plaid.jpeg",
    "count": 0
  },
  {
    "name": "Multi Color",
    "price": 22.99,
    "description": "The Who What Wear Oversize Color-Block Square Scarf is big, bold, and designed to twist and wrap any way you wish. All the colors of the season are harmonized in this oversize accent, so you can adjust to contrast or match your outfit; soft and lush, it’s your stylish standoff against cold AC and unexpected fall breezes. 100% acrylic.",
    "imageTitle": "orange.jpg",
    "count": 0
  },
  {
    "name": "Etro Paisley-Print Silk",
    "price": 249.99,
    "description": "Luxurious silk scarf with subtle paisley pattern. 100% silk",
    "imageTitle": "blue.jpg",
    "count": 0
  },
  {
    "name": "Ashby Twill",
    "price": 70.99,
    "description": "Faribault brings you the Ashby Twill Scarf in Natural. Woven with a 'broken' twill technique, the Ashby Twill Scarf has a slight zigzag texture. Made in USA, this timeless scarf is crafted with luxurious merino wool and finished with heather gray fringe. 100% Merino wool",
    "imageTitle": "gray.jpg",
    "count": 0
  }
]