import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Spaces from './pages/Spaces';
import NewReservation from './pages/NewReservation';
import MyReservations from './pages/MyReservations';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/spaces"
          element={
            <PrivateRoute>
              <Spaces />
            </PrivateRoute>
          }
        />
        <Route
          path="/reservations/new/:spaceId"
          element={
            <PrivateRoute>
              <NewReservation />
            </PrivateRoute>
          }
        />
        <Route
          path="/reservations"
          element={
            <PrivateRoute>
              <MyReservations />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
