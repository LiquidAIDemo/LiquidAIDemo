import solarPanelImage from "../../assets/solar_panel.png";
import energyBorder from "../../assets/solar_panel_energy.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react"
import EnergyComponent from "../EnergyComponent";
import { Popover } from '@mui/material';

const SolarPanel4 = ({demoTime}) => {

  const component = {
    id: "solar-panel-4", 
    name: "Solar panel 4",
    type: "producer",
    description: "Solar panels turn sunlight into energy.",
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

  return (
    <div>
      <img
        id="solar-panel-energy"
        src={energyBorder}
        alt="energy"
        className="solar-panel-energy-border"
        style={{
          position: 'absolute',
          top: '76.5%',
          left: '18.9%',
          width: '12%',
          height: '10%'
        }}
      />
      <img
        id="solar-panel-4"
        src={solarPanelImage}
        alt='solarPanel'
        className='solar-panel-image-4'
        style={{
          position: 'absolute',
          top: '77%',
          left: '19.5%',
          width: '11%',
          height: '9%'
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
          onClose={handleHoverOn}
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

export default SolarPanel4;