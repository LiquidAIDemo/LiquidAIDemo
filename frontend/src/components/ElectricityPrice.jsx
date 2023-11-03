import { useEffect, useState } from "react"
import axios from 'axios'
import { Box } from "@mui/material"
import { LineChart } from '@mui/x-charts/LineChart'
import energyComponents from "../../../test_data/energyComponents.json"

const ElectricityPrice = ({ demoTime }) => {
  const [prices, setPrices] = useState([])
  const [currentPrice, setCurrentPrice] = useState(0)
  const [currentConsumption, setCurrentConsumption] = useState(0)
  const componentsData = energyComponents.components
  const [consumptionPerHour, setConsumptioPerHour] = useState({})

  useEffect(() => {   
    try {
      axios("/api")
      .then(res => {
        setPrices(res.data)
        calculateTotalConsumptions()
      })
    } catch (e) {
      console.error("Error fetching prices:", e)
    }
  }, [])

  useEffect(() => {
    findAndSetCurrentPrice(prices, demoTime)
    setCurrentTotalConsumption(demoTime)
  }, [prices, demoTime]);

  const calculateTotalConsumptions = () => {
    const consumption = {}
    componentsData.forEach((component) => {
      //console.log(component.type)
      if (component.consumption_per_hour_kwh) {
        //console.log("juu")
        component.consumption_per_hour_kwh.forEach((consumptionData) => {
          const time = new Date(consumptionData.startDate)
          const hour = time.getUTCHours()
          if (hour === 22) {
            console.log(consumptionData)
          }
          //console.log(hour)
          if (consumption[hour]) {
            consumption[hour] += consumptionData.value
          } else {
            consumption[hour] = consumptionData.value
          }
        })
      }
    })
    setConsumptioPerHour(consumption)
    //console.log(consumption)
  }

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

  const setCurrentTotalConsumption = (demoTime) => {
    const demoTimeCopy = new Date(demoTime)
    const total = consumptionPerHour[demoTimeCopy.getHours()]
    setCurrentConsumption(total)
    console.log(total)
  }

  return (
    <Box>
      Current price is {currentPrice.toFixed(2)} cents / kWh
      <Box
        sx={{
          
            borderRadius: '20px',
            background: 'white',
            width: '400px',
            height: '200px'
          
        }}
      >
        <LineChart
          xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
          series={[
            {
              data: [2, 5.5, 2, 8.5, 1.5, 5],
            },
          ]}        
        />
      </Box>
    </Box>
  )
}

export default ElectricityPrice