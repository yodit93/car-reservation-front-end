import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCars } from '../Redux/carsSlice';
import NavigationPanel from '../Components/Navigation/NavigationPanel';

const CarsList = () => {
  const dispatch = useDispatch();
  const cars = useSelector((state) => state.cars.cars);

  useEffect(() => {
    dispatch(getCars());
  }, [dispatch]);

  return (
    <div>
      <h1>Car Details</h1>
      {cars.map((car) => (
        <div key={car.id}>
          <Link to="/cars/${car.id}" key={car.id}>
            <img src={car.photo} alt={car.name} />
          </Link>
          <h2>{car.name}</h2>
          Model:
          {' '}
          {car.model}
        </div>
      ))}
    </div>
  );
};

export default CarsList;
