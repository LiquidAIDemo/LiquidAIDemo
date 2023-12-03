import airHeatPumpImage from "../../assets/air_heat_pump.png";
import energyBorder from "../../assets/air_heat_pump_energy.png";
import downloadIcon from "../../assets/download.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import EnergyComponent from "../EnergyComponent";
import { Popover } from "@mui/material";

const HeatPump = ({ demoTime, demoStartTime }) => {
  const component = {
    id: "heat-pump",
    name: "Heat pump",
    type: "consumer",
    nature: "constant",
    description:
      "Heat pump is used to adjust the temperature inside the house.",
    demoTime: {demoTime},
    demoStartTime: {demoStartTime},
    optimize: true
  }

  const [anchorEl, setAnchorEl] = useState(null);

  const navigate = useNavigate();

  const upload = window.sessionStorage.getItem("upload") === "true";

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
        id="heat-pump-energy"
        src={energyBorder}
        alt="energy"
        className="heat-pump-energy-border"
        style={{
          position: "absolute",
          top: "33%",
          left: "37%",
          width: "2.5%",
          height: "9%",
          opacity: window.sessionStorage.getItem(component.id),
        }}
      />
      <img
        id="heat-pump"
        src={airHeatPumpImage}
        alt="heatPump"
        className="air-heat-pump"
        style={{
          position: "absolute",
          top: "33.5%",
          left: "37.1%",
          width: "2%",
          height: "8%",
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
      {upload && (
        <img
          id="download-icon"
          src={downloadIcon}
          alt="download-icon"
          className="download-icon"
          style={{
            position: "absolute",
            top: "33.1%",
            left: "36.5%",
            width: "2.5%",
            height: "2.5%",
          }}
        />
      )}
    </div>
  );
};

export default HeatPump;
