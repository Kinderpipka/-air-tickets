import "./Modal.css";

function Modal({ flight, onClose }) {
  if (!flight) return null; 

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Подробности рейса</h2>
        <p>
          <strong>Номер полета:</strong> {flight.flight.number}
        </p>
        <p>
          <strong>Отправление:</strong> {flight.departure.airport}
        </p>
        <p>
          <strong>Прибытие:</strong> {flight.arrival.airport}
        </p>
        <p>
          <strong>Статус:</strong> {flight.flight_status}
        </p>
        <p>
          <strong>Авиакомпания:</strong> {flight.airline.name}
        </p>
        {/* Здесь можете добавить любую дополнительную информацию */}
      </div>
    </div>
  );
}
export default Modal;
