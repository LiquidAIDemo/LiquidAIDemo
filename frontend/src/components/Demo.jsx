import { Box, Button, Grid } from '@mui/material';
import { useNavigate } from "react-router-dom";

import SolarPowerIcon from '@mui/icons-material/SolarPower';
import EnergyComponent from './EnergyComponent';
import HeatPumpIcon from '@mui/icons-material/HeatPump';
import ElectricCarIcon from '@mui/icons-material/ElectricCar';


const Demo = () => {
  const navigate = useNavigate();

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
            <EnergyComponent name="Solar panel" icon={<SolarPowerIcon />}/>
          </Grid>
          <Grid item xs={12} md={6}>
            <EnergyComponent name="Heat pump" icon={<HeatPumpIcon />} />
          </Grid>
          <Grid item xs={12} md={6}>
            <EnergyComponent name="Electric car" icon={<ElectricCarIcon />} />
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
              height="40vh" >
            Time
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