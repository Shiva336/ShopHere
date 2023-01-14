import React from 'react'
import './Home.css'
import TopBar from '../../components/topbar/Topbar';
import Carousel from '../../components/Carousel/Carousel';
import Product from "../../components/Product/Product";

function Home() {
  return (
    <div className='HomeContainer'>
      <TopBar/>
      <Carousel/>
      <Product/>
    </div>
  )
}

export default Home