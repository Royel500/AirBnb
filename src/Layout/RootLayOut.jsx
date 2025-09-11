import React, { Children } from 'react';
import Navbar from '../ShearComponents/Navbar';
import Footer from '../ShearComponents/Footer';
import { Outlet } from 'react-router';

const RootLayOut = () => {
    return (
        <div>
        <div>
                <Navbar></Navbar>
        </div>
            <div className='min-w-screen'>
                <Outlet></Outlet>
            </div>
<div>
    <Footer></Footer>
</div>
        </div>
    );
};

export default RootLayOut;