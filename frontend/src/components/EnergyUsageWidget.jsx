import { Card, CardContent, CardActions, Typography } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import dataA from '../../../test_data/electricityPrices.json'
import dataB from '../../../test_data/energyComponents.json'

const EnergyUsageWidget = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const component = location.state.component;

	// Some functionality for displaying data here:
	let usagedata;
	let priceData;
	let usageData;
	
	let priceFileName = '../../../test_data/electricityPrices.json';
	let usageFileName = '../../../test_data/energyComponents.json';
	let namedata = "WIP";
	
	fetch(priceFileName)
	  .then((response) => response.json())
	  .then((json) => priceData = json)
	  .catch(error => console.error('JSON error: ', error ));
	  
	fetch(usageFileName)
	  .then((response) => response.text())
	  .then((json) => usageData = Object.keys(json)[0]);
	  
	//document.getElementById("pconsume").innerHTML = dataA;
	return(
		// Add something concrete here
		<div>
		
		</div>
	)
}

export default EnergyUsageWidget;