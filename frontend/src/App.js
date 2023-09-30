import Home from './components/Home';
import Demo from './components/Demo';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

function FlexContainerGrid() {
  return (
    //Create container grid
    <Grid
    container
    spacing={4}
    columns={3}
    >
      {/*Create container to span 2/3 columns. This is where the demo is.*/}
      <Grid item xs={2}>
        <Box bgcolor = "#cfe8fc"  height="85vh">
        Container 1
        </Box>
      </Grid>

      {/*Create container to span 1/3 columns */}
      <Grid item xs={1}>
        {/*Create container grid to have containers on top of another */}
        <Grid container spacing={4} columns={1}>

          {/*Create container 2, where the current time and selected time range is shown*/}
          <Grid item xs={1}>
            <Box  bgcolor = "#cfe8fc" height="35vh" >
            Container 2
            </Box>
          </Grid>

          {/*Create container 3, where the savings is shown*/}
          <Grid item xs={1}>
            <Box  bgcolor = "#cfe8fc" height="35vh">  
            Container 3
            </Box>
          </Grid>

          {/*Create container 4 for buttons and justify its content to the center*/}
          <Grid item xs={1} style={{ display:"flex", justifyContent: "center" }}>

            <Button> Stop </Button>
            <Button> Restart </Button>
          </Grid>

        </Grid>
           
      </Grid>
      
    </Grid>
  );

}


function App() {
  return (
    
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/demo" element={<Demo />} />
      </Routes>
    </Router> 
    
  );
}

export default App;
