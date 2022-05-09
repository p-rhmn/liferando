let mealName = [];
let prices = [];
let amount = [];
let delivery = 4.5;

let allMeals = {
  popularMeals: {
    img: '',
    title: 'Beliebte Gerichte',
    description: '',
    meals: [
      {
        img: '',
        title: '',
        descriptions: [
          'mit 100g knusprig gebratenem Hähnchenfilet und Mayonnaise',
          'Wahl aus: mit Zwiebeln.',
        ],
        name: 'Crispy Chicken Burger',
        price: 5.6,
        category: 'popularMeals',
      },
      {
        img: '',
        title: '',
        descriptions: [
          'mit 100g saftigem Rindfleischpatty, Käse, Hamburgersauce und Ketchup',
          'Wahl aus: mit Zwiebeln.',
        ],
        name: 'Cheeseburger',
        price: 5.6,
        category: 'popularMeals',
      },
    ],
  },

  salatMeals: {
    img: 'img/salat.png',
    title: 'Salat',
    description: 'Alle Salate werden mit einem Dressing nach Wahl serviert.',
    meals: [
      {
        img: '',
        title: '',
        descriptions: [
          'gemischter Salat der Saison mit Gurken, Tomaten und Möhren',
          'Wahl aus: mit Essig-Öl-Dressing, mit Kräuter-Dressing oder ohne Dressing.',
        ],
        name: 'Salat Mista',
        price: 6.5,
        category: 'salatMeals',
      },
      {
        img: '',
        title: '',
        descriptions: [
          'mit Tomaten, roten Zwiebelringen, Oliven und Parmesan',
          'Wahl aus: mit Essig-Öl-Dressing, mit Kräuter-Dressing oder ohne Dressing.',
        ],
        name: 'Salat Pomodoro e Rucola',
        price: 8.5,
        category: 'salatMeals',
      },
      {
        img: '',
        title: '',
        descriptions: [
          'mit Mozzarella, Tomaten, frischem Basilikum, Basilikumessig und Olivenöl',
          'Wahl aus: mit Kräuter-Dressing oder ohne Dressing.',
        ],
        name: 'Salat Caprese',
        price: 7.5,
        category: 'salatMeals',
      },
    ],
  },

  pizzaMeals: {
    img: 'img/pizza.png',
    title: 'Pizza',
    description:
      'Alle Pizzen werden mit Tomatensauce, Käse und Oregano zubereitet.',
    meals: [
      {
        img: '',
        title: '',
        descriptions: ['', 'Wahl aus: Ø 32 cm oder 52cm x 32cm.'],
        name: 'Pizza Margherita',
        price: 8.5,
        category: 'pizzaMeals',
      },
      {
        img: '',
        title: '',
        descriptions: ['', 'Wahl aus: Ø 32 cm oder 52cm x 32cm.'],
        name: 'Pizza Salami',
        price: 8.5,
        category: 'pizzaMeals',
      },
    ],
  },
};

function init() {
  showAllMeals();
  renderMeals();
}

function showAllMeals() {
  let menuCard = document.getElementById('menu-card-container');
  menuCard.innerHTML = '';

  for (const [key, value] of Object.entries(allMeals)) {
    menuCard.innerHTML += generateCategoryCardHTML(value);
    generateMealCardHTML(key, value.meals, menuCard);
  }
}

function generateCategoryCardHTML(value) {
  if (value.img == '') {
    return `
      <div class="little-menu-title-card">
        <span>${value.title}</span>
        <p>${value.description}</p>
      </div>`;
  } else {
    return `
    <div class="menu-title-card">
       <img src="${value.img}">
       <h3>${value.title}</h3>
       <p>${value.description}</p>
     </div>`;
  }
}

