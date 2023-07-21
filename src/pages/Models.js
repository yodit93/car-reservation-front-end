import React, { useEffect, useRef, useState } from 'react';
import '../styles/models.css';
import { useDispatch, useSelector } from 'react-redux';
import { BiRightArrow, BiLeftArrow } from 'react-icons/bi';
import { Link } from 'react-router-dom'; // Make sure you import Link from 'react-router-dom'
import NavigationPanel from '../Components/Navigation/NavigationPanel';
import { scrollLeft, scrollRight, handleScroll } from '../Components/Home/scrollUtilis';
import { getCars } from '../Redux/carsSlice';
import CarModel from '../Components/Home/CarModel.js';

const Cars = () => {
  const { cars, error, isLoading } = useSelector((state) => state.cars);
  const dispatch = useDispatch();
  const [isFirstVisible, setIsFirstVisible] = useState(true);
  const [isLastVisible, setIsLastVisible] = useState(false);
  const [isPrevDisabled, setIsPrevDisabled] = useState(true);
  const [isNextDisabled, setIsNextDisabled] = useState(false);
  const containerRef = useRef(null);
  const prevBtnRef = useRef(null);
  const nextBtnRef = useRef(null);
  useEffect(() => {
    dispatch(getCars());
  }, [dispatch]);

  const container = containerRef.current;

  useEffect(() => {
    setIsPrevDisabled(isFirstVisible);
    setIsNextDisabled(isLastVisible);
  }, [isFirstVisible, isLastVisible]);

  return (
    <>
      {isLoading && <div className="loading">Loading...</div>}
      {cars && (
        <div className="home-container">
          <NavigationPanel />
          <div className="contr">
            <div className="header">
              <h1 className="header-title">LATEST MODELS</h1>
              <p className="header-subtitle">The most recent models of our cars</p>
              <div className="dashed-line" />
            </div>
            <div className="wrap">
              <button
                type="button"
                className={`prev btn ${isPrevDisabled ? 'disabled' : ''}`}
                onClick={() => scrollLeft(container)}
                disabled={isPrevDisabled}
                ref={prevBtnRef}
              >
                <BiLeftArrow />
              </button>
              <div
                className="cars"
                ref={containerRef}
                onScroll={() => handleScroll(container, setIsFirstVisible, setIsLastVisible)}
              >
                {cars.map((car) => (
                  <Link to={`/cars/${car.id}}`} key={car.id}>
                    <CarModel car={car} />
                  </Link>
                ))}

              </div>
              <button
                type="button"
                className={`next btn ${isNextDisabled ? 'disabled' : ''}`}
                onClick={() => scrollRight(container)}
                disabled={isNextDisabled}
                ref={nextBtnRef}
              >
                <BiRightArrow />
              </button>
            </div>
          </div>
        </div>
      )}
      {error && <div className="error">{error}</div>}
    </>
  );
};

export default Cars;
