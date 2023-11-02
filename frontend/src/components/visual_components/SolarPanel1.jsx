import solarPanelImage from "../../assets/solar_panel.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react"
import EnergyComponent from "../EnergyComponent";
import { Popover } from '@mui/material';

const SolarPanel1 = ({demoTime}) => {

  const navigate = useNavigate();
  
  const handleClick = (id, component) =>
    navigate(`/component/${id}`, 
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

  return (
    <div>
      <img
        id="solar-panel-1"
        src={solarPanelImage}
        alt='solarPanel'
        className='solar-panel-image-1'
        style={{
          position: 'absolute',
          top: '66%',
          left: '7%',
          width: '10%',
          height: '10%'
        }}
        onClick={() => handleClick("solar-panel-1", {
          id: "solar-panel-1", 
          name: "Solar panel 1",
          type: "producer",
          description: "Solar panels turn sunlight into energy",
          demoTime: {demoTime}
        })}
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
          onClose={handleHoverOn}
          disableRestoreFocus
        >     
          <EnergyComponent 
            id="solar-panel-1"
            name="Solar panel 1"
            type="producer"
            description="Solar panels turn sunlight into energy"
            demoTime={demoTime}
            />
        </Popover>  
    </div>

  )
}

export default SolarPanel1;