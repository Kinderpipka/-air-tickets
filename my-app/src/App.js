import "./App.css";
import {useState, useEffect} from 'react';
import axios from 'axios';
function App() {
  return (
    <div class="container">
      <aside class="filter">
        <h2>Количеставо пересадок</h2>
        <div class="filter-option">
          <input type="checkbox" id="no-transfers" />
          <label for="no-transfers">Все</label>
        </div>
        <div class="filter-option">
          <input type="checkbox" id="no-transfers" />
          <label for="no-transfers">Без пересадок</label>
        </div>
        <div class="filter-option">
          <input type="checkbox" id="one-transfer" />
          <label for="one-transfer">1 пересадка</label>
        </div>
        <div class="filter-option">
          <input type="checkbox" id="two-transfers" />
          <label for="two-transfers">2 пересадки</label>
        </div>
        <div class="filter-option">
          <input type="checkbox" id="three-transfers" />
          <label for="three-transfers">3 пересадки</label>
        </div>
      </aside>

      <main class="ticket-list">
        <div class="sorting">
          <button class="sort-btn" id="sort-cheapest">
            Самый дешевый
          </button>
          <button class="sort-btn" id="sort-fastest">
            Самый быстрый
          </button>
        </div>
        <div class="tickets">
          <div class="ticket">
            <div class="ticket-info">
              <span class="price">10000 ₽</span>
              <span class="flight-details">Авиакомпания: Аэрофлот</span>
              <span class="flight-details">Пересадок: 1</span>
              <span class="flight-details">Время в пути: 3ч 30мин</span>
              <span class="flight-details">Дата вылета: 10.10.2023</span>
              <span class="flight-details">Дата посадки: 10.10.2023</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
