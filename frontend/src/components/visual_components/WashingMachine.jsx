import washingMachineImage from "../../assets/washing_machine.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react"
import EnergyComponent from "../EnergyComponent";
import { Popover } from '@mui/material';

const WashingMachine = ({demoTime}) => {

  const component = {
    id: "washing-machine", 
    name: "Washing machine",
    type: "consumer",
    description: "Washing machine turns dirty laundry clean in just a moment.",
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
        id="washing-machine"
        src={washingMachineImage}
        alt='washingMachine'
        className='washing-machine-image'
        style={{
          position: 'absolute',
          top: '22.5%',
          left: '28.4%',
          width: '5%',
          height: '4.5%',
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

export default WashingMachine;