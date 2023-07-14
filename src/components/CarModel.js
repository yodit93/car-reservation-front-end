import PropTypes from 'prop-types';

const CarModel = ({ car }) => (
  <div className="card" key={car.id}>
    <div className="card-body">
      <img src={car.image} alt={car.name} />
      <h5 className="card-title">{car.name}</h5>
      <p className="card-text">{car.description}</p>
    </div>
  </div>
);

CarModel.propTypes = {
  car: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};

export default CarModel;
