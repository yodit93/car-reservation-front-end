import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getCars } from '../../Redux/carsSlice';
import { createReservation } from '../../Redux/reservationsSlice';

const ReserveForm = () => {
  const { cars } = useSelector((state) => state.cars);
  const { currentUser } = useSelector((state) => state.users);
  const { id } = useParams();
  const selectedCar = id ? cars.find((car) => car.id === parseInt(id, 10)) : null;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const today = new Date().toISOString().split('T')[0];
  const [formData, setFormData] = useState({
    start_date: today,
    end_date: today,
    city: '',
    user_id: currentUser.id,
    car_id: selectedCar?.id || '',
  });
  useEffect(() => {
    dispatch(getCars());
  }, [dispatch]);
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createReservation({ reservation: formData }));
    navigate('/myreservations');
  };
  return (
    <form className="reserve-form" onSubmit={handleSubmit}>
      <div className="reserve-date">
        <label htmlFor="startDate">
          <span>Start Date:</span>
          <input id="start_date" type="date" value={formData.start_date} onChange={handleChange} required />
        </label>
        <label htmlFor="end_date">
          <span>End Date:</span>
          <input id="end_date" type="date" value={formData.end_date} onChange={handleChange} required />
        </label>
      </div>
      <div className="reserve-select">
        <label htmlFor="car_id">
          <span>Select Car:</span>
          <select id="car_id" name="options" value={formData.car_id} onChange={handleChange} required>
            {!id && <option value="">Select car</option>}
            {selectedCar && (
              <option value={selectedCar?.id}>{selectedCar.name}</option>
            )}
            {!selectedCar
              && cars.map((car) => (
                <option value={car.id} key={car.id}>
                  {car.name}
                </option>
              ))}
          </select>
        </label>
        <label id="city-label" htmlFor="city">
          <span>Select City:</span>
          <input
            type="text"
            list="cities"
            id="city"
            name="city"
            placeholder="Select city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </label>
        <datalist id="cities">
          <option value="New York City" id="newyork">New York City</option>
          <option value="Tokyo">Tokyo</option>
          <option value="Barcelona">Barcelona</option>
          <option value="Mexico City">Mexico City</option>
          <option value="Melbourne">Melbourne</option>
        </datalist>
      </div>
      <div className="submit-btn">
        <button type="submit">RESERVE</button>
      </div>
    </form>
  );
};
export default ReserveForm;
