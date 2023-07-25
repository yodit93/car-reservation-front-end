import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCars, deleteCar } from '../Redux/carsSlice';
import '../Styles/deleteCar.css';
import NavigationPanel from '../Components/Navigation/NavigationPanel';

const DeleteCar = () => {
  const { cars } = useSelector((state) => state.cars);
  const { currentUser } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const userId = currentUser.id;
  const userCars = cars.filter((car) => car.user_id === userId);

  useEffect(() => {
    dispatch(getCars());
  }, []);

  const handleDeleteCar = (carId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this car?');
    if (confirmDelete) {
      dispatch(deleteCar(carId));
    }
  };

  return (
    <div className="main_container">
      <NavigationPanel />
      <div id="delete_car_container">
        <div className="card_container">
          {userCars
            && userCars.map((car) => (
              <div key={car.id} className="card">
                <div className="card_img">
                  <img src={car.image} alt={car.name} />
                </div>
                <h3 className="card_title">
                  {car.name}
                </h3>
                <div className="card_description">
                  {car.description}
                </div>
                <button className="delete_button" type="button" onClick={() => handleDeleteCar(car.id)}>Delete</button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default DeleteCar;
