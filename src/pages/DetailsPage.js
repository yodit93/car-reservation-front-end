import { useParams } from 'react-router-dom';

const DetailsPage = () => {
  const { id } = useParams();
  console.log(id);
  return (
    <>
      <div>Details of car</div>
      <div>{id}</div>
    </>
  );
};

export default DetailsPage;
