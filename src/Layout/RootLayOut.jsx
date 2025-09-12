import React, { Children } from 'react';

import { Outlet } from 'react-router';

const RootLayOut = () => {
    return (
        <div>

            <div className='min-w-screen'>
                <Outlet></Outlet>
            </div>

        </div>
    );
};

export default RootLayOut;