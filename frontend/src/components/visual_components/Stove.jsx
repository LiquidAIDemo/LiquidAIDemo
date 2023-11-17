import stoveImage from "../../assets/stove.png";
import energyBorder from "../../assets/stove_energy.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react"
import EnergyComponent from "../EnergyComponent";
import { Popover } from '@mui/material';

const Stove = ({demoTime, demoStartTime}) => {

  const component = {
    id: "stove", 
    name: "Stove",
    type: "consumer",
    description: "Delicious meals are cooked on the stove.",
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
  return (
    <div>
      <img
        id="stove-energy"
        src={energyBorder}
        alt="energy"
        className="stove-energy-border"
        style={{
          position: 'absolute',
          top: '2.7%',
          left: '76.7%',
          width: '4%',
          height: '3.6%'
        }}
      />
      <img
        id="stove"
        src={stoveImage}
        alt='stove'
        className='stove-image'
        style={{
          position: 'absolute',
          top: '2.9%',
          left: '77%',
          width: '3.4%',
          height: '3%',
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

export default Stove;