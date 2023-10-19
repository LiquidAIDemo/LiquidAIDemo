import { Grid, Box, Button, Typography } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
//import fs from 'fs'

//import { components } from "../test_data/electricityPrices.json" assert {type: 'json' };;

const EnergyComponentPage = () => { 
  const navigate = useNavigate();
  const location = useLocation();
  const component = location.state.component;
  
  let priceFileName = '../test_data/electricityPrices.json';
  let namedata = "WIP";
  
  //const componentFile = require('../test_data/electricityPrices.json');
    
  // Some functionality for displaying test data here:
  let usagedata;
  let fetchedData;
  
  /*var myLog = new File("../test_data/electricityPrices.json");
  if(myLog.exists()) {
    namedata = "Tiedosto on";
  } else {
    namedata = "Tiedosto ei ole"; 
  }*/
  
  /*function fetchHelper() {
  fetch('../test_data/electricityPrices.json')
    .then((response) => {
      return response.json();
    })
    .then((data) => namedata = data); 
  }*/
  
  // Some functionality for displaying test data here:
  fetch(priceFileName)
    .then((response) => response.text())
    .then((json) => document.getElementById("pconsume").innerHTML = Object.keys(json)[0]);
    
  
  /*fs.readFile('../test_data/electricityPrices.json', function (error, content) {
    fetchedData = JSON.parse(content);  
  });*/
  
  //namedata = usagedata;
  
  /*pumpdata = console.table([{
    "name" : usagedata.result[0].name,
  }]);*/
  
  //const componentFile = require('../test_data/electricityPrices.json');
  
  //namedata = typeof componentFiles;
  
  
  //const fetchedFile = fetch('../test_data/electricityPrices.json');
  //const fetchedData = response.json();
  
  return (
    <Grid 
      container
      spacing={4}
      columns={3}
      style={{ padding: '2vh' }}
      > 
      <Grid item xs={12} sm={2} minWidth='350px'>
        <Box 
          style={{
            padding: '2vh', 
            display: 'flex', 
            alignItems: 'center',
            justifyContent: 'center'}}
          bgcolor = "#cfe8fc" 
          height="96vh">
          insert picture of {component.name} here 
        </Box>
      </Grid>
      <Grid item xs={1}>
        <Grid container spacing={4} columns={1}>
          <Grid item xs={1} minWidth='350px'>
            <Box 
              style={{padding: '2vh'}} 
              bgcolor = "#cfe8fc" 
              height="80vh" >
              <Typography 
                variant="body1"
                sx={{margin: 2}}
                >{component.name}
              </Typography>
              <Typography 
                variant="body2"
                sx={{margin: 2}}
                >{component.description}
              </Typography>
              {component.type === "producer" && 
                <>
                  <Typography 
                    variant="body1"
                    sx={{margin: 2}}
                    >Energy producing component
                  </Typography> 
                  <Typography 
                    variant="body2"
                    sx={{margin: 2}}
                    >Energy producing times:
                  </Typography>
                  <Typography 
                    variant="body2"
                    sx={{margin: 2}}
                    >insert values from test data here
                  </Typography>
                  <Typography 
                    variant="body2"
                    sx={{margin: 2}}
                    >Energy produced:
                  </Typography>
                  <Typography 
                    variant="body2"
                    sx={{margin: 2}}
                    >insert values from test data here
                  </Typography>
                  </>
                }
                {component.type === "consumer" && 
                  <>
                  <Typography 
                    variant="body1"
                    sx={{margin: 2}}
                    >Energy consuming component
                  </Typography>
                  <Typography 
                  variant="body2"
                  sx={{margin: 2}}
                  >Energy consuming times:
                </Typography>
                <Typography 
                    variant="body2"
                    sx={{margin: 2}}
                    >insert values from test data here: 
                    <p id="pconsume">FAILURE TO LOAD DATA</p>
                  </Typography>
                  <Typography 
                    variant="body2"
                    sx={{margin: 2}}
                    >Energy consumed:
                  </Typography>
                  <Typography 
                    variant="body2"
                    sx={{margin: 2}}
                    >insert values from test data here
                  </Typography>
                </>
              }
            </Box>
          </Grid>
          <Grid item xs={1} style={{ display:"flex", justifyContent: "center" }}>
            <Button 
              variant="contained"
              onClick={() => navigate("/demo")}>
              Back to demo
            </Button>
            <Button>Restart </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default EnergyComponentPage;