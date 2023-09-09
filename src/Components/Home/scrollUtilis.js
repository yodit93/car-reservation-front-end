import { BiRightArrow, BiLeftArrow } from 'react-icons/bi';
import PropTypes from 'prop-types';
import { useMediaQuery } from 'react-responsive';

export const CustomPrevArrow = ({ onClick, currentSlide }) => (
  <div
    className="custom-arrow custom-prev"
    onClick={onClick}
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        onClick();
      }
    }}
    role="button"
    tabIndex={0}
    aria-label="Previous"
  >
    <button type="button" className={`prev btn ${currentSlide === 0 ? 'disabled' : ''}`}>
      <BiLeftArrow />
    </button>
  </div>
);
export const CustomNextArrow = ({ onClick, totalSlides, currentSlide }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return (
    <div
      className="custom-arrow custom-next"
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick();
        }
      }}
      role="button"
      tabIndex={0}
      aria-label="Next"
    >
      <button type="button" className={`next btn ${currentSlide === (isMobile ? totalSlides - 1 : totalSlides - 3) ? 'disabled' : ''}`}>
        <BiRightArrow />
      </button>
    </div>
  );
};

CustomPrevArrow.propTypes = {
  onClick: PropTypes.func.isRequired, // Adjust the type as needed
  currentSlide: PropTypes.number.isRequired,
};

CustomNextArrow.propTypes = {
  onClick: PropTypes.func.isRequired, // Adjust the type as needed
  currentSlide: PropTypes.number.isRequired,
  totalSlides: PropTypes.number.isRequired,
};
