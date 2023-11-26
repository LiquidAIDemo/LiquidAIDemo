import hotWaterHeaterImage from "../../assets/hot_water_heater.png";
import energyBorder from "../../assets/hot_water_heater_energy.png";
import downloadIcon from "../../assets/download.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react"
import EnergyComponent from "../EnergyComponent";
import { Popover } from '@mui/material';

const HotWaterHeater = ({demoTime, demoStartTime}) => {

  const component = {
    id: "hot-water-heater", 
    name: "Hot water heater",
    type: "consumer",
    description: "Hot water heater stores hot water for the shower.",
    demoTime: {demoTime},
    demoStartTime: {demoStartTime},
    optimize: true
  }

  const [anchorEl, setAnchorEl] = useState(null);

  const navigate = useNavigate();

  const upload = localStorage.getItem('upload') === 'true';

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
        id="hot-water-heater-energy"
        src={energyBorder}
        alt="energy"
        className="hot-water-heater-energy-border"
        style={{
          position: 'absolute',
          top: '22.5%',
          left: '21%',
          width: '3.7%',
          height: '4.7%',
        }}
      />
      <img
        id="hot-water-heater"
        src={hotWaterHeaterImage}
        alt='hotWaterHeater'
        className='hot-water-heater-image'
        style={{
          position: 'absolute',
          top: '22.8%',
          left: '21.3%',
          width: '3%',
          height: '4%',
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
            demoStartTime={demoStartTime}
            />
        </Popover>  
      {upload &&
        <img
          id="download-icon"
          src={downloadIcon}
          alt="download-icon"
          className="download-icon"
          style={{
            position: 'absolute',
            top: '22%',
            left: '20.5%',
            width: '2.5%',
            height: '2.5%',
          }}
        />
      }
      
    </div>
  )
}

export default HotWaterHeater;