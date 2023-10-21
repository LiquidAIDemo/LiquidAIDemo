import { Box, Button, Grid } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { useState } from "react"
import EnergyComponent from './EnergyComponent';
import DemoClock from './DemoClock';
import RealtimeClock from './RealtimeClock';
import ElectricityPrice from './ElectricityPrice'

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
    columns={3}
    style={{ padding: '2vh' }}
    
    >
      {/*Created container to span 2/3 columns. This is where the demo is.
        Replace "main view" text with the demos view. The color can be removed*/}
      <Grid item xs={12} sm={2} minWidth='350px'>
        <Box 
          style={{padding: '2vh'}}
          bgcolor = "#cfe8fc" 
          height="96vh">
        Main view
        <Grid container spacing={2}>
          {/* container grid for the energy components */}
          <Grid item xs={12} md={6}>
            <EnergyComponent id="1" name="Solar panel" type="producer"
            description="Solar panels turn sunlight into energy"/>
          </Grid>
          <Grid item xs={12} md={6}>
            <EnergyComponent id="2" name="Heat pump" type="consumer"
            description="Heat pump is used to adjust the temperature inside the house"/>
          </Grid>
          <Grid item xs={12} md={6}>
            <EnergyComponent id="3" name="Electric car" type="consumer"
            description="Electric car is recharged at the charging station"/>
          </Grid>
        </Grid>
        </Box>
      </Grid>

      {/*Created container to span 1/3 columns */}
      <Grid item xs={1}>
        {/*Created container grid to have containers on top of another */}
        <Grid container spacing={4} columns={1}>

          {/*Created container 2, where the current time and selected time range is shown
          Time text will be replaced*/}
          <Grid item xs={1} minWidth='350px'>
            <Box 
              style={{padding: '2vh'}} 
              bgcolor = "#cfe8fc" 
              height="40vh"
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
              height="40vh">  
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
          <Button> Restart </Button>
          </Grid>

        </Grid>
           
      </Grid>
      
    </Grid>
  );
}


export default Demo;