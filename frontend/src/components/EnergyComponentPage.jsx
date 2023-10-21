import { Grid, Box, Button, Typography } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import dataB from '../../../test_data/energyComponents.json'

async function fetchHelper() {
  let usageFileName = '../../../test_data/energyComponents.json';
  //let usageData = "Data not read";
  
  /*fetch(usageFileName)
	  .then((response) => response.json())
	  .then((json) => usageData = json);*/
    
  const resp = await fetch(usageFileName);
  const usageData = await resp.json();
	  
	document.getElementById("pconsume").innerHTML = usageData;
}

const EnergyComponentPage = () => { 
  const navigate = useNavigate();
  const location = useLocation();
  const component = location.state.component;
  
	fetchHelper();
  
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