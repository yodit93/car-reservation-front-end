import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getReservations, deleteReservation } from '../Redux/reservationsSlice';
import NavigationPanel from '../Components/Navigation/NavigationPanel';
import '../Styles/myreservations.css';

const MyReservations = () => {
  const dispatch = useDispatch();
  const reservations = useSelector((state) => state.reservations.reservations);

  useEffect(() => {
    dispatch(getReservations());
  }, [dispatch]);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this Reservation?');
    if (confirmDelete) {
      dispatch(deleteReservation(id));
      dispatch(deleteReservation(id));
    }
  };

  return (
    <div className="reservation_main_container">
      <NavigationPanel />
      <div className="reservation_container">
        <h2 className="reservations_header">
          My Reservations
        </h2>
        <div className="card_main_container">
          {reservations.map((reservation) => (
            <div key={reservation.id}>
              <div className="card_container">
                <div className="card_wrapper">
                  <h2>{reservation.car}</h2>
                  <p className="card_detail">
                    city:
                    {reservation.city}
                  </p>
                  <p className="card_detail">
                    start Date:
                    {' '}
                    {reservation.start_date}
                  </p>
                  <p className="card_detail">
                    End Date:
                    {' '}
                    {reservation.end_date}
                  </p>
                  <button type="button" className="delete_reservation" onClick={() => handleDelete(reservation.id)}>delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyReservations;
