import '../Styles/reserve.css';
import NavigationPanel from '../Components/Navigation/NavigationPanel';
import ReserveForm from '../Components/ReserveCar/ReserveForm';

const ReserveCar = () => (
  <div className="reserve-car-page">
    <NavigationPanel />
    <div className="reserve-holder">
      <div className="reserve-cont">
        <h1>RESERVE CAR</h1>
        <div className="reserve-car-overlay" />
        <ReserveForm />
      </div>
    </div>
  </div>
);
export default ReserveCar;
