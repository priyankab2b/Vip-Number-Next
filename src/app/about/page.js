import React from 'react'
import Card from './card'
import Header from '../components/Header/Header'
import MobileHeader from '../components/MobileHeader/MobileHeader'
import MobileFooter from '../components/MobileFooter/MobileFooter'
import Footer from '../components/Footer/Footer'

const page = () => {
  return (
    <div>
      <Header />
      <MobileHeader />
      About page
      <Card />
      <MobileFooter />
      <Footer />
    </div>
  )
}

export default page
