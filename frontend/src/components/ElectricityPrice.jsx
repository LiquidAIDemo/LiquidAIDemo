import { useEffect, useReducer, useState } from "react"
import axios from 'axios'
import { Box } from "@mui/material"
import { LineChart } from '@mui/x-charts/LineChart'
import energyComponents from "../../../test_data/energyComponents.json"

const consumptionDataReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_CONSUMPTION_DATA':
      return [...state, action.payload]
    case 'RESET_CONSUMPTION_DATA':
      return [action.payload]
    default:
      return state
  }
};

const Price = ({ price }) => {
  if (price) {
    return (
      <div>
        Current price is {price.toFixed(2)} cents / kWh
      </div>
    )
  } else {
    return (
      <div>
        Loading current price
      </div>
    )
  }
}

const Consumption = ({ consumption }) => {
  if (consumption) {
    return (
      <div>
        Current consumption is {consumption.toFixed(2)} kWh
      </div>
    )
  } else {
    return (
      <div>
        Loading current consumption
      </div>
    )
  }
}

const Chart = ({ consumptionData }) => {
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

const ElectricityPrice = ({ demoTime, demoPassedHrs }) => {
  const [prices, setPrices] = useState([])
  const [consumptionPerHour, setConsumptionPerHour] = useState({})
  let currentPrice = setCurrentPrice(prices, demoTime)
  let currentConsumption = setCurrentConsumption(consumptionPerHour, demoTime)
  const [consumptionData, dispatchConsumptionData] = useReducer(consumptionDataReducer, [])
  const [componentsData] = useState(energyComponents.components) 
  
  useEffect(() => {    
    try {
      axios("/api")
      .then(res => {
        setPrices(res.data)
      })
      const consumption = {}
      componentsData.forEach((component) => {
        if (component.consumption_per_hour_kwh) {
          component.consumption_per_hour_kwh.forEach((cData) => {
            const time = new Date(cData.startDate)
            const hour = time.getUTCHours()
            if (consumption[hour]) {
              consumption[hour] += cData.value
            } else {
              consumption[hour] = cData.value
            }
          })
        }
      })
      setConsumptionPerHour(consumption)
    } catch (e) {
      console.error("Error fetching prices:", e)
    }
  }, [componentsData])
  
  useEffect(() => {
    if (demoPassedHrs === 0) {
      dispatchConsumptionData({ type: 'RESET_CONSUMPTION_DATA', payload: { time: demoTime, total: currentPrice * currentConsumption } })
    } else {
      dispatchConsumptionData({ type: 'ADD_CONSUMPTION_DATA', payload: { time: demoTime, total: currentPrice * currentConsumption } })
    }
  }, [currentConsumption, currentPrice, demoPassedHrs, demoTime])
  

  function setCurrentConsumption(consumptionPerHour, demoTime) {
    if (Object.keys(consumptionPerHour).length === 0) {
      return null
    } else {
      return consumptionPerHour[demoTime.getHours()]
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
    <Box>
      <Price price={currentPrice} />
      <Consumption consumption={currentConsumption} />
      <Box
        sx={{
          
            borderRadius: '20px',
            background: 'white',
            width: '400px',
            height: '200px'
          
        }}
      >        
        <Chart consumptionData={consumptionData} />
      </Box>
    </Box>
  )
}

export default ElectricityPrice