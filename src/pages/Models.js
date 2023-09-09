import { useEffect, useState } from 'react';
import '../Styles/models.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { useMediaQuery } from 'react-responsive';
import NavigationPanel from '../Components/Navigation/NavigationPanel';
import { getCars } from '../Redux/carsSlice';
import CarModel from '../Components/Home/CarModel.js';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { CustomPrevArrow, CustomNextArrow } from '../Components/Home/scrollUtilis.js';

const Cars = () => {
  const { cars, error, isLoading } = useSelector((state) => state.cars);
  const dispatch = useDispatch();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [totalSlides, setTotalSlides] = useState(0);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  useEffect(() => {
    dispatch(getCars());
  }, [dispatch]);

  useEffect(() => {
    setTotalSlides(cars.length);
  }, [cars]);

  const mobileSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow currentSlide={currentSlide} />,
    nextArrow: <CustomNextArrow totalSlides={totalSlides} currentSlide={currentSlide} />,
  };
  const desktopSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow currentSlide={currentSlide} />,
    nextArrow: <CustomNextArrow totalSlides={totalSlides} currentSlide={currentSlide} />,
  };
  const settings = isMobile ? mobileSettings : desktopSettings;
  return (
    <>
      <div className="home-container">
        <NavigationPanel />
        <div className="home">
          {isLoading && <div className="custom-loader" />}
          {cars && cars.length === 0 && !isLoading && (
            <div className="no-cars">
              No cars available. Please add a car by clicking the &quot;Add Car&quot; button.
            </div>
          )}
          {cars && cars.length > 0 && (
          <div className="contr">
            <div className="header">
              <h1 className="header-title">LATEST MODELS</h1>
              <p className="header-subtitle">The most recent models of our cars</p>
              <div className="dashed-line" />
            </div>

            <div className="cars">
              <Slider
                dots={settings.dots}
                infinite={settings.infinite}
                speed={settings.speed}
                slidesToShow={settings.slidesToShow}
                slidesToScroll={settings.slidesToScroll}
                beforeChange={(oldIndex, newIndex) => setCurrentSlide(newIndex)}
                prevArrow={settings.prevArrow}
                nextArrow={settings.nextArrow}
              >
                {cars.map((car) => (
                  <Link to={`cars/${car.id}`} key={car.id} className="card">
                    <CarModel car={car} />
                  </Link>
                ))}
              </Slider>
            </div>
          </div>
          )}
        </div>

      </div>
      {error && <div className="error">{error}</div>}
    </>
  );
};

export default Cars;
