import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Spaces from './pages/Spaces';
import NewReservation from './pages/NewReservation';
import MyReservations from './pages/MyReservations';
import CreateSpace from './pages/admin/CreateSpace';
import SpaceList from './pages/admin/SpaceList';
import EditSpace from './pages/admin/EditSpace';
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
        <Route
          path="/admin/spaces/new"
          element={
            <PrivateRoute adminOnly={true}>
              <CreateSpace />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/spaces"
          element={
            <PrivateRoute adminOnly={true}>
              <SpaceList />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/spaces/edit/:id"
          element={
            <PrivateRoute adminOnly={true}>
              <EditSpace />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
