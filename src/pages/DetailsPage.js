import React, { useEffect } from 'react';
import { useParams, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { BiChevronRight } from 'react-icons/bi';
import { CiSettings } from 'react-icons/ci';
import multicolor from './images/multicolor.png';

import { fetchCarDetails } from '../Redux/carsSlice';
import NavigationPanel from '../Components/Navigation/NavigationPanel';
import '../Styles/details.css';

const DetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { cardetails } = useSelector((store) => store.cars);
  const handleClick = () => {
    navigate('/');
  };
  useEffect(() => {
    dispatch(fetchCarDetails(id));
  }, [dispatch]);
  console.log(cardetails);
  return (
    <div className="cunt">
      <NavigationPanel />
      <div id={id}>
        {cardetails.map((element) => (
          <div className="details-div" key={element.id}>

            <img src={element.image} alt="stadium" className="stadium" />
            <div className="wrapper">
              <div className="details">
                <ul className="details-body">
                  <div className="details-header">More details</div>
                  <li className="details-body-item">
                    Name:
                    <span>{element.name}</span>
                  </li>
                  <li className="details-body-item">
                    Price:
                    <span>
                      $
                      {element.price}
                    </span>
                  </li>
                  <li className="details-body-item">
                    Model:
                    <span>
                      {element.model}
                    </span>
                  </li>
                </ul>
                {' '}

              </div>
              <div
                className="discover"
                onClick={handleClick}
                onKeyDown={handleClick}
                role="presentation"
              >
                discover more cars
                <span
                  onClick={handleClick}
                  onKeyDown={handleClick}
                  role="presentation"
                >
                  <BiChevronRight />
                </span>
              </div>
              <img src={multicolor} alt="multicolor" className="multicolor" />
              <NavLink
                to="reserve"
                className="buy"
                id={id}
              >
                <span><CiSettings className="sett" /></span>
                Reserve
              </NavLink>
            </div>
          </div>
        ))}

      </div>
    </div>

  );
};

export default DetailsPage;
