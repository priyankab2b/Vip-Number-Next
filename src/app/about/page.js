import React from 'react'
import Card from './card'
import Header from '../Shared/Header/Header'
import MobileHeader from '../Shared/MobileHeader/MobileHeader'
import MobileFooter from '../Shared/MobileFooter/MobileFooter'
import Footer from '../Shared/Footer/Footer'

const page = () => {
  return (
    <div>
      <Header />
      <MobileHeader />
      <Card />
      <MobileFooter />
      <Footer />
    </div>
  )
}

export default page
