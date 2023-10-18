import React from 'react'

const WaterWaveMock = ({ children }) => {
  return (
    <div>
      {typeof children === 'function' ? children({}) : children}
    </div>
  )
}

export default WaterWaveMock