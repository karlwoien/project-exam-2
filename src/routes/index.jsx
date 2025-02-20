import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Profile from '../pages/Profile';
import Venues from '../pages/Venues';
import VenueDetails from '../pages/VenueDetails';
import AddVenue from '../pages/AddVenue';
import EditVenue from '../pages/EditVenue';
import Error from '../pages/Error';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
      {
        path: '/venues',
        element: <Venues />,
      },
      {
        path: '/venue/:id',
        element: <VenueDetails />,
      },
      {
        path: '/venues/new',
        element: <AddVenue />,
      },
      {
        path: '/venue/:id/edit',
        element: <EditVenue />,
      },
      {
        path: '*',
        element: <Error />,
      },
    ],
  },
]);

export default router;
