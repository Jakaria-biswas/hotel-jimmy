import { createBrowserRouter } from 'react-router-dom';
import Main from '../../Layout/Main';
import Home from '../../Pages/Home/Home';
import Room from '../../Pages/Room/Room';
import Register from '../../Pages/Register/Register';
import Login from '../../Pages/Login/Login';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path:"/",
                element: <Home></Home>
            },
            {
                 path:'/viewRoom/:id',
                 element:  <PrivateRoute><Room></Room></PrivateRoute>
            },
            {
                 path:"/register",
                 element:<Register></Register>
            },
            {
                 path:"/login",
                 element:<Login></Login>
            }
        ]
    }
]);

export default router;