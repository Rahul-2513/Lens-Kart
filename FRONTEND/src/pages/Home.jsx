import React from 'react'
import Slider from '../components/Slider'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPoilcy'
import LatestCollection from '../components/LatestCollection'


const Home = () => {
  return (
    <div>
      <Slider/>
      
      <BestSeller/>
      <LatestCollection/>
       <OurPolicy/>
      
    </div>
  )
}

export default Home