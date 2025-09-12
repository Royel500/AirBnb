import React from 'react';
import PackageListings from '../Components/ShowPackge/PackageListings';
import Navbar from '../ShearComponents/Navbar';
import Footer from '../ShearComponents/Footer';

const Home = () => {
    return (
        <div>
        <div>
                <Navbar/>
        </div>
          <PackageListings/>
          <div>
    <Footer></Footer>
</div>
        </div>
    );
};

export default Home;