import { Grid, Box, Button, Typography } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import energyComponents from "../../../test_data/energyComponents.json";
import { BarChart } from '@mui/x-charts/BarChart';


const EnergyComponentPage = () => { 
  
  const navigate = useNavigate();
  const location = useLocation();
  const component = location.state.component;
  const componentData = energyComponents.components.filter(c => c.id === component.id)[0];
  var productionData = [];
  var consumptionData = [];
  var totalProduction = 0;
  var totalConsumption = 0;

  if (component.type === "consumer") {
    consumptionData = componentData.consumption_per_hour_kwh
    consumptionData.forEach(h => {
      const startHour = new Date(h.startDate).getHours()
      h.hour = startHour + ':00-' + (parseInt(startHour) + 1) + ':00'
    });
    totalConsumption = consumptionData.reduce((a, b) => {return a + b.value}, 0).toFixed(2);
  } else if (component.type === "producer") {
    productionData = componentData.production_per_hour_kwh
    productionData.forEach(h => {
      const startHour = new Date(h.startDate).getHours()
      h.hour = startHour + ':00-' + (parseInt(startHour) + 1) + ':00'
    })
    totalProduction = productionData.reduce((a, b) => {return a + b.value}, 0).toFixed(2);
  }

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
                fontWeight="bold"
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
                    >Energy produced in the last 24 hours:
                  </Typography>
                  <Typography 
                    variant="body2"
                    sx={{margin: 2}}
                    >Total production {totalProduction} kwh
                  </Typography>
                  <BarChart
                    dataset={productionData}
                    yAxis={[{label: 'kwh'}]}
                    xAxis={[{scaleType: 'band', dataKey: 'hour', tickLabelInterval: () => false, label: 'time (h)'}]}
                    series={[{dataKey: 'value', label: 'production (kwh)'}]}
                    width={350}
                    height={300}
                  />
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
                    >Energy consumed in the last 24 hours:
                  </Typography>
                  <Typography 
                    variant="body2"
                    sx={{margin: 2}}
                    >Total consumption {totalConsumption} kwh
                  </Typography>
                  <BarChart
                    dataset={consumptionData}
                    yAxis={[{label: 'kwh'}]}
                    xAxis={[{scaleType: 'band', dataKey: 'hour', tickLabelInterval: () => false, label: 'time (h)'}]}
                    series={[{dataKey: 'value', label: 'consumption (kwh)'}]}
                    width={350}
                    height={300}
                  />
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
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default EnergyComponentPage;