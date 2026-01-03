import React from 'react';
import { Navigate } from 'react-router-dom';

const protectedroute = ({ children }) => {
    const token = localStorage.getItem('token');
    const isAuthenticated = token !== null;

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default protectedroute;