import airHeatPumpImage from "../../assets/air_heat_pump.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react"
import EnergyComponent from "../EnergyComponent";
import { Popover } from '@mui/material';

const HeatPump = ({demoTime}) => {

  const component = {
    id: "heat-pump", 
    name: "Heat pump",
    type: "consumer",
    description: "Heat pump is used to adjust the temperature inside the house.",
    demoTime: {demoTime}
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
      id="heat-pump"
      src={airHeatPumpImage}
      alt='heatPump'
      className='air-heat-pump'
      style={{
        position: 'absolute',
        top: '34%',
        left: '38%',
        width: '2%',
        height: '8%',
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

export default HeatPump;