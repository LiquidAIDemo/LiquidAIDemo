import { useEffect, useState } from "react"
import axios from 'axios'

const ElectricityPrice = ({ demoTime }) => {
  const [prices, setPrices] = useState([])

  useEffect(() => {
    console.log('DemoTime updated:', demoTime);
  }, [demoTime]);  
  
  useEffect(() => {
    
    axios("/api")
      .then(res => {
        setPrices(res.data)
        console.log(res.data)
      })
    console.log("juu")
  }, [])

  return (
    console.log(demoTime)
  )
}

export default ElectricityPrice