import React from 'react'
import Form from './Form'

const index = () => {
  const isSignPage = window.location.pathname.includes('signin')
  return (
    <div>
      <Form isSignPage={isSignPage}/>
    </div>
  )
}

export default index
