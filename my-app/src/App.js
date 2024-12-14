import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [originalFlights, setOriginalFlights] = useState([]); // Исходный массив всех рейсов
  const [flights, setFlights] = useState([]);
  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await fetch(
          "https://api.aviationstack.com/v1/flights?access_key=ba0e0d04ce40dfc29de8fc465336839e"
        );
        const data = await response.json();
        setFlights(data.data);
        setOriginalFlights(data.data);
      } catch (error) {
        console.error("Error fetching flight data:", error);
      }
    };

    fetchFlights();
  }, []);
  const handleSort = () => {
    const sorted = [...flights].sort((a, b) => {
      return parseInt(a.flight.number) - parseInt(b.flight.number);
    });
    setFlights(sorted);
  };

  const handleSortByAirline = () => {
    const sorted = [...flights].sort((a, b) => {
      const airlineA = a.airline?.name || "";
      const airlineB = b.airline?.name || "";
      return airlineA.localeCompare(airlineB);
    });
    setFlights(sorted);
  };
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
          <label for="no-transfers">Статус scheduled</label>
        </div>
        <div class="filter-option">
          <input type="checkbox" id="one-transfer" />
          <label for="one-transfer">Статус active</label>
        </div>
      </aside>

      <main class="ticket-list">
        <div class="sorting">
          <button class="sort-btn" id="sort-cheapest" onClick={handleSort}>
            Номер
          </button>
          <button
            class="sort-btn"
            id="sort-fastest"
            onClick={handleSortByAirline}
          >
            Авиакомпания
          </button>
        </div>
        <div class="tickets">
          <div class="ticket">
            <div class="ticket-info">
              <ol>
                {flights.map((fli, index) => (
                  <li class="ticket" key={`${fli.flight.number}-${index}`}>
                    <h2>Номер полета: {fli.flight.number}</h2>
                    <p>
                      <strong>Отправление:</strong> {fli.departure.airport}
                    </p>
                    <p>
                      <strong>Прибытие:</strong> {fli.arrival.airport}
                    </p>
                    <p>
                      <strong>Статус:</strong> {fli.flight_status}
                    </p>
                    <p>
                      <strong>Авиакомпания:</strong> {fli.airline.name}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
