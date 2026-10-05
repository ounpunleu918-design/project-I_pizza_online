import React from 'react'
import Hero from './Hero'
import Footer from './Footer'
import Freepizza from './Freepizza'
import Freedrink from './Freedrink'
import SmartNavbar from './SmartNavbar'

const Homes = () => {

  return (
    <>
      <SmartNavbar/>
      <Hero />
      <Freepizza />
      <Freedrink />
      <div className="mt-20">
        <Footer />
      </div>
    </>
  )
}

export default Homes
