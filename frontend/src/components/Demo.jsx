import { Box, Button, Grid } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { useState } from "react"
import EnergyComponent from './EnergyComponent';
import DemoClock from './DemoClock';
import RealtimeClock from './RealtimeClock';
import ElectricityPrice from './ElectricityPrice'
import ComponentMenu from './ComponentMenu'
import backgroundImage from "./../assets/background.png";
import houseImage from "./../assets/house.png";
import airHeatPumpImage from "./../assets/air_heat_pump.png";
import freezerImage from "./../assets/freezer.png";
import heaterImage from "./../assets/heater.png";
import hotWaterHeaterImage from "./../assets/hot_water_heater.png";
import jacuzziImage from "./../assets/jacuzzi.png";
import stoveImage from "./../assets/stove.png";
import washingMachineImage from "./../assets/washing_machine.png";
import solarPanelImage from "./../assets/solar_panel.png";
import carImage from "./../assets/car.png";
import electricBoardImage from "./../assets/electric_board.png";

const Demo = () => {
  const navigate = useNavigate();
  const [demoTime, setDemoTime] = useState(new Date());

  const handleDemoTimeChange = (time) => {
    const newDemoTime = new Date(time);
    setDemoTime(newDemoTime);
  };

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
          <img
            src={airHeatPumpImage}
            alt='heatPump'
            className='air-heat-pump'
            style={{
              position: 'absolute',
              top: '34%',
              left: '38%',
              width: '2%',
              height: '8%',
            }}
          />
          <img
            src={freezerImage}
            alt='freezer'
            className='freezer-image'
            style={{
              position: 'absolute',
              top: '8%',
              left: '62%',
              width: '10%',
              height: '13%',
            }}
          />
          <img
            src={heaterImage}
            alt='heater'
            className='heater-image'
            style={{
              position: 'absolute',
              top: '6%',
              left: '20%',
              width: '7%',
              height: '9%',
            }}
          />
          <img
            src={hotWaterHeaterImage}
            alt='hotWaterHeater'
            className='hot-water-heater-image'
            style={{
              position: 'absolute',
              top: '20%',
              left: '19%',
              width: '8%',
              height: '10%',
            }}
          />
          <img
            src={jacuzziImage}
            alt='jacuzzi'
            className='jacuzzi-image'
            style={{
              position: 'absolute',
              top: '2%',
              left: '6%',
              width: '13%',
              height: '15%',
            }}
          />
          <img
            src={stoveImage}
            alt='stove'
            className='stove-image'
            style={{
              position: 'absolute',
              top: '2%',
              left: '77%',
              width: '4%',
              height: '4%',
            }}
          />
          <img
            src={washingMachineImage}
            alt='washingMachine'
            className='washing-machine-image'
            style={{
              position: 'absolute',
              top: '20%',
              left: '27%',
              width: '9%',
              height: '10%',
            }}
          />
          <img
            src={electricBoardImage}
            alt='electricBoard'
            className='electric-board-image'
            style={{
              position: 'absolute',
              top: '44%',
              left: '88.6%',
              width: '10%',
              height: '12%',
            }}
          />
          </div>
          <img
            src={solarPanelImage}
            alt='solarPanel'
            className='solar-panel-image-1'
            style={{
              position: 'absolute',
              top: '66%',
              left: '7%',
              width: '10%',
              height: '10%'
            }}
          />
          <img
            src={solarPanelImage}
            alt='solarPanel'
            className='solar-panel-image-2'
            style={{
              position: 'absolute',
              top: '66%',
              left: '19%',
              width: '10%',
              height: '10%',
            }}
          />
          <img
            src={solarPanelImage}
            alt='solarPanel'
            className='solar-panel-image-3'
            style={{
              position: 'absolute',
              top: '78%',
              left: '7%',
              width: '10%',
              height: '10%',
            }}
          />
          <img
            src={solarPanelImage}
            alt='solarPanel'
            className='solar-panel-image-4'
            style={{
              position: 'absolute',
              top: '78%',
              left: '19%',
              width: '10%',
              height: '10%'
            }}
          />
          <img
            src={carImage}
            alt='car'
            className='car-image-1'
            style={{
              position: 'absolute',
              top: '55%',
              left: '62%',
              width: '28%',
              height: '35%'
            }}
          />
          <img
            src={carImage}
            alt='car'
            className='car-image-2'
            style={{
              position: 'absolute',
              top: '55%',
              left: '75%',
              width: '28%',
              height: '35%'
            }}
          />
          </div>
          </div>
      </Box>
    </Grid>
          {/*Liquid AI demo
          <Grid container spacing={2}>
            {/* container grid for the energy components */}
            {/*<Grid item xs={12} md={6}>
              <EnergyComponent
                id="1"
                name="Solar panel"
                type="producer"
                description="Solar panels turn sunlight into energy"
                demoTime={demoTime}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <EnergyComponent
                id="2"
                name="Heat pump"
                type="consumer"
                description="Heat pump is used to adjust the temperature inside the house"
                demoTime={demoTime}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <EnergyComponent
                id="3"
                name="Electric car"
                type="consumer"
                description="Electric car is recharged at the charging station"
                demoTime={demoTime}
              />
            </Grid>
        </Grid>*/}
        

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
          <Grid item xs={1} style={{ display:"flex", justifyContent: "center" }}>

          <Button 
            variant="contained"
            onClick={() => navigate("/")}>
          Stop
          </Button>
          </Grid>

        </Grid>
           
      </Grid>
      
    </Grid>
  );
}


export default Demo;