import React from 'react'
import './Home.css'
import TopBar from '../../components/topbar/Topbar';
import Carousel from '../../components/Carousel/Carousel';
import FeaturedProduct from '../../components/featured-products/Product';
function Home() {
  return (
    <div className='HomeContainer'id="home-container">
      <TopBar/>
      <Carousel/>
      <FeaturedProduct/>
    </div>
  )
}

export default Home