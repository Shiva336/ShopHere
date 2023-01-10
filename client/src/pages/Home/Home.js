import React from 'react'
import './Home.css'
import TopBar from '../../components/topbar/Topbar';
import { useNavigate } from 'react-router-dom';
function Home() {
  return (
    <div className='HomeContainer'>
      <TopBar/>
    </div>
  )
}

export default Home