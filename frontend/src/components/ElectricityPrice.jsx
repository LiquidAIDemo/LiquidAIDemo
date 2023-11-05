import { useEffect, useState } from "react"
import axios from 'axios'
import { Box } from "@mui/material"
import { LineChart } from '@mui/x-charts/LineChart'
import energyComponents from "../../../test_data/energyComponents.json"

const Chart = ({ consumptionData }) => {
  //console.log(consumptionData)
  if (consumptionData.length > 0 && !consumptionData.some(item => isNaN(item.hour) || isNaN(item.total))) {
    return (
      <LineChart
        xAxis={[
          { 
            data: consumptionData.map(entry => entry.hour),
            scaleType: 'time'
            //valueFormatter: (date) => date.getFullYear().toString() 
          }
        ]}
        series={[
          {
            data: consumptionData.map(entry => entry.total), label: '',
          },
        ]}        
      />
    )
  }
  return null
}

const ElectricityPrice = ({ demoTime, demoPassedHrs }) => {
  const [prices, setPrices] = useState([])
  const [currentPrice, setCurrentPrice] = useState(0)
  const [currentConsumption, setCurrentConsumption] = useState(0)
  const componentsData = energyComponents.components
  const [consumptionPerHour, setConsumptionPerHour] = useState({})
  const [consumptionData, setConsumptionData] = useState([])

  const consumption = {}
  componentsData.forEach((component) => {
    //console.log(component.type)
    if (component.consumption_per_hour_kwh) {
      //console.log("juu")
      component.consumption_per_hour_kwh.forEach((cData) => {
        const time = new Date(cData.startDate)
        const hour = time.getUTCHours()
        //console.log(hour)
        if (consumption[hour]) {
          consumption[hour] += cData.value
        } else {
          consumption[hour] = cData.value
        }
      })
    }
  })
  //setConsumptionPerHour(consumption)
    
  
  useEffect(() => {    
    try {
      axios("/api")
      .then(res => {
        setPrices(res.data)
      })
      console.log("call")
    } catch (e) {
      console.error("Error fetching prices:", e)
    }
  }, [])

  useEffect(() => {
    console.log("call")
    findAndSetCurrentPrice(prices, demoTime)
    if (demoPassedHrs === 0 && consumptionData) {
      setConsumptionData([])
    }
    const demoTimeCopy = new Date(demoTime.setSeconds(0))
    const total = consumption[demoTime.getHours()]
    console.log(total*currentPrice)
    setCurrentConsumption(total)
    setConsumptionData(curr => [...curr, { hour: demoTimeCopy, total: total*currentPrice}])
    //console.log(total, demoPassedHrs, consumptionData)
  }, [prices, demoTime]);

  const calculateTotalConsumptions = () => {
    const consumption = {}
    componentsData.forEach((component) => {
      //console.log(component.type)
      if (component.consumption_per_hour_kwh) {
        //console.log("juu")
        component.consumption_per_hour_kwh.forEach((cData) => {
          const time = new Date(cData.startDate)
          const hour = time.getUTCHours()
          //console.log(hour)
          if (consumption[hour]) {
            consumption[hour] += cData.value
          } else {
            consumption[hour] = cData.value
          }
        })
      }
    })
    setConsumptionPerHour(consumption)
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

  const setCurrentTotalConsumption = () => {
    if (demoPassedHrs === 0 && consumptionData) {
      setConsumptionData([])
    }
    const demoTimeCopy = new Date(demoTime)
    const demoHrs = demoTimeCopy.getHours()
    const total = consumption[demoHrs]
    //console.log(consumptionData)
    setCurrentConsumption(total)
    setConsumptionData(curr => [...curr, { hour: demoHrs, total: (total*currentPrice)/100}])
    //console.log(total, demoPassedHrs, consumptionData)
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