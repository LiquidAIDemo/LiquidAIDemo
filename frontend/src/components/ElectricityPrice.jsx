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
  console.log("chart", consumptionData)
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
  console.log("demotime", demoTime)
  console.log("demo passed", demoPassedHrs)
  const [prices, setPrices] = useState([])
  const [currentPrice, setCurrentPrice] = useState(() => updateCurrentPrice(prices, demoTime))
  const [currentConsumption, setCurrentConsumption] = useState(() => updateCurrentConsumption(totalConsumption, demoTime))
  const [consumptionData, setConsumptionData] = useState([])

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
    //console.log("saved", savedConsumptionData)
    if (savedConsumptionData) {
      const formattedData = savedConsumptionData.map(entry => ({
        time: new Date(entry.time),
        total: entry.total
      }))
      //console.log("formatted", formattedData)
      setConsumptionData(formattedData)
    } else {
      setConsumptionData([])
    }
  }, [])
  
  //useEffect(() => {
    //setCurrentConsumption(updateCurrentConsumption(totalConsumption, demoTime))
    //setCurrentPrice(updateCurrentPrice(prices, demoTime))
  //}, [totalConsumption, demoTime, prices])

  useEffect(() => {
    console.log("passed", demoPassedHrs)
    const newPrice = updateCurrentPrice(prices, demoTime)
    const newCurrentConsumption = updateCurrentConsumption(totalConsumption, demoTime)
    setCurrentPrice(newPrice)
    setCurrentConsumption(newCurrentConsumption)
    if (demoPassedHrs === 0) {
      window.sessionStorage.removeItem('consumptionData')
      setConsumptionData([{ time: new Date(demoTime), total: newPrice * newCurrentConsumption }])
      window.sessionStorage.setItem('consumptionData', JSON.stringify([{ time: new Date(demoTime), total: newPrice * newCurrentConsumption }]))
    } if (demoPassedHrs < 24) {
      setConsumptionData(prev => {
        const newData = [...prev, { time: new Date(demoTime), total: newPrice * newCurrentConsumption }]
        window.sessionStorage.setItem('consumptionData', JSON.stringify(newData))
        return newData
      })
    }
  }, [demoPassedHrs, demoTime, prices, totalConsumption])  

  function updateCurrentConsumption(totalConsumption, demoTime) {
    console.log("set consumption time", demoTime)
    console.log("set consumption time formatted", new Date(demoTime))
    console.log("total consumption", totalConsumption)
    const demoTimeFormatted = new Date(demoTime)
    console.log("set consumption timeformatted", demoTimeFormatted)
    console.log("set consumption hours", demoTimeFormatted.getHours())
    if (totalConsumption.length === 0) {
      return null
    } else {
      return totalConsumption.find(obj => obj.hour === demoTimeFormatted.getHours()).value
    }
  }

  function updateCurrentPrice(prices, demoTime) {
    console.log("update price", demoTime)
    if (prices.length === 0) {
      return null
    } else {
      const demoTimeCopy = new Date(demoTime)
      console.log("update price 2", demoTimeCopy)
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