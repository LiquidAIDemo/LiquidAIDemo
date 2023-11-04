import electricBoardImage from "../../assets/electric_board.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react"
import EnergyComponent from "../EnergyComponent";
import { Popover } from '@mui/material';

const ElectricBoard = ({demoTime}) => {

  const component = {
    id: "heater", 
    name: "Heater",
    type: "consumer",
    description: "Heater warms up the sauna.",
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
        id="electric-board"
        src={electricBoardImage}
        alt='electricBoard'
        className='electric-board-image'
        style={{
          position: 'absolute',
          top: '44%',
          left: '88.6%',
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

export default ElectricBoard;