import { Grid, Box, Button, Typography } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useNavigate, useLocation } from 'react-router-dom';
import energyComponents from "../../../test_data/energyComponents.json";
import { BarChart } from '@mui/x-charts/BarChart';
import backgroundImage from "../assets/component_page_background.png";
import carImage from "../assets/car.png";
import freezerImage from "../assets/freezer.png";
import heaterImage from "../assets/heater.png";
import airHeatPumpImage from "../assets/air_heat_pump.png";
import hotWaterHeaterImage from "../assets/hot_water_heater.png";
import jacuzziImage from "../assets/jacuzzi.png";
import solarPanelImage from "../assets/solar_panel.png";
import stoveImage from "../assets/stove.png";
import washingMachineImage from "../assets/washing_machine.png";
import electricBoardImage from "../assets/electric_board.png";
import NotFound from './NotFound';
import ElectricityPrice from './ElectricityPrice';
import { useState, useEffect } from 'react';
import { ChartContainer } from '@mui/x-charts/ChartContainer';
import { BarPlot } from '@mui/x-charts/BarChart';
import { LinePlot } from '@mui/x-charts/LineChart';
import { ChartsXAxis } from '@mui/x-charts/ChartsXAxis';
import { ChartsYAxis } from '@mui/x-charts/ChartsYAxis';
import axios from 'axios';

const theme = createTheme({
  palette: {
    water: {
      main: '#8BD4E2',
      light: '#a7dee7',
      dark: '#0eafc9',
      contrastText: '#000000',
    },
  },
  typography: {
    button: {
      textTransform: 'none',
      fontWeight: 'bolder',
    }
  }
});

