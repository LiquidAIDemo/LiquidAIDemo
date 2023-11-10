import { Box, Button, Grid } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import DemoClock from './DemoClock';
import RealtimeClock from './RealtimeClock';
import ElectricityPrice from './ElectricityPrice'
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

import { List, ListItemButton, ListItemText, ListItem, Collapse } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

function useLocalStorageState(key, defaultValue) {
  // Initialize state with value from localStorage or the provided default value
  const [state, setState] = useState(() => {
    const savedState = localStorage.getItem(key);
    if (savedState) {
      return JSON.parse(savedState);
    } else {
      return defaultValue;
    }
  });

  const resetState = () => {
    setState(defaultValue);
    localStorage.setItem(key, JSON.stringify(defaultValue));
};

  // Use useEffect to update localStorage when state changes
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState, resetState];
}

const Demo = () => {
  const navigate = useNavigate();
  const [demoTime, setDemoTime] = useState(new Date());


  const [open, setOpen] = useState(false);

  const handleReset = () => {
    // Reset all visibility settings to their original values
    setShowHeatPump(true);
    setShowElectricBoard(true);
    setShowElectricCar1(true);
    setShowElectricCar2(true);
    setShowFreezer(true);
    setShowHeater(true);
    setShowHotWaterHeater(true);
    setShowJacuzzi(true);
    setShowSolarPanel1(true);
    setShowSolarPanel2(true);
    setShowSolarPanel3(true);
    setShowSolarPanel4(true);
    setShowStove(true);
    setShowWashingMachine(true);
};

  const handleClick = () => {
    setOpen(!open);
  };

  // values from visual component visibility
  const [showHeatPump, setShowHeatPump] = useLocalStorageState('showHeatPump', true);
  const [showElectricBoard, setShowElectricBoard] = useLocalStorageState('showElectricBoard', true);
  const [showElectricCar1, setShowElectricCar1] = useLocalStorageState('showElectricCar1', true);
  const [showElectricCar2, setShowElectricCar2] = useLocalStorageState('showElectricCar2', true);
  const [showFreezer, setShowFreezer] = useLocalStorageState('showFreezer', true);
  const [showHeater, setShowHeater] = useLocalStorageState('showHeater', true);
  const [showHotWaterHeater, setShowHotWaterHeater] = useLocalStorageState('showHotWaterHeater', true);
  const [showJacuzzi, setShowJacuzzi] = useLocalStorageState('showJacuzzi', true);
  const [showSolarPanel1, setShowSolarPanel1] = useLocalStorageState('showSolarPanel1', true);
  const [showSolarPanel2, setShowSolarPanel2] = useLocalStorageState('showSolarPanel2', true);
  const [showSolarPanel3, setShowSolarPanel3] = useLocalStorageState('showSolarPanel3', true);
  const [showSolarPanel4, setShowSolarPanel4] = useLocalStorageState('showSolarPanel4', true);
  const [showStove, setShowStove] = useLocalStorageState('showStove', true);
  const [showWashingMachine, setShowWashingMachine] = useLocalStorageState('showWashingMachine', true);


  const handleDemoTimeChange = (time) => {
    const newDemoTime = new Date(time);
    setDemoTime(newDemoTime);
  };

  const [openInstructions, setOpenInstructions] = useState(false);

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
                {showHeatPump && <HeatPump demoTime={demoTime} />}
                {showElectricBoard && <ElectricBoard demoTime={demoTime} />}
                {showFreezer && <Freezer demoTime={demoTime} />}
                {showHeater && <Heater demoTime={demoTime} />}
                {showHotWaterHeater && <HotWaterHeater demoTime={demoTime} />}
                {showJacuzzi && <Jacuzzi demoTime={demoTime} />}
                {showStove && <Stove demoTime={demoTime} />}
                {showWashingMachine && <WashingMachine demoTime={demoTime} />}
              </div>
              {/*Energy components outside the house*/}
              {showSolarPanel1 && <SolarPanel1 demoTime={demoTime} />}
              {showSolarPanel2 && <SolarPanel2 demoTime={demoTime} />}
              {showSolarPanel3 && <SolarPanel3 demoTime={demoTime} />}
              {showSolarPanel4 && <SolarPanel4 demoTime={demoTime} />}
              {showElectricCar1 && <ElectricCar1 demoTime={demoTime} />}
              {showElectricCar2 && <ElectricCar2 demoTime={demoTime} />}
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
            <List
              sx={{width: '96%', bgcolor: 'background.paper'}}
              style={{position: 'absolute', zIndex: 1000}}
            >
              <ListItemButton onClick={handleClick} sx={{ width: '100%' }}>
                <ListItemText primary="Components" />
                {open ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div">
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <ListItem>
                        <input
                          type="checkbox"
                          checked={showHeatPump}
                          onChange={() => setShowHeatPump(!showHeatPump)}
                          
                        />
                        <label>Heat Pump</label>
                      </ListItem>
                      <ListItem>
                        <input
                          type="checkbox"
                          checked={showElectricBoard}
                          onChange={() => setShowElectricBoard(!showElectricBoard)}
                        />
                        <label>Electric board</label>
                      </ListItem>
                      <ListItem>
                        <input
                          type="checkbox"
                          checked={showFreezer}
                          onChange={() => setShowFreezer(!showFreezer)}
                        />
                        <label>Freezer</label>
                      </ListItem>
                      <ListItem>
                        <input
                          type="checkbox"
                          checked={showHeater}
                          onChange={() => setShowHeater(!showHeater)}
                        />
                        <label>Heater</label>
                      </ListItem>
                      <ListItem>
                        <input
                          type="checkbox"
                          checked={showHotWaterHeater}
                          onChange={() => setShowHotWaterHeater(!showHotWaterHeater)}
                        />
                        <label>Hot water heater</label>
                      </ListItem>
                      <ListItem>
                        <input
                          type="checkbox"
                          checked={showStove}
                          onChange={() => setShowStove(!showStove)}
                        />
                        <label>Stove</label>
                      </ListItem>
                      <ListItem>
                        <input
                          type="checkbox"
                          checked={showWashingMachine}
                          onChange={() => setShowWashingMachine(!showWashingMachine)}
                        />
                        <label>Washing machine</label>
                      </ListItem>
                      
                    </Grid>
                    <Grid item xs={6}>
                    <ListItem>
                        <input
                          type="checkbox"
                          checked={showElectricCar1}
                          onChange={() => setShowElectricCar1(!showElectricCar1)}
                        />
                        <label>Electric car 1</label>
                      </ListItem>
                      <ListItem>
                        <input
                          type="checkbox"
                          checked={showElectricCar2}
                          onChange={() => setShowElectricCar2(!showElectricCar2)}
                        />
                        <label>Electric car 2</label>
                      </ListItem>
                      <ListItem>
                        <input
                          type="checkbox"
                          checked={showSolarPanel1}
                          onChange={() => setShowSolarPanel1(!showSolarPanel1)}
                        />
                        <label>Solar panel 1</label>
                      </ListItem>
                      <ListItem>
                        <input
                          type="checkbox"
                          checked={showSolarPanel2}
                          onChange={() => setShowSolarPanel2(!showSolarPanel2)}
                        />
                        <label>Solar panel 2</label>
                      </ListItem>
                      <ListItem>
                        <input
                          type="checkbox"
                          checked={showSolarPanel3}
                          onChange={() => setShowSolarPanel3(!showSolarPanel3)}
                        />
                        <label>Solar panel 3</label>
                      </ListItem>
                      <ListItem>
                        <input
                          type="checkbox"
                          checked={showSolarPanel4}
                          onChange={() => setShowSolarPanel4(!showSolarPanel4)}
                        />
                        <label>Solar panel 4</label>
                      </ListItem>
                      <ListItem>
                        <input
                          type="checkbox"
                          checked={showJacuzzi}
                          onChange={() => setShowJacuzzi(!showJacuzzi)}
                        />
                        <label>Jacuzzi</label>
                      </ListItem>
                      <Button onClick={handleReset}>Reset to Default</Button>
                    </Grid>
                    
                  </Grid>
                </List>
              </Collapse>
            </List>
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