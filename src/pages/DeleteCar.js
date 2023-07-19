import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCars, deleteCar } from '../Redux/carsSlice';

const DeleteCar = () => {
  const { cars } = useSelector((state) => state.cars);
  const dispatch = useDispatch();
 
  useEffect(() => {
    dispatch(getCars());
  }, [dispatch]);

  const handleDelete = (carId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this car?');
    if (confirmDelete) {
      dispatch(deleteCar(carId));
    }
  };
 

  return (
    <div>
    <h2>Delete Car</h2>
    <div>
      {cars.map((car) => (
        <div key={car.id}>
          <div>
            {car.name}
          </div>
          <div>
            <img src={car.image} alt={car.name} />
          </div>
          <button type="button" onClick={() => handleDelete(car.id)}>Delete</button>
        </div>
      ))}
    </div>
  </div>
   
  );
};

export default DeleteCar;
