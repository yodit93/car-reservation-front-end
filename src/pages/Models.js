import React, { useEffect, useState } from 'react';
import '../styles/models.css';
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
    <div className="container">
      <div className="header">
        <h1 className="header-title">LATEST MODELS</h1>
        <p className="header-subtitle">The most recent models of our cars</p>
      </div>
      <div className="cars">
        {cars.map((car) => (
          <CarModel car={car} key={car.id} />
        ))}
      </div>
    </div>
  );
};

export default Cars;
