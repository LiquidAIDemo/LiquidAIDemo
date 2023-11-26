import optimizerImage from "../../assets/optimizer.png";
import optimizerBorder from "../../assets/optimizer_border.png";
import downloadIcon from "../../assets/download.png";
import uploadIcon from "../../assets/upload.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react"
import EnergyComponent from "../EnergyComponent";
import { Popover } from '@mui/material';

const Optimizer = ({demoTime, demoStartTime}) => {

  const component = {
    id: "optimizer", 
    name: "Optimizer",
    type: "optimizer",
    description: "Optimizer downloads information from the internet\
      and gives instructions to other components so that they can\
      optimize their energy consumption.",
    demoTime: {demoTime},
    demoStartTime: {demoStartTime}
  }

  const [anchorEl, setAnchorEl] = useState(null);

  const navigate = useNavigate();

  const download = localStorage.getItem('download') === 'true';
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

  return (
    <div>
      <img
      id="optimizer-border"
      src={optimizerBorder}
      alt="border"
      className="optimizer-border"
      style={{
          position: 'absolute',
          top: '43.8%',
          left: '88.4%',
          width: '5%',
          height: '4.5%',
      }}
      />
      <img
          id="optimizer"
          src={optimizerImage}
          alt='optimizer'
          className='optimizer-image'
          style={{
          position: 'absolute',
          top: '44.25%',
          left: '89%',
          width: '4%',
          height: '3.5%',
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
      {download && 
        <img
          id="download-icon"
          src={downloadIcon}
          alt="download-icon"
          className="download-icon"
          style={{
            position: 'absolute',
            top: '43.8%',
            left: '88%',
            width: '2.5%',
            height: '2.5%',
          }}
        />
      }
      {upload && 
        <img
          id="upload-icon"
          src={uploadIcon}
          alt="upload-icon"
          className="upload-icon"
          style={{
            position: 'absolute',
            top: '46%',
            left: '88%',
            width: '2.5%',
            height: '2.5%',
          }}
        />
      }
      
    </div>
  )
}

export default Optimizer;