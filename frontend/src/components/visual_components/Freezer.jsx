import freezerImage from "../../assets/freezer.png";
import energyBorder from "../../assets/freezer_energy.png";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import EnergyComponent from "../EnergyComponent";
import { Popover } from '@mui/material';

const Freezer = ({demoTime, demoStartTime}) => {

  const component = {
    id: "freezer", 
    name: "Fridge & Freezer",
    type: "consumer",
    description: "Food stays cold in the fridge and freezer.",
    demoTime: {demoTime},
    demoStartTime: {demoStartTime},
    optimize: false
  }

  const [anchorEl, setAnchorEl] = useState(null);

  const navigate = useNavigate();

  const handleClick = () =>
    navigate(`/component/${component.id}`, 
      {
        state: {component: component},
        replace: true
      }
  )
  
  const handleHoverOn = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleHoverAway = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      <img
        id="freezer-energy"
        src={energyBorder}
        alt="energy"
        className="freezer-energy-border"
        style={{
          position: 'absolute',
          top: '8.5%',
          left: '63.6%',
          width: '4.5%',
          height: '11%',
        }}
      />
      <img
        id="freezer"
        src={freezerImage}
        alt='freezer'
        className='freezer-image'
        style={{
          position: 'absolute',
          top: '9%',
          left: '63.8%',
          width: '4%',
          height: '10%',
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

export default Freezer;