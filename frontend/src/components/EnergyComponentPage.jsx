import { Grid, Box, Button, Typography } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import energyComponents from "../../../test_data/energyComponents.json";
import { BarChart } from '@mui/x-charts/BarChart';
import backgroundImage from "../assets/component_page_background.png";
import electricBoardImage from "../assets/electric_board.png";
import carImage from "../assets/car.png";
import freezerImage from "../assets/freezer.png";
import heaterImage from "../assets/heater.png";
import airHeatPumpImage from "../assets/air_heat_pump.png";
import hotWaterHeaterImage from "../assets/hot_water_heater.png";
import jacuzziImage from "../assets/jacuzzi.png";
import solarPanelImage from "../assets/solar_panel.png";
import stoveImage from "../assets/stove.png";
import washingMachineImage from "../assets/washing_machine.png";

const imageMapping = {
  'heater': electricBoardImage,
  'electric-car-1': carImage,
  'electric-car-2': carImage,
  'freezer': freezerImage,
  'heater': heaterImage,
  'heat-pump': airHeatPumpImage,
  'hot-water-heater': hotWaterHeaterImage,
  'jacuzzi': jacuzziImage,
  'solar-panel-1': solarPanelImage,
  'solar-panel-2': solarPanelImage,
  'solar-panel-3': solarPanelImage,
  'solar-panel-4': solarPanelImage,
  'stove': stoveImage,
  'washing-machine': washingMachineImage,
};

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
                position:'absolute',
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
                id={component.id}
                src={imageMapping[component.id]}
                alt={component.id}
                className={`${component.id}-image`}
                style={{
                  display: 'block',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  marginTop: 'auto',
                  marginBottom: 'auto',
                  width: 'auto',
                  height: '50%',
                }}
              />
            </div>
          </div>
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