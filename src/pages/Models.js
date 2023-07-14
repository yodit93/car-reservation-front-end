import React, { useEffect, useState } from 'react';
import '../Styles/models.css';
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
    <div className="contr">
      <div className="header">
        <h1 className="header-title">LATEST MODELS</h1>
        <p className="header-subtitle">The most recent models of our cars</p>
      </div>
      <div className="wrap">
        <button type="button" className="prev btn">&lt;</button>
        <div className="cars">
          {cars.map((car) => (
            <CarModel car={car} key={car.id} />
          ))}
        </div>
        <button type="button" className="next btn">&gt;</button>
      </div>
    </div>
  );
};

export default Cars;
