import { Grid, Box, Button, Typography } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { useNavigate, useLocation } from 'react-router-dom';
import energyComponents from "../../../test_data/energyComponents.json";
import { BarChart } from '@mui/x-charts/BarChart';
import backgroundImage from "../assets/component_page_background.png";
import carImage from "../assets/car.png";
import carEnergy from "../assets/car_energy.png";
import freezerImage from "../assets/freezer.png";
import freezerEnergy from "../assets/freezer_energy.png";
import heaterImage from "../assets/heater.png";
import heaterEnergy from "../assets/heater_energy.png";
import airHeatPumpImage from "../assets/air_heat_pump.png";
import heatPumpEnergy from "../assets/air_heat_pump_energy.png";
import hotWaterHeaterImage from "../assets/hot_water_heater.png";
import waterHeaterEnergy from "../assets/hot_water_heater_energy.png";
import jacuzziImage from "../assets/jacuzzi.png";
import jacuzziEnergy from "../assets/jacuzzi_energy.png";
import solarPanelImage from "../assets/solar_panel.png";
import solarPanelEnergy from "../assets/solar_panel_energy.png";
import stoveImage from "../assets/stove.png";
import stoveEnergy from "../assets/stove_energy.png";
import washingMachineImage from "../assets/washing_machine.png";
import WashingMachineEnergy from "../assets/washing_machine_energy.png";
import electricBoardImage from "../assets/electric_board.png";
import electricBoardEnergy from "../assets/electric_board_energy.png";
import NotFound from './NotFound';
import { useState, useEffect } from 'react';
import { ChartContainer } from '@mui/x-charts/ChartContainer';
import { BarPlot } from '@mui/x-charts/BarChart';
import { LinePlot } from '@mui/x-charts/LineChart';
import { ChartsXAxis } from '@mui/x-charts/ChartsXAxis';
import { ChartsYAxis } from '@mui/x-charts/ChartsYAxis';
import { ChartsTooltip } from '@mui/x-charts/ChartsTooltip';
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

const borderMapping = {
  'electric-board': electricBoardEnergy,
  'electric-car-1': carEnergy,
  'electric-car-2': carEnergy,
  'freezer': freezerEnergy,
  'heater': heaterEnergy,
  'heat-pump': heatPumpEnergy,
  'hot-water-heater': waterHeaterEnergy,
  'jacuzzi': jacuzziEnergy,
  'solar-panel-1': solarPanelEnergy,
  'solar-panel-2': solarPanelEnergy,
  'solar-panel-3': solarPanelEnergy,
  'solar-panel-4': solarPanelEnergy,
  'stove': stoveEnergy,
  'washing-machine': WashingMachineEnergy,
}

