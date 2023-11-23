import { Card, CardContent, Typography } from '@mui/material';
import energyComponents from "../../../test_data/energyComponents.json";
import { useState, useEffect } from 'react';

const EnergyComponent = (props) => {
  const { id, name, type, description, demoTime, netConsumption, visibleComponents, demoStartTime } = props;
  const component = {
    id: id,
    name: name,
    type: type,
    description: description,
    demoTime: new Date(demoTime),
    netConsumption: netConsumption,
    visibleComponents: visibleComponents,
    demoStartTime: demoStartTime
  }
  const componentData = energyComponents.components.filter(c => c.id === component.id)[0];
  let productionData = []
  let consumptionData = [];
  let totalProduction = 0;
  let totalConsumption = 0;
  let ownProduction = 0;
  const demoHour = new Date(demoTime).getHours();
  const [download, setDownload] = useState(localStorage.getItem('download') || false);
  const [upload, setUpload] = useState(localStorage.getItem('upload') || false);
  let demoPassedHours = 0;
  const startHour = new Date(demoStartTime).getHours();
  const speed = useState(localStorage.getItem('selectedSpeed'))[0];
  const isPaused = useState(localStorage.getItem('isDemoPaused'))[0] === 'true';
  const [passedTime, setPassedTime] = useState(localStorage.getItem('passedTime') || 0);

  if (demoHour === startHour) {
    demoPassedHours = 0;
  } else if (demoHour > startHour) {
    demoPassedHours = demoHour - startHour;
  } else {
    demoPassedHours = (demoHour + 24) - startHour;
  }

  const hoursLeft = 23 - demoPassedHours;
  const maxSeconds = (144*speed)/1000;
  const secondsPerHour = maxSeconds / 24;
  const timeLeft = hoursLeft * secondsPerHour;
  
  useEffect(() => {
    let intervalId;
    if (! isPaused && timeLeft > 0) {
      intervalId = setInterval(() => {
        if (passedTime === 0 || passedTime % 3 === 0) {
          setDownload(true);
          setUpload(false);
          localStorage.setItem('download', true);
          localStorage.setItem('upload', false);
        } else {
          setDownload(false);
          setUpload(true);
          localStorage.setItem('download', false);
          localStorage.setItem('upload', true);
        }
        setPassedTime(parseInt(passedTime) + 1);
        localStorage.setItem('passedTime', parseInt(passedTime));
      }, 1000);
      
    }
    return () => clearInterval(intervalId);
  }, [isPaused, download, upload, passedTime])

  if (component.type === "consumer") {
    consumptionData = componentData.consumption_per_hour_kwh
    consumptionData.forEach(h => {
      h.startHour = new Date(h.startDate).getUTCHours()
    });
    totalConsumption = consumptionData.reduce((a, b) => {return a + b.value}, 0).toFixed(2);
  } else if (component.type === "producer") {
    productionData = componentData.production_per_hour_kwh
    if (productionData.length > 0) {
      productionData.forEach(h => {
        h.startHour = new Date(h.startDate).getUTCHours()
      })
      totalProduction = productionData.reduce((a, b) => {return a + b.value}, 0).toFixed(2);
    } else if (component.id === "electric-board") {
      const consumingComponents = energyComponents.components.filter(c => c.consumption_per_hour_kwh.length > 0).filter(c => visibleComponents.findIndex(v => v.id === c.id) !== -1);
      consumingComponents.forEach(c => {
        const componentConsumption = c.consumption_per_hour_kwh.reduce((a, b) => a + b.value, 0);
        totalConsumption += componentConsumption;
      })
      const producingComponents = energyComponents.components.filter(c => c.production_per_hour_kwh.length > 0).filter(c => visibleComponents.findIndex(v => v.id === c.id) !== -1);
      producingComponents.forEach(c => {
        const componentProduction = c.production_per_hour_kwh.reduce((a, b) => a + b.value, 0);
        ownProduction += componentProduction;
      })
      totalProduction = (totalConsumption - ownProduction).toFixed(2);
    }
  } else if (component.id === "optimizer" && demoStartTime !== undefined) {
    <>
    
    </>

  }
  
  return (
    
    <Card sx={{
      maxWidth: '500px',
      minWidth: '250px',
      minHeight: '20%',
      padding: '0.5vh'
      }}>
      <CardContent sx={{margin: 0}}>
        {type === "consumer" &&
        <>
          <Typography variant='body2' sx={{marginBottom: 1}}>
            <strong>{name}</strong> (Energy consumer)<br/>
          </Typography>  
          <Typography variant='body2' sx={{marginBottom: 1}}>
            Energy consumed between {demoHour}:00-{parseInt(demoHour)+1}:00<br/>
            {consumptionData.filter(h => h.startHour === demoHour).map(h => h.value)[0]} kWh<br/>
            Total consumption during the demo {totalConsumption} kWh
          </Typography>
        </> } 
        {type === "producer" && component.id !== "electric-board" &&
        <>
          <Typography variant='body2' sx={{marginBottom: 1}}>
            <strong>{name}</strong> (Energy producer)<br/>
          </Typography>  
          <Typography variant='body2' sx={{marginBottom: 1}}>
            Energy produced between {demoHour}:00-{parseInt(demoHour)+1}:00<br/>
            {productionData.filter(h => h.startHour === demoHour).map(h => h.value)[0]} kWh <br/>
            Total production during the demo {totalProduction} kWh
          </Typography>
        </> }
        {component.id === "electric-board" && component.netConsumption !== undefined &&
          <>
          <Typography variant='body2' sx={{marginBottom: 1}}>
            <strong>{name}</strong> (Energy producer)<br/>
          </Typography>  
          <Typography variant='body2' sx={{marginBottom: 1}}>
            Energy received from electricity network between {demoHour}:00-{parseInt(demoHour)+1}:00<br/>
            {component.netConsumption.filter(h => h.startHour === demoHour).map(h => h.value)[0]} kWh <br/>
            Total use of outside energy during the demo {totalProduction} kWh
          </Typography>
        </> }
        {component.id === "optimizer" &&
          <>
          <Typography variant='body2' sx={{marginBottom: 1}}>
            <strong>{name}</strong><br/>
          </Typography>  
          <Typography variant='body2' sx={{marginBottom: 1}}>
            {description}
          </Typography>
          {download && 
          <Typography>
            <strong>data is being downloaded</strong>
          </Typography>
          }
          {upload && 
          <Typography>
            <strong>data is being uploaded</strong>
          </Typography>
          }
        </>
        }
        <Typography variant='body2'>
          Click the component for more info
        </Typography>
      </CardContent>
    </Card>
  )
}

export default EnergyComponent;