import React, { useEffect, useRef, useState } from 'react';
import '../Styles/models.css';
import CarModel from '../Components/CarModel';
import NavigationPanel from '../Components/Navigation/NavigationPanel';
import { scrollLeft, scrollRight, handleScroll } from '../Components/scrollUtilis';

const Cars = () => {
  const [cars, setCars] = useState([]);
  const [isFirstVisible, setIsFirstVisible] = useState(true);
  const [isLastVisible, setIsLastVisible] = useState(false);
  const [isPrevDisabled, setIsPrevDisabled] = useState(true);
  const [isNextDisabled, setIsNextDisabled] = useState(false);
  const containerRef = useRef(null);
  const prevBtnRef = useRef(null);
  const nextBtnRef = useRef(null);
  useEffect(() => {
    const url = 'http://127.0.0.1:3001/api/v1/cars';
    fetch(url)
      .then((response) => response.json())
      .then((data) => setCars(data));
  }, []);

  const container = containerRef.current;

  useEffect(() => {
    setIsPrevDisabled(isFirstVisible);
    setIsNextDisabled(isLastVisible);
  }, [isFirstVisible, isLastVisible]);

  return (
    <div className="home-container">
      <NavigationPanel />
      <div className="contr">
        <div className="header">
          <h1 className="header-title">LATEST MODELS</h1>
          <p className="header-subtitle">The most recent models of our cars</p>
        </div>
        <div className="wrap">
          <button
            type="button"
            className={`prev btn ${isPrevDisabled ? 'disabled' : ''}`}
            onClick={() => scrollLeft(container)}
            disabled={isPrevDisabled}
            ref={prevBtnRef}
          >
            &lt;
          </button>
          <div
            className="cars"
            ref={containerRef}
            onScroll={() => handleScroll(container, setIsFirstVisible, setIsLastVisible)}
          >
            {cars.map((car) => (
              <CarModel car={car} key={car.id} />
            ))}
          </div>
          <button
            type="button"
            className={`next btn ${isNextDisabled ? 'disabled' : ''}`}
            onClick={() => scrollRight(container)}
            disabled={isNextDisabled}
            ref={nextBtnRef}
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cars;
