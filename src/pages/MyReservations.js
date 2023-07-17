import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateReservation,createReservation, deleteReservation  } from '../Redux/reservationsSlice';


const MyReservations = () => (
  const dispatch = useDispatch();
  const reservations = useSelector((state) => reservations.reservations)
  useEffect(()=> {
    dispatch(updateReservation())
  }, [dispatch]);


  <div className='reservation_main_container'>
    <NavigationPanel/>
    <div className='reservation_container'>
      <h2>My Reservations</h2>
    </div>

  </div>
);

export default MyReservations;
