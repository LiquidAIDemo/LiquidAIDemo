import electricBoardImage from "../../assets/electric_board.png";
import energyBorder from "../../assets/electric_board_energy.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react"
import EnergyComponent from "../EnergyComponent";
import { Popover } from '@mui/material';

const ElectricBoard = ({demoTime, netConsumption}) => {

  const component = {
    id: "electric-board", 
    name: "Electric board",
    type: "producer",
    description: "Electric board represents electricity coming from outside the house \
      to balance energy production and consumption.",
    demoTime: {demoTime},
    netConsumption: {netConsumption}
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
        id="electric-board-energy"
        src={energyBorder}
        alt="energy"
        className="electric-board-energy-border"
        style={{
          position: 'absolute',
          top: '37.5%',
          left: '56.8%',
          width: '1.8%',
          height: '6%',
        }}
      />
      <img
        id="electric-board"
        src={electricBoardImage}
        alt='electricBoard'
        className='electric-board-image'
        style={{
          position: 'absolute',
          top: '38%',
          left: '56.9%',
          width: '1.5%',
          height: '5%',
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

export default ElectricBoard;