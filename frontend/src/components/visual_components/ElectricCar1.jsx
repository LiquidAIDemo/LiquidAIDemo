import carImage from "../../assets/car.png";
import energyBorder from "../../assets/car_energy.png";
import chargingPoint from "../../assets/charging_point.png";
import downloadIcon from "../../assets/download.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react"
import EnergyComponent from "../EnergyComponent";
import { Popover } from '@mui/material';

const ElectricCar1 = ({demoTime, demoStartTime}) => {

  const component = {
    id: "electric-car-1", 
    name: "Electric car 1",
    type: "consumer",
    description: "Electric car is charged at the charging station.",
    demoTime: {demoTime},
    demoStartTime: {demoStartTime}
  }

  const navigate = useNavigate();
  
  const handleClick = () =>
    navigate(`/component/${component.id}`, 
      {
        state: {component: component},
        replace: true
      }
  )
  
  const [anchorEl, setAnchorEl] = useState(null);
  
  const handleHoverOn = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleHoverAway = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return(
    <div>
      <img
        id="electric-car-energy-1"
        src={energyBorder}
        alt="energy"
        className="electric-car-energy-border"
        style={{
          position: 'absolute',
          top: '58.5%',
          left: '70.4%',
          width: '11%',
          height: '29%',
        }}
      />
      <img
        id="charging-point"
        src={chargingPoint}
        alt="charging-point"
        className="charging-point"
        style={{
          position: 'absolute',
          top: '56.5%',
          left: '75%',
          width: '3%',
          height: '4%',
        }}
      />
      <img
        id="electric-car-1"
        src={carImage}
        alt='car'
        className='car-image-1'
        style={{
          position: 'absolute',
          top: '59.5%',
          left: '71%',
          width: '10%',
          height: '27%'
        }}
        onClick={handleClick}
        onMouseEnter={handleHoverOn}
        onMouseLeave={handleHoverAway}
      />
      <Popover
        sx={{pointerEvents: 'none'}}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handleHoverAway}
        disableRestoreFocus
      >                
        <EnergyComponent 
          id={component.id}
          name={component.name}
          type={component.type}
          description={component.description}
          demoTime={demoTime}
          />
      </Popover>
      <img
        id="download-icon"
        src={downloadIcon}
        alt="download-icon"
        className="download-icon"
        style={{
          position: 'absolute',
          top: '59.5%',
          left: '71%',
          width: '3%',
          height: '3%',
        }}
      />
    </div>
  )
}

export default ElectricCar1;