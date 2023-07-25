import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CiSettings } from 'react-icons/ci';
import multicolor from './images/multicolor.png';

import { fetchCarDetails } from '../Redux/carsSlice';
import NavigationPanel from '../Components/Navigation/NavigationPanel';
import '../Styles/details.css';

const DetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { cardetails } = useSelector((store) => store.cars);
  useEffect(() => {
    dispatch(fetchCarDetails(id));
  }, [dispatch]);
  console.log(cardetails);
  return (
    <div id="detailspage">
      <NavigationPanel />
      <div className="detailspage-cont">
        {cardetails.map((element) => (
          <div className="details-content" key={element.id}>
            <div className="details-img-cont">
              <img src={element.image} alt="stadium" className="stadium" />
            </div>
            <div className="details-info">
              <div className="details">
                <h3>Car Info</h3>
                <ul className="details-body">
                  <li className="details-body-item">
                    <span>Name:</span>
                    <span>{element.name}</span>
                  </li>
                  <li className="details-body-item">
                    <span>Price:</span>
                    <span>
                      $
                      {element.price}
                    </span>
                  </li>
                  <li className="details-body-item">
                    <span>Model:</span>
                    <span>
                      {element.model}
                    </span>
                  </li>
                </ul>
                {' '}

              </div>
              <footer id="details-footer">
                <div className="color-wheel">
                  <img src={multicolor} alt="multicolor" className="multicolor" />
                </div>
                <div>
                  <Link to={`/bookride/${id}`}>
                    <CiSettings />
                    {' '}
                    RESERVE
                  </Link>
                </div>
              </footer>
            </div>
          </div>
        ))}

      </div>
    </div>

  );
};

export default DetailsPage;
