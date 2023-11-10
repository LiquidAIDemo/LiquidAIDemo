import { useEffect, useState } from "react"
import axios from 'axios'
import { Box, Typography } from "@mui/material"
import { LineChart } from '@mui/x-charts/LineChart'

const Price = ({ price }) => {
  if (price) {
    return (
      <Typography>
        Current price is {price.toFixed(2)} cents / kWh
      </Typography>
    )
  } else {
    return (
      <Typography>
        Loading current price
      </Typography>
    )
  }
}

const Consumption = ({ consumption }) => {
  if (consumption) {
    return (
      <Typography>
        Current consumption is {consumption.toFixed(2)} kWh
      </Typography>
    )
  } else {
    return (
      <Typography>
        Loading current consumption
      </Typography>
    )
  }
}

const Chart = ({ consumptionData }) => {
  console.log(consumptionData)
  if (consumptionData.length > 0 && !consumptionData.every(item => isNaN(item.time) || isNaN(item.total))) {
    return (
      <LineChart
        xAxis={[
          { 
            data: consumptionData.map(entry => entry.time),
            scaleType: 'time',
            min: consumptionData[0].time,
          }
        ]}
        series={[
          {
            data: consumptionData.map(entry => entry.total),
            area: true,
            curve: 'natural',
            showMark: false,
            label: 'cents',
          },
        ]}
        sx={{
          '& .MuiAreaElement-root': {
            fillOpacity: 0.4,
          },
        }}        
      />
    )
  }
  return null
}

function ElectricityPrice({ demoTime, demoPassedHrs, totalConsumption }) {
  const [prices, setPrices] = useState([])
  let currentPrice = setCurrentPrice(prices, demoTime)
  let currentConsumption = setCurrentConsumption(totalConsumption, demoTime)
  const [consumptionData, setConsumptionData] = useState([])
  console.log("demotime", demoTime)
  console.log("demo passed", demoPassedHrs)
  useEffect(() => {
    console.log("use effect")
    try {
      axios("/api")
      .then(res => {
        setPrices(res.data)
      })
    } catch (e) {
      console.error("Error fetching prices:", e)
    }
    const savedConsumptionData = JSON.parse(window.sessionStorage.getItem('consumptionData'))
    console.log("saved", savedConsumptionData)
    if (savedConsumptionData) {
      const formattedData = savedConsumptionData.map(entry => ({
        time: new Date(entry.time),
        total: entry.total
      }))
      console.log(formattedData)
      setConsumptionData(formattedData)
    }
  }, [])
  
  useEffect(() => {
    console.log("passed", demoPassedHrs)
    if (demoPassedHrs === 0) {
      setConsumptionData([{ time: demoTime, total: currentPrice * currentConsumption }])
      window.sessionStorage.setItem('consumptionData', JSON.stringify([{ time: demoTime, total: currentPrice * currentConsumption }]))
    } else {
      setConsumptionData(prev => {
        const newData = [...prev, { time: demoTime, total: currentPrice * currentConsumption }]
        window.sessionStorage.setItem('consumptionData', JSON.stringify(newData))
        return newData
      })
    }
  }, [currentConsumption, currentPrice, demoPassedHrs, demoTime])
  

  function setCurrentConsumption(totalConsumption, demoTime) {
    if (totalConsumption.length === 0) {
      return null
    } else {
      return totalConsumption.find(obj => obj.hour === demoTime.getHours()).value
    }
  }

  function setCurrentPrice(prices, demoTime) {
    if (prices.length === 0) {
      return null
    } else {
      const demoTimeCopy = new Date(demoTime)
      demoTimeCopy.setMinutes(0, 0)
      const formattedDemoTime = demoTimeCopy.toLocaleString("fi-FI", { timeZone: "Europe/Helsinki" })
      const priceObj = prices.find(priceObj => priceObj.startDate == formattedDemoTime)
      if (priceObj) {
        return priceObj.price
      }
    }
  }
  
  return (
    <Box
      sx={{
        height: '34vh'
      }}
    >
      <Price price={currentPrice} />
      <Consumption consumption={currentConsumption} />
      <Box
        sx={{
          
            borderRadius: '20px',
            background: 'white',
            width: '40vh',
            height: '23vh'
          
        }}
      >        
        <Chart consumptionData={consumptionData} />
      </Box>
    </Box>
  )
}

export default ElectricityPrice