const EnergyComponentPage = () => { 

  const navigate = useNavigate();
  const location = useLocation();
  const [prices, setPrices] = useState([]);
  let optimizedConsumption = [];
  let chartData = [];
  let timeData = [];
  const start = useState(localStorage.getItem('selectedStart'))[0];

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
    let totalPrice = 0;
    let optimalPrice = 0;
    let savings = 0;
    let demoHours = [];
    let demoPrices = [];
    const demoStartTime = component.demoStartTime.demoStartTime;

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
      demoHours.push(newTime.getHours());
    }

    if (component.type === "consumer") {
      consumptionData = componentData.consumption_per_hour_kwh;
      consumptionData.forEach(h => {
        const startHour = new Date(h.startDate).getUTCHours();
        h.startHour = startHour;
        h.hour = startHour + ':00-' + (parseInt(startHour) + 1) + ':00';
      });
      totalConsumption = consumptionData.reduce((a, b) => {return a + b.value}, 0).toFixed(2);

      if (prices.length > 0) {

        let timeOrderedConsumptionData = []; 

        consumptionData.forEach(c => {
          const value = c.value;
          const price = demoPrices.find(p => p.startHour === c.startHour).price;
          const hourPrice = parseFloat(value) * parseFloat(price);
          totalPrice = totalPrice + hourPrice;
        })

        const sortedPrices = demoPrices.sort((a, b) => {
          return a.price - b.price;
        })

        if (component.optimize) {
          const optimal24hConsumption = parseFloat(totalConsumption);
          const maxHourlyConsumption = parseFloat(consumptionData.reduce((a, b) => Math.max(a, b.value), 0));
          
          const wholeConsumptionHours = parseInt(optimal24hConsumption / maxHourlyConsumption);
          const residualHour = parseFloat((optimal24hConsumption - (maxHourlyConsumption * wholeConsumptionHours)).toFixed(2));

          for (let i=0; i<=23; i++) {
            const realConsumption = consumptionData.find(h => h.startHour === i);
            const price = sortedPrices.find(p => p.startHour === i).price;
            if (realConsumption !== undefined) {
              optimizedConsumption.push({startHour: i, optimizedValue: 0, realValue: realConsumption.value, hour: realConsumption.hour, price: price});
            }
          }

          if (optimizedConsumption.length > 0) {
            for (let i=0; i < wholeConsumptionHours; i++) {
              const priceData = sortedPrices[i];
              optimizedConsumption.find(h => h.startHour === priceData.startHour).optimizedValue = maxHourlyConsumption;
            }

            optimizedConsumption.forEach(h => {
              h.hour = h.startHour + ':00-' + (parseInt(h.startHour) + 1) + ':00';
              const value = h.optimizedValue;
              const price = demoPrices.find(p => p.startHour === h.startHour).price;
              const hourPrice = parseFloat(value) * parseFloat(price);
              optimalPrice = optimalPrice + hourPrice;
            })

            savings = totalPrice/100 - optimalPrice/100;

            if (residualHour > 0) {
              const priceData = sortedPrices[wholeConsumptionHours];
              optimizedConsumption.find(h => h.startHour === priceData.startHour).optimizedValue = residualHour;
            }
          }          

          demoHours.forEach(h => {
            const data = optimizedConsumption.find(c => c.startHour === h)
            timeOrderedConsumptionData.push(data);
          })

          chartData = [
            {
              type: 'line',
              label: 'price (cents/kWh)',
              yAxisKey: 'price (cents/kWh)',
              color: 'red',
              data: timeOrderedConsumptionData.map(c => c.price)
            },
            {
              type: 'bar',
              label: 'optimized consumption (kWh)',
              yAxisKey: 'consumption (kWh)',
              color: '#4ea646',
              data: timeOrderedConsumptionData.map(c => c.optimizedValue)
            },
            {
              type: 'bar',
              label: 'real consumption (kWh)',
              yAxisKey: 'consumption (kWh)',
              color: '#59cae3',
              data: timeOrderedConsumptionData.map(c => c.realValue)
            }
          ]

          timeData = timeOrderedConsumptionData.map(c => c.hour);

        } else {
          demoHours.forEach(h => {
            const data = consumptionData.find(c => c.startHour === h)
            timeOrderedConsumptionData.push(data);
          })
          consumptionData = timeOrderedConsumptionData;
        }

      }
      
    } else if (component.type === "producer") {
      productionData = componentData.production_per_hour_kwh

      if (productionData.length > 0) {
        productionData.forEach(h => {
          const startHour = new Date(h.startDate).getUTCHours()
          h.startHour = startHour;
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

      let timeOrderedProductionData = []; 
      demoHours.forEach(h => {
        const data = productionData.find(p => p.startHour === h)
        timeOrderedProductionData.push(data);
      })

      productionData = timeOrderedProductionData;

    }

    return (
      <div> 
        <div 
          style={{
            position: 'relative',
            top: 20,
          }}>
          <Grid 
            container
            spacing={4}
            columns={5}
            style={{ padding: '2vh' }}
            > 
            <Grid item xs={12} sm={3} width="50vh">
              <Typography
                variant="h6"
                sx={{
                  position: "absolute",
                  top: "15px",
                  left: "15px",
                  zIndex: 1,
                  fontWeight: "bold",
                }}
              >
                Energy Optimizer
              </Typography>
              <ThemeProvider theme={theme}>
                <Button variant="contained" color="water" 
                        startIcon={<ArrowLeftIcon/>}
                        sx={{ borderRadius: 2, left: '0px', marginTop: '2px'}} 
                        onClick={() => navigate("/demo")}
                >
                  Back
                </Button>
              </ThemeProvider>
              <Box height="96vh">
                <div
                  style={{
                    position: 'relative',
                    marginTop: '15px',
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
                          border: '1px solid #DCDCDC', 
                          borderRadius: '5px', 
                          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
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
                          id={`${component.id}-energy`}
                          src={borderMapping[component.id]}
                          alt={component.id}
                          className={`${component.id}-energy`}
                          style={{
                            display: 'block',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            marginTop: 'auto',
                            marginBottom: 'auto',
                            width: 'auto',
                            height: '56%',
                          }}
                        />
                        <img
                          id={component.id}
                          src={imageMapping[component.id]}
                          alt={component.id}
                          className={`${component.id}-image`}
                          style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 'auto',
                            height: '50%',
                          }}
                        />
                      </div>
                    </div>
                  </Box>
                </Grid>
                <Grid item xs={2} style={{position: 'relative', marginTop: '53px'}}>
                  <Grid container spacing={4} columns={1}>
                    <Grid item xs={1} minWidth='500px'>
                      <Box 
                        style={{padding: '2vh', 
                          border: '1px solid #DCDCDC', 
                          borderRadius: '5px', 
                          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
                        }} 
                        height="85vh" >
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
                            {start === "last" && 
                              <Typography 
                                variant="body2"
                                sx={{margin: 2}}
                                >Energy produced in the last 24 hours:
                              </Typography>
                            } 
                            {start === "next" &&
                              <Typography 
                                variant="body2"
                                sx={{margin: 2}}
                                >Predicted energy production in the next 24 hours:
                              </Typography>
                            }
                            <Typography 
                              variant="body2"
                              sx={{margin: 2}}
                              >Total production {totalProduction} kWh
                            </Typography>
                            {productionData.length > 0 &&
                              <BarChart
                                dataset={productionData}
                                yAxis={[{label: 'kWh'}]}
                                xAxis={[{scaleType: 'band', dataKey: 'hour', label: 'time (h)'}]}
                                series={[{dataKey: 'value', label: 'production (kWh)', color: '#59cae3'}]}
                                width={450}
                                height={350}
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
                            {start === "last" && 
                              <Typography 
                                variant="body2"
                                sx={{margin: 2}}
                                >Energy received from the electricity network in the last 24 hours:
                              </Typography>
                            }
                            {start === "next" && 
                              <Typography 
                                variant="body2"
                                sx={{margin: 2}}
                                >Prediction for energy received from the electricity network in the next 24 hours:
                              </Typography>
                            }
                            <Typography 
                              variant="body2"
                              sx={{margin: 2}}
                              >Total use of outside energy {totalProduction} kWh
                            </Typography>
                            {productionData.length > 0 &&
                              <BarChart
                                dataset={productionData}
                                yAxis={[{label: 'kWh'}]}
                                xAxis={[{scaleType: 'band', dataKey: 'hour', label: 'time (h)'}]}
                                series={[{dataKey: 'value', label: 'received energy (kWh)', color: '#59cae3'}]}
                                width={450}
                                height={350}
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
                            {start === "last" && 
                              <Typography 
                                variant="body2"
                                sx={{margin: 2}}
                                >Energy consumed in the last 24 hours:
                              </Typography>
                            } 
                            {start === "next" && 
                              <Typography 
                              variant="body2"
                              sx={{margin: 2}}
                              >Predicted energy consumption in the next 24 hours:
                            </Typography>
                            }
                            <Typography 
                              variant="body2"
                              sx={{margin: 2}}
                              >Total consumption {totalConsumption} kWh <br/>
                              Total price for consumed energy {(totalPrice/100).toFixed(2)} euros                     
                            </Typography>
                              {optimizedConsumption.length !== 24 && 
                                <BarChart
                                  dataset={consumptionData}
                                  yAxis={[{label: 'kWh'}]}
                                  xAxis={[{scaleType: 'band', dataKey: 'hour', label: 'time (h)'}]}
                                  series={[{dataKey: 'value', label: 'consumption (kWh)', color: '#59cae3'}]}
                                  width={450}
                                  height={350}
                                />
                              } 
                              {optimizedConsumption.length === 24 && 
                              <>
                                <Typography
                                  variant="body2"
                                  sx={{margin: 2}}>
                                    Total price with optimized consumption {(optimalPrice/100).toFixed(2)} euros<br/>
                                    Savings made with optimization {(savings).toFixed(2)} euros (-{((savings/(totalPrice/100))*100).toFixed(2)} %)
                                </Typography>
                                <div>
                                  <p>
                                    <span style={{'margin': 2, 'fontSize': '14px', 'color': 'transparent', 'textShadow': '0 0 0 #59cae3'}}>&#9899;</span>
                                    <span style={{'margin': 2, 'fontSize': '14px'}}>real consumption</span>
                                    <span style={{'margin': 2, 'fontSize': '14px', 'color': 'transparent', 'textShadow': '0 0 0 #4ea646'}}>&#9899;</span>
                                    <span style={{'margin': 2, 'fontSize': '14px'}}>optimized consumption</span>
                                    <span style={{'margin': 2, 'fontSize': '14px', 'color': 'transparent', 'textShadow': '0 0 0 red'}}>&#9899;</span>
                                    <span style={{'margin': 2, 'fontSize': '14px'}}>price</span>
                                  </p>
                                </div>
                                <ChartContainer
                                  series={chartData}
                                  width={450}
                                  height={350}
                                  xAxis={[
                                    {
                                      id: 'time (h)',
                                      data: timeData,
                                      scaleType: 'band',
                                      valueFormatter: (value) => value.toString(),
                                    },
                                  ]}
                                  yAxis={[
                                    {
                                      id: 'consumption (kWh)',
                                      scaleType: 'linear',
                                    },
                                    {
                                      id: 'price (cents/kWh)',
                                      scaleType: 'linear',
                                    }
                                  ]}
                                >
                                  <BarPlot />
                                  <LinePlot />
                                  <ChartsTooltip trigger='axis'/>
                                  <ChartsXAxis label="time (h)" position="bottom" axisId="time (h)" />
                                  <ChartsYAxis label="consumption (kWh)" position="left" axisId="consumption (kWh)" />
                                  <ChartsYAxis label="price (cents/kWh)" position="right" axisId="price (cents/kWh)" />
                                </ChartContainer>
                              </>
                              }
                          </>
                        }
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
    )
  } else {
    return <NotFound />
  }  
}

export default EnergyComponentPage;