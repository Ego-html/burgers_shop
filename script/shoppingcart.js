let burgerPrice = document.querySelector(".product-item-price");

let parse = JSON.parse(localStorage.getItem("burgers"));
parse.forEach((order) => {
    renderingOrderBurgers(order.price, order.discription, order.name, order.img);
});

function renderingOrderBurgers(price, discription, name, imgburger) {
    let order = document.querySelector(".order");
    let burgerOrder = document.createElement("div");
    burgerOrder.classList.add("burger-order");
    let buttonRemove = document.createElement("input");
    burgerOrder.appendChild(buttonRemove);
    buttonRemove.classList.add("button-remove");
    buttonRemove.setAttribute("type", "button");
    buttonRemove.value = "X";
    buttonRemove.setAttribute("title", "Remove item from basket");
    let burgerImg = document.createElement("div");
    burgerOrder.appendChild(burgerImg).classList.add("burgers-img");
    let img = document.createElement("img");
    burgerImg.appendChild(img);
    img.setAttribute("src", imgburger);
    let productTextPriceCount = document.createElement("div");
    productTextPriceCount.classList.add("product-text-price-сount");
    burgerOrder.appendChild(productTextPriceCount);
    let burgerName = document.createElement("div");
    productTextPriceCount.appendChild(burgerName);
    burgerName.classList.add("burger-name");
    let textBurgerName = document.createTextNode(name);
    burgerName.appendChild(textBurgerName);
    let productItemText = document.createElement("div");
    productTextPriceCount.appendChild(productItemText);
    productItemText.classList.add("product-item-text");
    let textDisription = document.createTextNode(discription);
    productItemText.appendChild(textDisription);
    let productItemPrice = document.createElement("div");
    productTextPriceCount.appendChild(productItemPrice);
    productItemPrice.classList.add("product-item-price");
    let textPrice = document.createElement("span");
    productItemPrice.appendChild(textPrice);
    textPrice.textContent = price + " " + "грн";
    let counter = document.createElement("div");
    productTextPriceCount.appendChild(counter);
    counter.classList.add("counter");
    let inputArrows = document.createElement("div");
    counter.appendChild(inputArrows);
    inputArrows.classList.add("input-arrows");
    let inputCount = document.createElement("input");
    inputArrows.appendChild(inputCount);
    inputCount.classList.add("input-count");
    inputCount.value = 1;
    let arrows = document.createElement("arrows");
    inputArrows.appendChild(arrows);
    arrows.classList.add("arrows");
    let arrowUp = document.createElement("span");
    arrows.appendChild(arrowUp);
    arrowUp.innerHTML = "&#x25B2";
    arrowUp.classList.add("arrow-up");
    let arrowDown = document.createElement("span");
    arrows.appendChild(arrowDown);
    arrowDown.innerHTML = "&#x25BC";
    arrowDown.classList.add("arrow-down");

    order.appendChild(burgerOrder);
}

let orderBurgers = document.querySelector(".order");
let orderMoreBurgers = document.createElement("button");
orderMoreBurgers.classList.add("order-more-burgers");
orderMoreBurgers.setAttribute(
    "onclick",
    "document.location='./shoppingpage.html'"
);
orderBurgers.appendChild(orderMoreBurgers);
orderMoreBurgers.innerHTML = "Order another burgers";

let totalPrice = document.querySelector(".total-sum-price");

let countSum = 0;

function getTotalSum(price) {
    countSum += Number(price);
    totalPrice.innerHTML = countSum + " " + "грн";
}

parse.forEach((price) => getTotalSum(price.price));

let arrowUp = document.getElementsByClassName("arrow-up");
let arrowDown = document.getElementsByClassName("arrow-down");
let inputArrows = document.querySelectorAll(".input-arrows");
let inputs = document.querySelectorAll(".input-count");

for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener("input", function () {
        this.value = this.value.replace(/^[^1-9]+$/g, "");
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].setAttribute("title", "You can order up to 10 burgers at time");
            inputs[i].setAttribute("maxlength", "1");
        }
    });
}

let currentValue = 1;

for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener("click", function (event) {
        if (event.target.value === "") return;
        currentValue = event.target.value;
    });
}

for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener("input", function (event) {
        let target = event.target;
        if (target.value === "") return;
        let inputArrows = target.parentElement;
        let counter = inputArrows.parentElement;
        let productItemPrice = counter.previousSibling;
        let span = productItemPrice.firstChild;
        let price = span.innerHTML.match(/[0-9]+/g);
        let sum = null;
        if (currentValue < this.value) {
            sum = (Number(this.value) - currentValue) * price[0];
            totalPrice.innerHTML =
                +totalPrice.innerHTML.match(/[0-9]+/g)[0] + sum + " " + "грн";
            currentValue = target.value;
        } else {
            let newValue = currentValue - this.value;
            let newSum = newValue * price[0];
            totalPrice.innerHTML =
                +totalPrice.innerHTML.match(/[0-9]+/g)[0] - newSum + " " + "грн";
            currentValue = target.value;
        }
    });
}

