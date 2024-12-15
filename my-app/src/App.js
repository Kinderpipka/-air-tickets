import "./App.css";
import { useState, useEffect } from "react";
import Modal from "./Modal";
function App() {
  const [originalFlights, setOriginalFlights] = useState([]);
  const [flights, setFlights] = useState([]);
  const [filters, setFilters] = useState({
    all: true,
    scheduled: false,
    active: false,
  });
  const [selectedFlight, setSelectedFlight] = useState(null);
  const handleFlightClick = (flight) => {
    setSelectedFlight(flight);
  };
  const handleCloseModal = () => {
    setSelectedFlight(null);
  };

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
  useEffect(() => {
    let filteredFlights = originalFlights;

    if (!filters.all) {
      if (filters.scheduled) {
        filteredFlights = filteredFlights.filter(
          (flight) => flight.flight_status === "scheduled"
        );
      }
      if (filters.active) {
        filteredFlights = filteredFlights.filter(
          (flight) => flight.flight_status === "active"
        );
      }
    }

    setFlights(filteredFlights);
  }, [filters, originalFlights]);

  const handleFilterChange = (filter) => {
    setFilters((prev) => ({
      ...prev,
      [filter]: !prev[filter],
      all: false,
    }));
  };
  return (
    <div class="container">
      <aside class="filter">
        <h2>Количеставо пересадок</h2>
        <div class="filter-option">
          <input
            type="checkbox"
            id="no-transfers"
            checked={filters.all}
            onChange={() =>
              setFilters({ all: true, scheduled: false, active: false })
            }
          />
          <label for="no-transfers">Все</label>
        </div>
        <div class="filter-option">
          <input
            type="checkbox"
            id="no-transfers"
            checked={filters.scheduled}
            onChange={() => handleFilterChange("scheduled")}
          />
          <label for="no-transfers">Статус scheduled</label>
        </div>
        <div class="filter-option">
          <input
            type="checkbox"
            id="one-transfer"
            checked={filters.active}
            onChange={() => handleFilterChange("active")}
          />
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
                  <li
                    class="ticket"
                    key={`${fli.flight.number}-${index}`}
                    onClick={() => handleFlightClick(fli)}
                  >
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
      <Modal flight={selectedFlight} onClose={handleCloseModal} />
    </div>
  );
}

export default App;
