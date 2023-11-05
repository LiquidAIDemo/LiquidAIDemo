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
      return []
    default:
      return state
  }
};

const Chart = ({ consumptionData }) => {
  if (consumptionData.length > 0 && !consumptionData.some(item => isNaN(item.hour) || isNaN(item.total))) {
    return (
      <LineChart
        xAxis={[
          { 
            data: consumptionData.map(entry => entry.hour),
            scaleType: 'time',
            hideTooltip: true,
          }
        ]}
        series={[
          {
            data: consumptionData.map(entry => entry.total),
            area: true,
            curve: 'natural',
            showMark: false,
            label: 'cents'
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
  const [currentPrice, setCurrentPrice] = useState(0)
  const [currentConsumption, setCurrentConsumption] = useState(0)
  const [componentsData] = useState(energyComponents.components)
  const [consumptionPerHour, setConsumptionPerHour] = useState({})
  const [consumptionData, dispatchConsumptionData] = useReducer(consumptionDataReducer, [])
  //const [consumptionDataLoaded, setConsumptionDataLoaded] = useState(false)   
  
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
    if (prices.length > 0 && demoTime && demoPassedHrs >= 0 && consumptionPerHour) {
      resetConsumptionData(demoPassedHrs)
      const demoTimeCopy = new Date(demoTime.setMinutes(0, 0))
      const total = consumptionPerHour[demoTime.getHours()]
      const formattedDemoTime = demoTimeCopy.toLocaleString("fi-FI", { timeZone: "Europe/Helsinki" })
      const priceObj = prices.find(priceObj => priceObj.startDate == formattedDemoTime)
      
      if (priceObj) {
        setCurrentPrice(priceObj.price)
        setCurrentConsumption(total)
        dispatchConsumptionData({ type: 'ADD_CONSUMPTION_DATA', payload: { hour: demoTimeCopy, total: total * priceObj.price } })
        //setConsumptionDataLoaded(true)
      }
    }
  }, [prices, demoTime, demoPassedHrs, consumptionPerHour]);
  
  const resetConsumptionData = (demoPassedHrs) => {
    if (demoPassedHrs === 0) {
      dispatchConsumptionData({ type: 'RESET_CONSUMPTION_DATA' })
    }
  }
  
  return (
    <Box>
      Current price is {currentPrice.toFixed(2)} cents / kWh <br/>
      Current consumption is {currentConsumption.toFixed(2)}
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