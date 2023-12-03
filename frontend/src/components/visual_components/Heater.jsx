import heaterImage from "../../assets/heater.png";
import energyBorder from "../../assets/heater_energy.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import EnergyComponent from "../EnergyComponent";
import { Popover } from "@mui/material";

const Heater = ({ demoTime, demoStartTime }) => {
  const component = {
    id: "heater",
    name: "Heater",
    type: "consumer",
    nature: "constant",
    description: "Heater warms up the sauna.",
    demoTime: { demoTime },
    demoStartTime: { demoStartTime },
    optimize: false,
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const navigate = useNavigate();

  const handleClick = () =>
    navigate(`/component/${component.id}`, {
      state: { component: component },
      replace: true,
    });

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
        id="heater-energy"
        src={energyBorder}
        alt="energy"
        className="heater-energy-border"
        style={{
          position: "absolute",
          top: "8.3%",
          left: "21%",
          width: "3.5%",
          height: "4%",
          opacity: window.sessionStorage.getItem(component.id),
        }}
      />
      <img
        id="heater"
        src={heaterImage}
        alt="heater"
        className="heater-image"
        style={{
          position: "absolute",
          top: "8.5%",
          left: "21.25%",
          width: "3%",
          height: "3.5%",
        }}
        onClick={handleClick}
        onMouseEnter={handleHoverOn}
        onMouseLeave={handleHoverAway}
      />
      <Popover
        sx={{ pointerEvents: "none" }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
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
    </div>
  );
};

export default Heater;
