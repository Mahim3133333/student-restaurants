const restaurantList = document.querySelector('#restaurantList');
const restaurantName = document.querySelector('#restaurantName');
const menuContainer = document.querySelector('#menuContainer');
const cityFilter = document.querySelector('#cityFilter');
const dailyBtn = document.querySelector('#dailyBtn');
const weeklyBtn = document.querySelector('#weeklyBtn');

const restaurants = [
  {
    id: 1,
    name: 'Metropolia Myllypuro Restaurant',
    city: 'Helsinki',
    company: 'Sodexo',
    address: 'Myllypurontie 1',
    dailyMenu: [
      {
        name: 'Chicken curry with rice',
        price: '2.95 €',
        diets: 'L, G'
      },
      {
        name: 'Vegetable pasta',
        price: '2.95 €',
        diets: 'V'
      }
    ],
    weeklyMenu: [
      { day: 'Monday', meals: ['Chicken curry with rice', 'Vegetable pasta'] },
      { day: 'Tuesday', meals: ['Salmon with potatoes', 'Vegetable soup'] },
      { day: 'Wednesday', meals: ['Beef pasta', 'Vegan curry'] },
      { day: 'Thursday', meals: ['Chicken pasta', 'Vegetable risotto'] },
      { day: 'Friday', meals: ['Fish and potatoes', 'Vegan burger'] }
    ]
  },
  {
    id: 2,
    name: 'Arabia Campus Restaurant',
    city: 'Helsinki',
    company: 'Compass Group',
    address: 'Hämeentie 135',
    dailyMenu: [
      {
        name: 'Beef meatballs and mashed potatoes',
        price: '3.20 €',
        diets: 'L'
      },
      {
        name: 'Vegan lentil soup',
        price: '2.95 €',
        diets: 'V, G'
      }
    ],
    weeklyMenu: [
      { day: 'Monday', meals: ['Beef meatballs', 'Lentil soup'] },
      { day: 'Tuesday', meals: ['Chicken noodles', 'Vegetable wok'] },
      { day: 'Wednesday', meals: ['Fish soup', 'Vegan pasta'] },
      { day: 'Thursday', meals: ['Beef stew', 'Vegetable curry'] },
      { day: 'Friday', meals: ['Chicken burger', 'Vegan burger'] }
    ]
  },
  {
    id: 3,
    name: 'Leppävaara Student Restaurant',
    city: 'Espoo',
    company: 'Sodexo',
    address: 'Vanha maantie 6',
    dailyMenu: [
      {
        name: 'Salmon pasta',
        price: '3.10 €',
        diets: 'L'
      },
      {
        name: 'Vegetable curry',
        price: '2.95 €',
        diets: 'V, G'
      }
    ],
    weeklyMenu: [
      { day: 'Monday', meals: ['Salmon pasta', 'Vegetable curry'] },
      { day: 'Tuesday', meals: ['Chicken rice', 'Vegan soup'] },
      { day: 'Wednesday', meals: ['Meatballs', 'Vegetable pasta'] },
      { day: 'Thursday', meals: ['Fish with rice', 'Vegan wok'] },
      { day: 'Friday', meals: ['Chicken wrap', 'Vegetable burger'] }
    ]
  },
  {
    id: 4,
    name: 'Myyrmäki Campus Restaurant',
    city: 'Vantaa',
    company: 'Compass Group',
    address: 'Leiritie 1',
    dailyMenu: [
      {
        name: 'Chicken pasta',
        price: '2.95 €',
        diets: 'L'
      },
      {
        name: 'Vegetable soup',
        price: '2.70 €',
        diets: 'V, G'
      }
    ],
    weeklyMenu: [
      { day: 'Monday', meals: ['Chicken pasta', 'Vegetable soup'] },
      { day: 'Tuesday', meals: ['Fish curry', 'Vegan pasta'] },
      { day: 'Wednesday', meals: ['Beef rice', 'Vegetable stew'] },
      { day: 'Thursday', meals: ['Chicken soup', 'Vegan curry'] },
      { day: 'Friday', meals: ['Fish burger', 'Vegetable burger'] }
    ]
  }
];