for (let i = 0; i < inputArrows.length; i++) {
    inputArrows[i].addEventListener("click", function (event) {
        if (event.target.classList.contains("arrow-up")) {
            let target = event.target;
            let arrows = target.parentElement;
            let inputArrows = arrows.parentElement;
            let counter = inputArrows.parentElement;
            let productTextPriceCount = counter.parentElement;
            let childProductTextPriceCount = productTextPriceCount.childNodes;
            let productItemPrice = childProductTextPriceCount[2];
            let priceInCurrency = productItemPrice.firstChild.innerHTML;
            let priceSeveralSimilarBurgers = priceInCurrency.match(/[0-9]+/g);
            let inputCount = inputArrows.firstChild;
            inputCount.value = Number(inputCount.value) + 1;
            if (inputCount.value > 1) {
                let currency = totalPrice.innerHTML.match(/[0-9]+/g);
                totalPrice.innerHTML =
                    Number(currency[0]) +
                    Number(priceSeveralSimilarBurgers[0]) +
                    " " +
                    "грн";
            }
        }
    });
}

for (let i = 0; i < inputArrows.length; i++) {
    inputArrows[i].addEventListener("click", function (event) {
        if (event.target.classList.contains("arrow-down")) {
            let target = event.target;
            let arrows = target.parentElement;
            let inputArrows = arrows.parentElement;
            let inputValue = inputArrows.firstChild;
            let counter = inputArrows.parentElement;
            let productItemPrice = counter.previousSibling;
            let span = productItemPrice.firstChild;
            let currencyPrice = span.innerHTML;
            let price = currencyPrice.match(/[0-9]+/g);
            if (inputValue.value == 1) {
                return;
            } else {
                inputValue.value -= 1;
            }
            let totalCurrencyPrice = totalPrice.innerHTML;
            let totalSum = totalCurrencyPrice.match(/[0-9]+/g);
            totalPrice.innerHTML = totalSum[0];
            let deductionTotalSum = totalSum[0] - price[0];
            totalPrice.innerHTML = deductionTotalSum + " " + "грн";
        }
    });
}

let order = document.querySelectorAll(".order");
let buttonRemove = document.querySelectorAll(".button-remove");
let ourInputs = document.getElementsByTagName("input");
let button = document.getElementById("button");

let inputName = document.getElementById("user-name");
inputName.addEventListener("input", function () {
    inputName.value = inputName.value.replace(/[^а-яА-Яa-zA-Z\s\-]/g, "");
});
let emailBlock = document.getElementById("email-block");
let email = document.getElementById("user-email");
let emailValue = null;
let message = null;
let messagePhone = null;
email.addEventListener(
    "blur",
    function () {
        let regexp = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,3}$/;
        if (!regexp.test(email.value) && email.value != "") {
            email.classList.add("incorrect-data");
            email.classList.add("wrong-email");
            message = document.createElement("p");
            emailBlock.appendChild(message);
            message.classList.add("message-incorrect-email");
            message.textContent = "Incorrect email";
            checkInputValidation();
        } else {
            emailValue = email.value;
            email.classList.remove("wrong-email");
            let messages = document.getElementsByClassName("message-incorrect-email");
            for (let i = 0; i < messages.length; i++) {
                messages[i].textContent = "";
            }
            email.classList.remove("incorrect-data");
            if (email.value == "") {
                message.classList.add("correct-email");
            }
        }
        checkInputValidation();
    },
    true
);

let phone = document.getElementById("phone");
phone.addEventListener("input", function () {
    phone.value = phone.value.replace(/[^0-9\-+]/g, "");
});
let phoneValue = null;
phone.addEventListener(
    "blur",
    function () {
        let regexp = /^(\+\d{1}-\d{4}-\d{7})$/;
        if (!regexp.test(phone.value) && phone.value != "") {
            phone.classList.add("incorrect-data");
            phone.classList.add("wrong-phone");
            let phoneBlock = document.getElementById("phone-block");
            messagePhone = document.createElement("p");
            phoneBlock.appendChild(messagePhone);
            messagePhone.classList.add("message-incorrect-phone");
            messagePhone.textContent = "Incorrect phone";
            checkInputValidation();
        } else {
            phone.classList.remove("wrong-phone");
            let messagesPhone = document.getElementsByClassName(
                "message-incorrect-phone"
            );
            for (let i = 0; i < messagesPhone.length; i++) {
                messagesPhone[i].textContent = "";
            }
            phone.classList.remove("incorrect-data");
            checkInputValidation();
        }
    },
    true
);

let adress = document.getElementById("address");
adress.addEventListener("input", function () {
    adress.value = adress.value.replace(/[^0-9a-zA-Zа-яА-Я\s.,-]+/g, "");
});

let checkOrder = null;

function checkInputValidation() {
    let inputsElement = Array.from(ourInputs);
    checkOrder = JSON.parse(localStorage.getItem("burgers"));
    let checkValidationEmailAndAddress = inputsElement.some((x) =>
        x.classList.contains("incorrect-data")
    );
    let checkAllInputsFilled = inputsElement.some((x) => x.value == "");
    if (
        !checkAllInputsFilled != "" &&
        !checkValidationEmailAndAddress &&
        checkOrder.length != 0
    ) {
        button.classList.add("button-able");
    } else {
        button.classList.remove("button-able");
        button.classList.add("button-disable");
    }
}

