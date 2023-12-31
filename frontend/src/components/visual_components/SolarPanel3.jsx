import solarPanelImage from "../../assets/solar_panel.png";
import energyBorder from "../../assets/solar_panel_energy.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import EnergyComponent from "../EnergyComponent";
import { Popover } from "@mui/material";

const SolarPanel3 = ({ demoTime, demoStartTime }) => {
  const component = {
    id: "solar-panel-3",
    name: "Solar panel 3",
    type: "producer",
    description: "Solar panels turn sunlight into energy.",
    demoTime: { demoTime },
    demoStartTime: { demoStartTime },
  };

  const navigate = useNavigate();

  const handleClick = () =>
    navigate(`/component/${component.id}`, {
      state: { component: component },
      replace: true,
    });

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
        id="solar-panel-energy-3"
        src={energyBorder}
        alt="energy"
        className="solar-panel-energy-border"
        style={{
          position: "absolute",
          top: "80.5%",
          left: "7%",
          width: "12%",
          height: "10%",
          opacity: window.sessionStorage.getItem(component.id),
        }}
      />
      <img
        id="solar-panel-3"
        src={solarPanelImage}
        alt="solarPanel"
        className="solar-panel-image-3"
        style={{
          position: "absolute",
          top: "81%",
          left: "7.5%",
          width: "11%",
          height: "9%",
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
        onClose={handleHoverOn}
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

export default SolarPanel3;
