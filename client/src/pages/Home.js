import React from 'react'
import '../styles/Home.css'
import TopBar from '../components/Topbar';
import Carousel from '../components/Carousel';
import FeaturedProduct from '../components/FeaturedProduct';
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