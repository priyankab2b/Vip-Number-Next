'use client'
import React from 'react'

const page = ({params}) => {
  console.log(params)
  return (
    <div>
      <h1>User name : {params.name}</h1>
    </div>
  )
}

export default page
