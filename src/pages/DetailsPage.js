import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCarDetails } from '../Redux/carsSlice';
import NavigationPanel from '../Components/Navigation/NavigationPanel';
import '../Styles/details.css';

const DetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { cardetails, isLoading } = useSelector((store) => store.cars);

  useEffect(() => {
    dispatch(fetchCarDetails(id));
  }, [dispatch]);

  return (
    <div className="details-page">
      <NavigationPanel />
      <div className="details-image-container">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          cardetails.map((element) => (
            <div className="thecar"><img key={element.id} src={element.image} alt={element.model} className="carimage" /></div>
          ))
        )}
      </div>
      <div className="details-content-container">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div className="table-container">
            <table>
              <tbody>
                {cardetails.map((element) => (
                  <div className="table-cont">
                    <tr key={element.id}>
                      <td>
                        <strong>Model:</strong>
                      </td>
                      <td>{element.model}</td>
                    </tr>
                    <tr key={`${element.id}-price`}>
                      <td>
                        <strong>Price:</strong>
                      </td>
                      <td>{element.price}</td>
                    </tr>
                    <tr key={`${element.id}-description`}>
                      <td>
                        <strong>Description:</strong>
                      </td>
                      <td>{element.description}</td>
                    </tr>
                    <tr key={`${element.id}-created_at`}>
                      <td>
                        <strong>Time Made:</strong>
                      </td>
                      <td>{element.created_at}</td>
                    </tr>
                  </div>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailsPage;
