import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AddCar from './pages/AddCar';
import DeleteCar from './pages/DeleteCar';
import Models from './pages/Models';
import MyReservations from './pages/MyReservations';
import ReserveCar from './pages/ReserveCar';
import SignUp from './Components/SignUp';
import LogIn from './Components/LogIn';
import PrivateRoutes from './utils/PrivateRoutes';

function App() {
  const [isAuth, setIsAuth] = useState(JSON.parse(localStorage.getItem('authenticated')) ?? false);
  useEffect(() => {
    localStorage.setItem('authenticated', JSON.stringify(isAuth));
  }, [isAuth]);
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoutes authenticateUser={isAuth} />}>
          <Route path="/" element={<Models />} />
          <Route path="/bookride" element={<ReserveCar />} />
          <Route path="/additem" element={<AddCar />} />
          <Route path="/deleteitem" element={<DeleteCar />} />
          <Route path="/myreservations" element={<MyReservations />} />
        </Route>
        <Route path="/signup" element={<SignUp authenticateUser={setIsAuth} />} />
        <Route path="/login" element={<LogIn authenticateUser={setIsAuth} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