function generateMealCardHTML(key, meals, container) {
  console.log(key);
  for (let i = 0; i < meals.length; i++) {
    container.innerHTML += `
      <div onclick="addToBasket('${key}',${i})" class="menu-card">
        <h4>${meals[i].name}<span>Produktinfo</span></h4>
        <p>${meals[i].descriptions[0]}</p>
        <p>${meals[i].descriptions[1]}</p>
        <div class="menu-card-price">${meals[i].price.toFixed(2) + '€'}</div>
        <img class="add-icon" src="img/plus.png" />
      </div>  
    `;
  }
}

function addToBasket(mealCategory, mealIndex) {
  let searchMeal = allMeals[mealCategory].meals[mealIndex];
  let position = mealName.indexOf(searchMeal.name);
  console.log(searchMeal);
  console.log(position);

  if (position == -1) {
    mealName.push(searchMeal.name);
    prices.push(searchMeal.price);
    amount.push(1);
  } else {
    amount[position]++;
  }

  renderMeals();
  activateOrderBtn();
}

function renderMeals() {
  let basketOrder = document.getElementById('basket');
  basketOrder.innerHTML = '';
  let orderPrice = 0;

  for (let i = 0; i < mealName.length; i++) {
    let sumOrder = prices[i] * amount[i];
    orderPrice += sumOrder;

    basketOrder.innerHTML += `
        <div id="basket-order" class="basket-full">
          <span id="amount${i}">${amount[i]}</span>
          <span class="reduce-name">${mealName[i]}</span>
          <div>
            <img onclick="reduceOrder(${i})"class="pointer" src="img/minus-basket.png">
            <img onclick="increaseOrder(${i})" class="pointer" src="img/plus-basket.png">
            <img class="pointer" src="img/pencil.png">
          </div>
          <span id="sum-order${i}">${sumOrder.toFixed(2) + '€'}</span>
          <img onclick="deleteBasketOrder(${i})" class="pointer" src="img/trash.png">
        </div>
      `;
  }
  proveBasket(basketOrder, orderPrice);
}

function proveBasket(basketOrder, orderPrice) {
  let sumWrite = document.getElementById('sum');
  let finalWrite = document.getElementById('final-sum');
  if (prices.length == 0) {
    sumWrite.innerHTML = '0.00€';
    finalWrite.innerHTML = '0.00€';
    basketOrder.innerHTML = `
        <img class="basket-empty-icon" src="img/warenkorb.png" />
        <span class="basket-empty-txt">Wähle leckere Gerichte aus der Karte und bestelle Dein Menü.</span>
    `;
  } else {
    sumWrite.innerHTML = orderPrice.toFixed(2) + '€';
    finalWrite.innerHTML = (orderPrice + delivery).toFixed(2) + '€';
  }
}

function reduceOrder(i) {
  if (amount[i] >= 2) {
    amount[i]--;
    document.getElementById('amount' + i).innerHTML = `${amount[i]}`;
    renderMeals();
  } else {
    deleteBasketOrder();
    renderMeals();
  }
}

function increaseOrder(i) {
  amount[i]++;
  document.getElementById('amount' + i).innerHTML = `${amount[i]}`;
  renderMeals();
}

function clearArrays(i) {
  mealName.splice(i, 1);
  prices.splice(i, 1);
  amount.splice(i, 1);
}

function deleteBasketOrder(i) {
  clearArrays(i);
  renderMeals();
  if (amount == 0) {
    deactivteOrderBtn();
  }
}

window.onscroll = function () {
  if (window.pageYOffset > 72) {
    document.getElementById('side-basket').style = `top: 0;`;
  } else {
    document.getElementById('side-basket').style = `top: 72px`;
  }
};

function activateOrderBtn() {
  document.getElementById('basket-submit-btn').style =
    'background-color: #ff8700; cursor: pointer;';
}

function deactivteOrderBtn() {
  document.getElementById('basket-submit-btn').style =
    'background-color: #61606048; cursor: not-allowed;';
}

function openBasket() {
  document.getElementById('side-basket').style = 'display: block;';
}

function closeBasket() {
  document.getElementById('side-basket').style = 'display: none;';
}
