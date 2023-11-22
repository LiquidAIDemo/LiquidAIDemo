import jacuzziImage from "../../assets/jacuzzi.png";
import energyBorder from "../../assets/jacuzzi_energy.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react"
import EnergyComponent from "../EnergyComponent";
import { Popover } from '@mui/material';

const Jacuzzi = ({demoTime, demoStartTime}) => {

  const component = {
    id: "jacuzzi", 
    name: "Jacuzzi",
    type: "consumer",
    description: "Jacuzzi has an efficient heating system to warm up the water.",
    demoTime: {demoTime},
    demoStartTime: {demoStartTime}
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
        id="jacuzzi-energy"
        src={energyBorder}
        alt="energy"
        className="jacuzzi-energy-border"
        style={{
          position: 'absolute',
          top: '3.5%',
          left: '6.2%',
          width: '11%',
          height: '13%',
        }}
      />
      <img
        id="jacuzzi"
        src={jacuzziImage}
        alt='jacuzzi'
        className='jacuzzi-image'
        style={{
          position: 'absolute',
          top: '4%',
          left: '6.7%',
          width: '10%',
          height: '12%',
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

export default Jacuzzi;