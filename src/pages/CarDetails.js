import { useParams } from 'react-router-dom';

const CarDetails = () => {
  const { id } = useParams();
  return (
    <div>{id}</div>
  );
};

export default CarDetails;
