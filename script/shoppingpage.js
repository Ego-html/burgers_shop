let button = document.getElementsByClassName("button");
let price = document.getElementsByClassName("product-price");
let arrayOrders = [];

function addToCart(event) {
  let target = event.target;
  if (target.tagName != "BUTTON") return;
  let text = target.previousSibling;
  let productItem = target.closest('.products-item');
  let currentPrice = productItem.querySelector('.product-price');
  let productItemText = productItem.querySelector('.products-item-text');
  console.log(productItemText);
  let productItemTitle = productItem.querySelector('.products-title-item');
  let productItemPicture = productItem.querySelector('.products-item-img');

  let sum = currentPrice.innerHTML.match(/[0-9]+/g);

  let img = productItemPicture.children[0].src;
  console.log(img);
  if (localStorage.length != 0) {
    let parse = JSON.parse(localStorage.burgers);
    parse.push({
      price: sum[0],
      discription: productItemText.innerHTML,
      name: productItemTitle.innerHTML,
      img: img,
    });
    let uniqueObj = parse
      .reduce(function (map, orders) {
        map.has(orders.name) ? null : map.set(orders.name, orders);
        return map;
      }, new Map())
      .values();
    let uniqueOrders = [...uniqueObj];
    localStorage.clear();
    localStorage.setItem("burgers", JSON.stringify(uniqueOrders));
  } else {
    localStorage.setItem(
      "burgers",
      JSON.stringify([
        {
          price: sum[0],
          discription: productItemText.innerHTML,
          name: productItemTitle.innerHTML,
          img: img,
        },
      ])
    );
  }

  window.location.href = 'http://burgers/shoppingcart.html';
}

for (let i = 0; i < button.length; i++) {
  button[i].addEventListener("click", addToCart);
}
