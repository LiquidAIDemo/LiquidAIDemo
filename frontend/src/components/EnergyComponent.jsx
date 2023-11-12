import { Card, CardContent, Typography } from '@mui/material';
import energyComponents from "../../../test_data/energyComponents.json";

const EnergyComponent = (props) => {
  const { id, name, type, description, demoTime, netConsumption } = props;
  const component = {
    id: id,
    name: name,
    type: type,
    description: description,
    demoTime: demoTime,
    netConsumption: netConsumption
  }
  const componentData = energyComponents.components.filter(c => c.id === component.id)[0];
  let productionData = []
  let consumptionData = [];
  let totalProduction = 0;
  let totalConsumption = 0;
  let ownProduction = 0;

  const demoHour = demoTime.getHours()

  if (component.type === "consumer") {
    consumptionData = componentData.consumption_per_hour_kwh
    consumptionData.forEach(h => {
      h.startHour = new Date(h.startDate).getHours()
    });
    totalConsumption = consumptionData.reduce((a, b) => {return a + b.value}, 0).toFixed(2);
  } else if (component.type === "producer") {
    productionData = componentData.production_per_hour_kwh
    if (productionData.length > 0) {
      productionData.forEach(h => {
        h.startHour = new Date(h.startDate).getHours()
      })
      totalProduction = productionData.reduce((a, b) => {return a + b.value}, 0).toFixed(2);
    } else if (component.id === "electric-board") {
      const consumingComponents = energyComponents.components.filter(c => c.consumption_per_hour_kwh.length > 0);
      consumingComponents.forEach(c => {
        const componentConsumption = c.consumption_per_hour_kwh.reduce((a, b) => a + b.value, 0);
        totalConsumption += componentConsumption;
      })
      const producingComponents = energyComponents.components.filter(c => c.production_per_hour_kwh.length > 0);
      producingComponents.forEach(c => {
        const componentProduction = c.production_per_hour_kwh.reduce((a, b) => a + b.value, 0);
        ownProduction += componentProduction;
      })
      totalProduction = (totalConsumption - ownProduction).toFixed(2);
    }
  }  
  
  return (
    
    <Card sx={{
      maxWidth: '500px',
      minWidth: '250px',
      minHeight: '20%',
      padding: '0.5vh'
      }}>
      <CardContent sx={{margin: 0}}>
        {type === "consumer" &&
        <>
          <Typography variant='body2' sx={{marginBottom: 1}}>
            <strong>{name}</strong> (Energy consumer)<br/>
          </Typography>  
          <Typography variant='body2' sx={{marginBottom: 1}}>
            Energy consumed between {demoHour}:00-{parseInt(demoHour)+1}:00<br/>
            {consumptionData.filter(h => h.startHour === demoHour).map(h => h.value)[0]} kWh<br/>
            Total consumption during the demo {totalConsumption} kWh
          </Typography>
        </> } 
        {type === "producer" && component.id !== "electric-board" &&
        <>
          <Typography variant='body2' sx={{marginBottom: 1}}>
            <strong>{name}</strong> (Energy producer)<br/>
          </Typography>  
          <Typography variant='body2' sx={{marginBottom: 1}}>
            Energy produced between {demoHour}:00-{parseInt(demoHour)+1}:00<br/>
            {productionData.filter(h => h.startHour === demoHour).map(h => h.value)[0]} kWh <br/>
            Total production during the demo {totalProduction} kWh
          </Typography>
        </> }
        {component.id === "electric-board" && component.netConsumption !== undefined &&
          <>
          <Typography variant='body2' sx={{marginBottom: 1}}>
            <strong>{name}</strong> (Energy producer)<br/>
          </Typography>  
          <Typography variant='body2' sx={{marginBottom: 1}}>
            Energy produced between {demoHour}:00-{parseInt(demoHour)+1}:00<br/>
            {component.netConsumption.filter(h => h.startHour === demoHour).map(h => h.value)[0]} kWh <br/>
            Total production during the demo {totalProduction} kWh
          </Typography>
        </> }
        <Typography variant='body2'>
          Click the component for more info
        </Typography>
      </CardContent>
    </Card>
  )
}

export default EnergyComponent;