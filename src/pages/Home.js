import React from 'react'
import Navbar from '../components/Navbar';
import Sliders from '../components/Sliders';
import Products from '../components/Products';
import Banner from '../components/Banner';
import Subscription from '../components/Subscription';
import Footer from '../components/Footer';
function Home() {
    return (
        <div>
            <Navbar />
            <Sliders />
            <Products />
            <Banner />
            <Subscription />
            <Footer />
        </div>
    )
}

export default Home