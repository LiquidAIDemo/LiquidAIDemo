import freezerImage from "../../assets/freezer.png";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import EnergyComponent from "../EnergyComponent";
import { Popover } from '@mui/material';

const Freezer = ({demoTime}) => {

  const component = {
    id: "freezer", 
    name: "Freezer",
    type: "consumer",
    description: "Food stays cold in the freezer.",
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
        id="freezer"
        src={freezerImage}
        alt='freezer'
        className='freezer-image'
        style={{
          position: 'absolute',
          top: '8%',
          left: '62%',
          width: '10%',
          height: '13%',
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