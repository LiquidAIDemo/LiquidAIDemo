import { useEffect, useState } from "react"
import axios from 'axios'
import { Box } from "@mui/material"

const ElectricityPrice = ({ demoTime }) => {
  const [prices, setPrices] = useState([])
  const [currentPrice, setCurrentPrice] = useState(0)  
  
  useEffect(() => {   
    try {
      axios("/api")
      .then(res => {
        setPrices(res.data)
      })
    } catch (e) {
      console.error("Error fetching prices:", e)
    }
  }, [])

  useEffect(() => {
    findAndSetCurrentPrice(prices, demoTime)
  }, [demoTime]);

  const findAndSetCurrentPrice = (prices, demoTime) => {
    const demoTimeCopy = new Date(demoTime)
    demoTimeCopy.setSeconds(0)
    demoTimeCopy.setMinutes(0)
    const formattedDemoTime = demoTimeCopy.toLocaleString("fi-FI", { timeZone: "Europe/Helsinki" })
    const priceObj = prices.find(priceObj => priceObj.startDate == formattedDemoTime)
    if (priceObj) {
      setCurrentPrice(priceObj.price)
    }
  }

  return (
    <Box>Current price is {currentPrice.toFixed(2)} cents / kWh</Box>
  )
}

export default ElectricityPrice