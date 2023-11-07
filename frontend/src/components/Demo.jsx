import { Box, Button, Grid } from '@mui/material';
import { createRoutesFromChildren, useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import DemoClock from './DemoClock';
import RealtimeClock from './RealtimeClock';
import ElectricityPrice from './ElectricityPrice'
import ComponentMenu from './ComponentMenu';
import backgroundImage from "./../assets/background.png";
import houseImage from "./../assets/house.png";
import Instructions from './Instructions';
import HeatPump from './visual_components/HeatPump';
import SolarPanel1 from './visual_components/SolarPanel1';
import ElectricCar1 from './visual_components/ElectricCar1';
import Freezer from './visual_components/Freezer';
import Heater from './visual_components/Heater';
import HotWaterHeater from './visual_components/HotWaterHeater';
import Jacuzzi from './visual_components/Jacuzzi';
import ElectricCar2 from './visual_components/ElectricCar2';
import Stove from './visual_components/Stove';
import SolarPanel2 from './visual_components/SolarPanel2';
import SolarPanel3 from './visual_components/SolarPanel3';
import SolarPanel4 from './visual_components/SolarPanel4';
import WashingMachine from './visual_components/WashingMachine';
import ElectricBoard from './visual_components/ElectricBoard';
import energyComponents from "../../../test_data/energyComponents.json";

const Demo = () => {
  const navigate = useNavigate();
  const [demoTime, setDemoTime] = useState(new Date());

  const handleDemoTimeChange = (time) => {
    const newDemoTime = new Date(time);
    setDemoTime(newDemoTime);
  };

  const [openInstructions, setOpenInstructions] = useState(false);

  const componentData = energyComponents.components;
  const consumingComponents = componentData.filter(c => c.consumption_per_hour_kwh.length > 0);
  const producingComponents = componentData.filter(c => c.production_per_hour_kwh.length > 0);
  
  let totalConsumption = [];
  let totalProduction = [];
  let netConsumption = [];

  if (totalConsumption.length === 0) {
    for (let i=0; i<=23; i++) {
      totalConsumption.push({hour: i, value: 0});
    }
  }
  
  if (totalProduction.length === 0) {
    for (let i=0; i<=23; i++) {
      totalProduction.push({hour: i, value: 0});
    }
  }

  if (netConsumption.length === 0) {
    for (let i=0; i<=23; i++) {
      netConsumption.push({hour: i, value: 0});
    }
  }
    
  useEffect(() => {    
    
    consumingComponents.forEach(c => {
      const data = c.consumption_per_hour_kwh;
      data.forEach(d => {
        const hour = new Date(d.startDate).getHours()
        const consumptionHour = totalConsumption.find(obj => obj.hour === hour);
        consumptionHour.value += d.value;
      })    
    })

    producingComponents.forEach(c => {
      const data = c.production_per_hour_kwh;
      data.forEach(d => {
        const hour = new Date(d.startDate).getHours()
        const productionHour = totalProduction.find(obj => obj.hour === hour);
        productionHour.value += d.value;
      })    
    })
    
    netConsumption.forEach(h => {
      const hourConsumption = totalConsumption.find(obj => obj.hour === h.hour);
      const hourProduction = totalProduction.find(obj => obj.hour === h.hour);
      h.value = hourConsumption.value - hourProduction.value;
    })
    
  },[])
  

  return (
    //Created container grid
    <Grid
    container
    spacing={4}
    columns={5}
    style={{ padding: '2vh' }} 
    >
      <Grid item xs={12} sm={3} minWidth='350px'>
        <Box height="96vh">
          <div
            style={{
              position: 'relative',
              paddingBottom: '83%', 
              width: '100%',
              height: 0,
            }}
          >
            <img
              src={backgroundImage}
              alt='Home yard'
              className='background-image'
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '92%',
                objectFit: 'cover',
              }}
            />
            <div
              className='overlay-content'
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <img
                src={houseImage}
                alt='House'
                className='house-image'
                style={{
                  position: 'absolute',
                  top: '2%',
                  left: '6%',
                  width: '90%',
                  height: '55%',
                }}
              />
              <div>
                {/*Energy components inside the house*/}
                <HeatPump demoTime={demoTime} />
                <Freezer demoTime={demoTime} />
                <Heater demoTime={demoTime} />
                <HotWaterHeater demoTime={demoTime} />
                <Jacuzzi demoTime={demoTime} />
                <Stove demoTime={demoTime} />
                <WashingMachine demoTime={demoTime} />
                <ElectricBoard demoTime={demoTime} netConsumption={netConsumption} />
              </div>
              {/*Energy components outside the house*/}
              <SolarPanel1 demoTime={demoTime} />
              <SolarPanel2 demoTime={demoTime} />
              <SolarPanel3 demoTime={demoTime} />
              <SolarPanel4 demoTime={demoTime} />
              <ElectricCar1 demoTime={demoTime} />
              <ElectricCar2 demoTime={demoTime} />
            </div>
          </div>
        </Box>
      </Grid>

      {/*Created container to span 1/3 columns */}
      <Grid item xs={2} style={{position: 'relative'}}>
        {/*Created container grid to have containers on top of another */}
        <Grid container spacing={4} columns={1}>
          <Grid item xs={1} height="10vh">
            {/*Component menu width is not working perfectly*/}
            <Box >
              <ComponentMenu/>
            </Box>
            
          </Grid>
          {/*Created container 2, where the current time and selected time range is shown
          Time text will be replaced*/}     
              
          <Grid item xs={1} minWidth='350px'>
            <Box 
              style={{padding: '2vh'}} 
              bgcolor = "#cfe8fc" 
              height="35vh"
              overflow="hidden" >
            Time
              <Box>
                <DemoClock onDemoTimeChange={handleDemoTimeChange}/>
                <RealtimeClock />
              </Box>
            </Box>
          </Grid>

          {/*Created container 3, where the savings is shown
          Savings text will be replaced*/}
          <Grid item xs={1} minWidth='350px'>
            <Box
              style={{padding: '2vh'}} 
              bgcolor = "#cfe8fc" 
              height="35vh">  
            Savings
              <ElectricityPrice demoTime={demoTime}/>
            </Box>
          </Grid>

          {/*Created container 4 for buttons and justify its content to the center*/}
          <Grid container style={{display: "flex", justifyContent: "center", alignItems: "center", margin: 10}}>
            <Grid item xs={1} style={{minWidth: 100, margin: 5}}>
            <Button 
              variant="contained"
              onClick={() => navigate("/")}>
              Back
            </Button>
            </Grid>
            <Grid item xs={1} style={{minWidth: 200, margin: 5}}>
            <Button 
              variant="contained"
              onClick={() => setOpenInstructions(true)}>
              More information
            </Button>
            </Grid>
            <Instructions openInstructions={openInstructions} setOpenInstructions={setOpenInstructions}/>
          </Grid>
          
        </Grid>
           
      </Grid>
      
    </Grid>
  );
}


export default Demo;