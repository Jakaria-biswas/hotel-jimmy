import React, { useContext } from 'react';
import { AuthContext } from '../../Context/UserContext';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({children}) => {

    const {user, loading} = useContext(AuthContext);

    let location = useLocation()

        if(loading){
               return <h3>Loading...</h3>
        }

        if(user && user.email){
             return children
        }
    return <Navigate to="/login" state={{from:location}} replace></Navigate>
};

export default PrivateRoute;