const imageMapping = {
  'electric-board': electricBoardImage,
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
  const [prices, setPrices] = useState([]);
  var optimizedConsumption = [];

  useEffect(() => {
    try {
      axios("/api")
      .then(res => {
        setPrices(res.data)
      })
    } catch (e) {
      console.error("Error fetching prices:", e)
    }
  }, [])

  window.onpopstate = () => navigate("/demo");

  if (location.state !== null) {
    const component = location.state.component;
    const componentData = energyComponents.components.filter(c => c.id === component.id)[0];
    let productionData = [];
    let consumptionData = [];
    let totalProduction = 0;
    let totalConsumption = 0;
    let ownProduction = 0;

    if (component.type === "consumer") {
      consumptionData = componentData.consumption_per_hour_kwh
      consumptionData.forEach(h => {
        const startHour = new Date(h.startDate).getUTCHours()
        h.hour = startHour + ':00-' + (parseInt(startHour) + 1) + ':00'
      });
      totalConsumption = consumptionData.reduce((a, b) => {return a + b.value}, 0).toFixed(2);
      
      if (component.optimal24hConsumption !== undefined && component.maxHourlyConsumption !== undefined 
        && component.demoStartTime !== undefined && prices.length > 0) {
        const optimal24hConsumption = parseFloat(component.optimal24hConsumption);
        const maxHourlyConsumption = parseFloat(component.maxHourlyConsumption);
        const demoStartTime = component.demoStartTime.demoStartTime;
        const wholeConsumptionHours = parseInt(optimal24hConsumption / maxHourlyConsumption);
        const residualHour = parseFloat((optimal24hConsumption - (maxHourlyConsumption * wholeConsumptionHours)).toFixed(2));

        var demoPrices = [];

        for (let i=0; i<=23; i++) {
          const dateObjStartTime = new Date(demoStartTime);
          const hoursCopy = dateObjStartTime.getHours() + i;
          const newTime = new Date(dateObjStartTime.setHours(hoursCopy));
          const newTimeString = newTime.toLocaleString("fi-FI", { timeZone: "Europe/Helsinki" });
          const price = prices.find(p => p.startDate === newTimeString);
          if (price !== undefined) {
            price.startHour = newTime.getHours();
          }
          demoPrices.push(price);
        }

        const sortedPrices = demoPrices.sort((a, b) => {
          return a.price - b.price;
        })

        for (let i=0; i<=23; i++) {
          optimizedConsumption.push({startHour: i, value: 0});
        }

        for (let i=0; i < wholeConsumptionHours; i++) {
          const priceData = sortedPrices[i];
          optimizedConsumption.find(h => h.startHour === priceData.startHour).value = maxHourlyConsumption;
        }

        optimizedConsumption.forEach(h => {
          h.hour = h.startHour + ':00-' + (parseInt(h.startHour) + 1) + ':00'
        })

        if (residualHour > 0) {
          const priceData = sortedPrices[wholeConsumptionHours];
          optimizedConsumption.find(h => h.startHour === priceData.startHour).value = residualHour;
        }

        console.log(optimizedConsumption);
        console.log(consumptionData);

      }

    } else if (component.type === "producer") {
      productionData = componentData.production_per_hour_kwh
      if (productionData.length > 0) {
        productionData.forEach(h => {
          const startHour = new Date(h.startDate).getUTCHours()
          h.hour = startHour + ':00-' + (parseInt(startHour) + 1) + ':00'
        })
        totalProduction = productionData.reduce((a, b) => {return a + b.value}, 0).toFixed(2);
      } else if (component.id === "electric-board") {
        const visibleComponents = component.visibleComponents.visibleComponents;
        const consumingComponents = energyComponents.components.filter(c => c.consumption_per_hour_kwh.length > 0).filter(c => visibleComponents.findIndex(v => v.id === c.id) !== -1);
        consumingComponents.forEach(c => {
          const componentConsumption = c.consumption_per_hour_kwh.reduce((a, b) => a + b.value, 0);
          totalConsumption += componentConsumption;
        })
        const producingComponents = energyComponents.components.filter(c => c.production_per_hour_kwh.length > 0).filter(c => visibleComponents.findIndex(v => v.id === c.id) !== -1);
        producingComponents.forEach(c => {
          const componentProduction = c.production_per_hour_kwh.reduce((a, b) => a + b.value, 0);
          ownProduction += componentProduction;
        })
        totalProduction = (totalConsumption - ownProduction).toFixed(2);
        productionData = component.netConsumption.netConsumption;
        if (productionData.length > 0) {
          productionData.forEach(h => {
            h.hour = h.startHour + ':00-' + (parseInt(h.startHour) + 1) + ':00'
          })
        }
      }
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
            <Grid item xs={1} minWidth='45vh'>
              <Box 
                style={{padding: '2vh', 
                border: '1px solid #DCDCDC', 
                borderRadius: '5px', 
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',}} 
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
                {component.type === "producer" && component.id !== "electric-board" &&
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
                      >Total production {totalProduction} kWh
                    </Typography>
                    {productionData.length > 0 &&
                      <BarChart
                        dataset={productionData}
                        yAxis={[{label: 'kWh'}]}
                        xAxis={[{scaleType: 'band', dataKey: 'hour', tickLabelInterval: () => false, label: 'time (h)'}]}
                        series={[{dataKey: 'value', label: 'production (kWh)'}]}
                        width={350}
                        height={300}
                      />
                    }                    
                    </>
                  }
                  {component.type === "producer" && component.id === "electric-board" &&
                  <>
                    <Typography 
                      variant="body1"
                      sx={{margin: 2}}
                      >Energy producing component
                    </Typography> 
                    <Typography 
                      variant="body2"
                      sx={{margin: 2}}
                      >Energy received from the electricity network in the last 24 hours:
                    </Typography>
                    <Typography 
                      variant="body2"
                      sx={{margin: 2}}
                      >Total use of outside energy {totalProduction} kWh
                    </Typography>
                    {productionData.length > 0 &&
                      <BarChart
                        dataset={productionData}
                        yAxis={[{label: 'kWh'}]}
                        xAxis={[{scaleType: 'band', dataKey: 'hour', tickLabelInterval: () => false, label: 'time (h)'}]}
                        series={[{dataKey: 'value', label: 'received energy (kWh)'}]}
                        width={350}
                        height={300}
                      />
                    }                    
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
                      >Total consumption {totalConsumption} kWh
                    </Typography>
                      <BarChart
                        dataset={consumptionData}
                        yAxis={[{label: 'kWh'}]}
                        xAxis={[{scaleType: 'band', dataKey: 'hour', tickLabelInterval: () => false, label: 'time (h)'}]}
                        series={[{dataKey: 'value', label: 'consumption (kWh)'}]}
                        width={350}
                        height={300}
                      />
                    
                  </>
                }
              </Box>
            </Grid>
            <Grid item xs={1} style={{ display:"flex", justifyContent: "center" }}>
              <ThemeProvider theme={theme}>
                <Button variant="contained" color="water" sx={{ borderRadius: 2}} onClick={() => navigate("/demo")}>
                  Back
                </Button>
              </ThemeProvider>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  } else {
    return <NotFound />
  }  
}

export default EnergyComponentPage;