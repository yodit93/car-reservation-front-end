import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AddCar from './pages/AddCar';
import DeleteCar from './pages/DeleteCar';
import Models from './pages/Models';
import MyReservations from './pages/MyReservations';
import ReserveCar from './pages/ReserveCar';
import SignUp from './Components/Authentication/SignUp';
import LogIn from './Components/Authentication/LogIn';
import PrivateRoutes from './utils/PrivateRoutes';

function App() {
  const { isAuthenticated } = useSelector((state) => state.users);
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoutes authenticateUser={isAuthenticated} />}>
          <Route path="/" element={<Models />} />
          <Route path="/bookride" element={<ReserveCar />} />
          <Route path="/additem" element={<AddCar />} />
          <Route path="/deleteitem" element={<DeleteCar />} />
          <Route path="/myreservations" element={<MyReservations />} />
        </Route>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
