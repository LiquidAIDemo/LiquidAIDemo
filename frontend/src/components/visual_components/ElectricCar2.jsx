import carImage from "../../assets/car.png";
import energyBorder from "../../assets/car_energy.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react"
import EnergyComponent from "../EnergyComponent";
import { Popover } from '@mui/material';

const ElectricCar2 = ({demoTime}) => {

  const component = {
    id: "electric-car-2", 
    name: "Electric car 2",
    type: "consumer",
    description: "Electric car is charged at the charging station.",
    demoTime: {demoTime}
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
        id="electric-car-energy"
        src={energyBorder}
        alt="energy"
        className="electric-car-energy-border"
        style={{
          position: 'absolute',
          top: '58%',
          left: '82.4%',
          width: '11%',
          height: '29%',
        }}
      />
      <img
        id="electric-car-2"
        src={carImage}
        alt='car'
        className='car-image-2'
        style={{
          position: 'absolute',
          top: '59%',
          left: '83%',
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
    </div>
  )
}

export default ElectricCar2;