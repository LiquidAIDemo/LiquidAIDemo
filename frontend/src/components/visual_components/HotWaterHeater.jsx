import hotWaterHeaterImage from "../../assets/hot_water_heater.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react"
import EnergyComponent from "../EnergyComponent";
import { Popover } from '@mui/material';

const HotWaterHeater = ({demoTime}) => {

  const component = {
    id: "hot-water-heater", 
    name: "Hot water heater",
    type: "consumer",
    description: "Hot water heater stores hot water for the shower.",
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

  return(
    <div>
      <img
        id="hot-water-heater"
        src={hotWaterHeaterImage}
        alt='hotWaterHeater'
        className='hot-water-heater-image'
        style={{
          position: 'absolute',
          top: '20%',
          left: '19%',
          width: '8%',
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

export default HotWaterHeater;