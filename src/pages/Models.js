import React, { useEffect, useRef, useState } from 'react';
import '../Styles/models.css';
import CarModel from '../components/CarModel';
import NavigationPanel from '../components/Navigation/NavigationPanel';

const Cars = () => {
  const [cars, setCars] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const url = 'http://127.0.0.1:3001/api/v1/cars';
    fetch(url)
      .then((response) => response.json())
      .then((data) => setCars(data));
  }, []);

  const scrollLeft = () => {
    const container = containerRef.current;
    const scrollAmount = container.offsetWidth;
    container.scrollTo({
      left: container.scrollLeft - scrollAmount,
      behavior: 'smooth',
    });
  };

  const scrollRight = () => {
    const container = containerRef.current;
    const scrollAmount = container.offsetWidth;
    container.scrollTo({
      left: container.scrollLeft + scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <div className="home-container">
      <NavigationPanel />
      <div className="contr">
        <div className="header">
          <h1 className="header-title">LATEST MODELS</h1>
          <p className="header-subtitle">The most recent models of our cars</p>
        </div>
        <div className="wrap">
          <button type="button" className="prev btn" onClick={scrollLeft}>&lt;</button>
          <div className="cars" ref={containerRef}>
            {cars.map((car) => (
              <CarModel car={car} key={car.id} />
            ))}
          </div>
          <button type="button" className="next btn" onClick={scrollRight}>&gt;</button>
        </div>
      </div>
    </div>
  );
};

export default Cars;
