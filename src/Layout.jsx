import React from 'react';
import {Outlet} from 'react-router-dom';
import Function_HeaderPage, {Header} from './Pages/HeaderPage';


const Layout = () => {
    return(
        <div className='p-4 flex flex-col min-h-screen'>
            <Function_HeaderPage />
            <Outlet />
        </div>
    )
};

export default Layout;