import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddCar from './pages/AddCar';
import DeleteCar from './pages/DeleteCar';
import Models from './pages/Models';
import MyReservations from './pages/MyReservations';
import ReserveCar from './pages/ReserveCar';
import DetailsPage from './pages/DetailsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Models />} />
        <Route path="/bookride" element={<ReserveCar />} />
        <Route path="/additem" element={<AddCar />} />
        <Route path="/deleteitem" element={<DeleteCar />} />
        <Route path="/myreservations" element={<MyReservations />} />
        <Route path="/cars/:id" element={<DetailsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