for (let i = 0; i < ourInputs.length; i++) {
    {
        ourInputs[i].addEventListener("change", function () {
            checkInputValidation();
        });
    }
}

let newParse;

for (let i = 0; i < order.length; i++) {
    order[i].addEventListener("click", function (event) {
        if (event.target.classList.contains("button-remove")) {
            let target = event.target;
            let parentElement = target.parentElement;
            parentElement.remove();
            let productTextPriceCount = parentElement.children[2];
            let productItemPrice = productTextPriceCount.children[2];
            let productTextPriceNameCollections = parentElement.childNodes[2];
            let productName = productTextPriceNameCollections.firstChild;
            let parse = JSON.parse(localStorage.burgers);
            newParse = parse.filter((x) => x.name != productName.innerHTML);
            countSum = 0;
            let price = productItemPrice.innerHTML.match(/[0-9]+/g);
            let counter = productItemPrice.nextSibling;
            let inputArrows = counter.firstChild;
            let inputValue = inputArrows.firstChild;
            let sumSeveralBurgers = Number(inputValue.value) * Number(price[0]);
            let arr = totalPrice.innerHTML.match(/[0-9]+/g);
            totalPrice.innerHTML = Number(arr[0]) - sumSeveralBurgers + " " + "грн";
            localStorage.clear();
            localStorage.setItem("burgers", JSON.stringify(newParse));
            if (newParse.length == 0) {
                displayBasket();
                button.classList.remove("button-able");
                button.classList.add("disable");
            }
        }
    });
}

let arrayCheckLocalStorageLength = JSON.parse(localStorage.getItem("burgers"));

if (arrayCheckLocalStorageLength == 0) {
    window.onload = displayBasket;
}

function displayBasket() {
    countSum = 0;
    getTotalSum("0");
    let orderBlock = document.querySelector(".order");
    let imgBasket = document.createElement("img");
    orderBlock.appendChild(imgBasket);
    let p = document.createElement("p");
    orderBlock.appendChild(p);
    let text = document.createTextNode("Shoping сart is empty");
    p.appendChild(text);
    p.classList.add("shopingcart-is-empty");
    imgBasket.src = "../DeliveryApp/images/cart.png";
    imgBasket.style.width = "220px";
    imgBasket.style.height = "auto";
    imgBasket.classList.add("img-basket");
    orderBlock.classList.toggle("empty-cart");
    let buttonFirstPage = document.createElement("button");
    buttonFirstPage.classList.add("button-first-page");
    orderBlock.appendChild(buttonFirstPage);
    buttonFirstPage.innerHTML = "Back to shop page";
    buttonFirstPage.setAttribute(
        "onclick",
        "document.location='./shoppingpage.html'"
    );
    orderMoreBurgers.remove();
}

let submit = document.querySelector(".button-submit");
let inputsForm = document.querySelectorAll(".input-form");
let userName = document.getElementById("user-name");
let userEmail = document.getElementById("user-email");
let userPhone = document.getElementById("phone");
let userAddress = document.getElementById("address");

let burgersName = document.getElementsByClassName("burger-name");

submit.addEventListener("click", function () {
    if (button.classList.contains("button-able") && checkOrder.length > 0) {
        let burgersOrder = JSON.parse(localStorage.getItem("burgers"));
        let countBurgersOrder = null;

        //Сбор данных пользователя
        let userName = document.getElementById('user-name').value;
        let userEmail = document.getElementById('user-email').value;
        let userPhone = document.getElementById('phone').value;
        let userAddress = document.getElementById('address').value;

        for (let i = 0; i < burgersName.length; i++) {
            let text = burgersName[i].nextSibling;
            let productItemPrice = text.nextSibling;
            let price = productItemPrice.firstChild.innerHTML;
            let counter = productItemPrice.nextSibling;
            let inputArrows = counter.firstChild;
            let inputCount = inputArrows.firstChild;
            countBurgersOrder = inputCount.value;
            burgersOrder[i]["count-burgers-order"] = countBurgersOrder;
        }
        let burgers = JSON.stringify(burgersOrder);

        //Формирование данных для отправки
        let orderData = {
            user: {
                name: userName,
                email: userEmail,
                phone: userPhone,
                address: userAddress
            },
            //orders: burgers
        };

        const orderDataToJson = JSON.stringify(orderData);

        let jsonHeaders = new Headers({"Content-Type": "application/json"});
        fetch("http://burgers/PHP/submit_order.php", {
            method: "POST",
            headers: jsonHeaders,
            body: orderDataToJson
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.status === 'success') {
                    let params = new URLSearchParams({
                        name: data.user.name,
                        phone: data.user.phone
                    });
                    window.location.href = './order_success.html?' + params.toString();
                } else {
                    document.getElementById('order-status').innerText = data.message;
                }
            })
            .catch(error => console.error('Error', error));

    }
});