let selectedRestaurant = null;

let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

function isFavorite(id) {
  return favorites.includes(id);
}

function toggleFavorite(id) {
  if (isFavorite(id)) {
    favorites = favorites.filter(favoriteId => favoriteId !== id);
  } else {
    favorites.push(id);
  }

  localStorage.setItem('favorites', JSON.stringify(favorites));

  applyFilters();
}

function displayRestaurants(data) {
  restaurantList.innerHTML = '';

  if (data.length === 0) {
    restaurantList.innerHTML = '<p>No restaurants found.</p>';
    return;
  }

  data.forEach((restaurant) => {
    const card = document.createElement('div');
    card.classList.add('restaurant-card');

    const favoriteSymbol = isFavorite(restaurant.id) ? '❤️' : '🤍';

    card.innerHTML = `
      <h3>${restaurant.name}</h3>
      <p><strong>City:</strong> ${restaurant.city}</p>
      <p><strong>Company:</strong> ${restaurant.company}</p>
      <p>${restaurant.address}</p>

      <button class="favorite-btn">
        ${favoriteSymbol} Favorite
      </button>
    `;

    card.addEventListener('click', (event) => {
      if (event.target.classList.contains('favorite-btn')) {
        return;
      }

      selectedRestaurant = restaurant;
      restaurantName.textContent = restaurant.name;

      displayDailyMenu();
    });

    const favoriteBtn = card.querySelector('.favorite-btn');

    favoriteBtn.addEventListener('click', () => {
      toggleFavorite(restaurant.id);
    });

    restaurantList.appendChild(card);
  });
}

function createCityFilter() {
  const cities = [];

  restaurants.forEach((restaurant) => {
    if (!cities.includes(restaurant.city)) {
      cities.push(restaurant.city);
    }
  });

  cities.sort();

  cities.forEach((city) => {
    const option = document.createElement('option');

    option.value = city;
    option.textContent = city;

    cityFilter.appendChild(option);
  });
}

function applyFilters() {
  const selectedCity = cityFilter.value;

  let filteredRestaurants = restaurants;

  if (selectedCity !== 'all') {
    filteredRestaurants = filteredRestaurants.filter(
      restaurant => restaurant.city === selectedCity
    );
  }

  displayRestaurants(filteredRestaurants);
}

cityFilter.addEventListener('change', applyFilters);

function displayDailyMenu() {
  if (!selectedRestaurant) {
    menuContainer.innerHTML =
      '<p>Please select a restaurant first.</p>';
    return;
  }

  menuContainer.innerHTML = '<h3>Daily Menu</h3>';

  selectedRestaurant.dailyMenu.forEach((meal) => {
    const item = document.createElement('div');

    item.classList.add('menu-item');

    item.innerHTML = `
      <h4>${meal.name}</h4>
      <p><strong>Price:</strong> ${meal.price}</p>
      <p><strong>Diets:</strong> ${meal.diets}</p>
    `;

    menuContainer.appendChild(item);
  });
}

function displayWeeklyMenu() {
  if (!selectedRestaurant) {
    menuContainer.innerHTML =
      '<p>Please select a restaurant first.</p>';
    return;
  }

  menuContainer.innerHTML = '<h3>Weekly Menu</h3>';

  selectedRestaurant.weeklyMenu.forEach((day) => {
    const dayContainer = document.createElement('div');

    dayContainer.classList.add('menu-item');

    let meals = '';

    day.meals.forEach((meal) => {
      meals += `<p>${meal}</p>`;
    });

    dayContainer.innerHTML = `
      <h4>${day.day}</h4>
      ${meals}
    `;

    menuContainer.appendChild(dayContainer);
  });
}

dailyBtn.addEventListener('click', displayDailyMenu);
weeklyBtn.addEventListener('click', displayWeeklyMenu);

createCityFilter();
displayRestaurants(restaurants);