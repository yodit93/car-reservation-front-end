import PropTypes from 'prop-types';
import SocialIcons from '../Navigation/SocialIcons.js';

const CarModel = ({ car }) => (
  <div className="card" key={car.id}>
    <div className="img-cont">
      <img className="img" src={car.image} alt={car.name} />
    </div>
    <h5 className="card-title">
      {car.name}
    </h5>
    <div className="line" />
    <p className="card-text">{car.description}</p>
    <SocialIcons className="home-social-links" />
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
