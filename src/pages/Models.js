import React, { useEffect, useState } from 'react';
import CarModel from '../components/CarModel';

const Cars = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const url = 'http://127.0.0.1:3001/api/v1/cars';
    fetch(url)
      .then((response) => response.json())
      .then((data) => setCars(data));
  }, []);

  return (
    <div className='container d-flex flex-row'>
      {cars.map((car) => (
        <CarModel car={car} key={car.id} />
      ))}
    </div>
  );
};

export default Cars;
