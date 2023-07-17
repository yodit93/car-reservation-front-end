import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getReservations } from '../Redux/reservationsSlice';
import NavigationPanel from '../Components/Navigation/NavigationPanel';
import '../Styles/myreservations.css';

const MyReservations = () => {
  const dispatch = useDispatch();
  const reservations = useSelector((state) => state.reservations.reservations);

  useEffect(() => {
    dispatch(getReservations());
  }, [dispatch]);

  return (
    <div className="reservation_main_container">
      <NavigationPanel />
      <div className="reservation_container">
        <h2 className="reservations_header">
          My Reservations
        </h2>
        <div>
          {reservations.map((reservation) => (
            <div key={reservation.id}>
              <div className="card_container">
                <div className="card_wrapper">
                  <h2>{reservation.car}</h2>
                  <p>
                    city:
                    {reservation.city}
                  </p>
                  <p>
                    start Date:
                    {' '}
                    {reservation.start_date}
                  </p>
                  <p>
                    End Date:
                    {' '}
                    {reservation.end_date}
                  </p>
                  <button type='button'>delete</button>
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
