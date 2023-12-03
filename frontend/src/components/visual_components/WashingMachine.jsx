import washingMachineImage from "../../assets/washing_machine.png";
import energyBorder from "../../assets/washing_machine_energy.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import EnergyComponent from "../EnergyComponent";
import { Popover } from "@mui/material";

const WashingMachine = ({ demoTime, demoStartTime }) => {
  const component = {
    id: "washing-machine",
    name: "Washing machine",
    type: "consumer",
    nature: "manual",
    description: "Washing machine turns dirty laundry clean in just a moment.",
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
        id="washing-machine-energy"
        src={energyBorder}
        alt="energy"
        className="washing-machine-energy-border"
        style={{
          position: "absolute",
          top: "22.8%",
          left: "28.2%",
          width: "4.8%",
          height: "4.8%",
          opacity: window.sessionStorage.getItem(component.id),
        }}
      />
      <img
        id="washing-machine"
        src={washingMachineImage}
        alt="washingMachine"
        className="washing-machine-image"
        style={{
          position: "absolute",
          top: "23.1%",
          left: "28.6%",
          width: "4%",
          height: "4%",
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

export default WashingMachine;
