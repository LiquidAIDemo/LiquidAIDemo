import {
  Box,
  Button,
  Grid,
  Typography,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import ArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import DemoClock from "./DemoClock";
import ElectricityPrice from "./ElectricityPrice";
import backgroundImage from "./../assets/yard.png";
import roadImage from "./../assets/road.png";
import cabinImage from "./../assets/cabin.png";
import houseImage from "./../assets/house.png";
import InformationPage from "./InformationPage";
import HeatPump from "./visual_components/HeatPump";
import SolarPanel1 from "./visual_components/SolarPanel1";
import ElectricCar1 from "./visual_components/ElectricCar1";
import Freezer from "./visual_components/Freezer";
import Heater from "./visual_components/Heater";
import HotWaterHeater from "./visual_components/HotWaterHeater";
import Jacuzzi from "./visual_components/Jacuzzi";
import Optimizer from "./visual_components/Optimizer";
import ElectricCar2 from "./visual_components/ElectricCar2";
import Stove from "./visual_components/Stove";
import SolarPanel2 from "./visual_components/SolarPanel2";
import SolarPanel3 from "./visual_components/SolarPanel3";
import SolarPanel4 from "./visual_components/SolarPanel4";
import WashingMachine from "./visual_components/WashingMachine";
import ElectricBoard from "./visual_components/ElectricBoard";
import energyComponents from "../../test_data/energyComponents.json";

const theme = createTheme({
  palette: {
    water: {
      main: "#8BD4E2",
      light: "#a7dee7",
      dark: "#0eafc9",
      contrastText: "#000000",
    },
    black: {
      main: "#000000",
    },
  },
  typography: {
    button: {
      textTransform: "none",
      fontWeight: "bolder",
    },
  },
});

import { List, ListItemButton, ListItemText, Collapse } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

function useSessionStorageState(key, defaultValue) {
  // Initialize state with value from sessionStorage or the provided default value
  const [state, setState] = useState(() => {
    const savedState = window.sessionStorage.getItem(key);
    if (savedState) {
      return JSON.parse(savedState);
    } else {
      return defaultValue;
    }
  });

  const resetState = () => {
    setState(defaultValue);
    window.sessionStorage.setItem(key, JSON.stringify(defaultValue));
  };

  // Use useEffect to update sessionStorage when state changes
  useEffect(() => {
    window.sessionStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState, resetState];
}

const Demo = () => {
  const navigate = useNavigate();
  const [demoTime, setDemoTime] = useSessionStorageState(
    "demoTime",
    new Date().setMinutes(0, 0)
  );
  const [demoPassedHrs, setDemoPassedHrs] = useSessionStorageState(
    "demoPassedHours",
    0
  );
  const [demoStartTime, setDemoStartTime] = useSessionStorageState(
    "demoStartTime",
    new Date().setMinutes(0, 0)
  );
  const [openInformation, setOpenInformation] = useState(false);
  window.onpopstate = () => navigate("/");

  const handleDemoTimeChange = (time, hours) => {
    const hoursCopy = hours;
    const newDemoTime = new Date(time);
    setDemoTime(newDemoTime);
    setDemoPassedHrs(hoursCopy);

    // Outlines are checked hourly
    const tmphour = newDemoTime.getHours();
    hideAllOutlines(tmphour);

    if (demoPassedHrs == 0) {
      setDemoStartTime(demoTime);
    }
  };

  const hideAllOutlines = (eh) => {
    if (showElectricCar1) {
      hideOutlines(eh, "electric-car-1");
    }
    if (showElectricCar2) {
      hideOutlines(eh, "electric-car-2");
    }
    if (showSolarPanel1) {
      hideOutlines(eh, "solar-panel-1", true);
    }
    if (showSolarPanel2) {
      hideOutlines(eh, "solar-panel-2", true);
    }
    if (showSolarPanel3) {
      hideOutlines(eh, "solar-panel-3", true);
    }
    if (showSolarPanel4) {
      hideOutlines(eh, "solar-panel-4", true);
    }
    if (showHeatPump) {
      hideOutlines(eh, "heat-pump");
    }
    if (showFreezer) {
      hideOutlines(eh, "freezer");
    }
    if (showHotWaterHeater) {
      hideOutlines(eh, "hot-water-heater");
    }
    if (showHeater) {
      hideOutlines(eh, "heater");
    }
    if (showStove) {
      hideOutlines(eh, "stove");
    }
    if (showJacuzzi) {
      hideOutlines(eh, "jacuzzi");
    }
    if (showWashingMachine) {
      hideOutlines(eh, "washing-machine");
    }
    if (showElectricBoard) {
      hideOutlines(eh, "electric-board", true);
    }
  };

  const hideOutlines = (eh, where, productive) => {
    if (productive === undefined) {
      productive = false;
    }

    var edge;
    if (where == "electric-car-1") {
      edge = document.getElementById("electric-car-energy-1");
    } else if (where == "electric-car-2") {
      edge = document.getElementById("electric-car-energy-2");
    } else if (where == "heat-pump") {
      edge = document.getElementById("heat-pump-energy");
    } else if (where == "solar-panel-1") {
      edge = document.getElementById("solar-panel-energy-1");
    } else if (where == "solar-panel-2") {
      edge = document.getElementById("solar-panel-energy-2");
    } else if (where == "solar-panel-3") {
      edge = document.getElementById("solar-panel-energy-3");
    } else if (where == "solar-panel-4") {
      edge = document.getElementById("solar-panel-energy-4");
    } else if (where == "freezer") {
      edge = document.getElementById("freezer-energy");
    } else if (where == "heater") {
      edge = document.getElementById("heater-energy");
    } else if (where == "hot-water-heater") {
      edge = document.getElementById("hot-water-heater-energy");
    } else if (where == "jacuzzi") {
      edge = document.getElementById("jacuzzi-energy");
    } else if (where == "stove") {
      edge = document.getElementById("stove-energy");
    } else if (where == "washing-machine") {
      edge = document.getElementById("washing-machine-energy");
    } else if (where == "electric-board") {
      edge = document.getElementById("electric-board-energy");
    }

    // Data from the component is needed
    const outlineComponent = energyComponents.components.filter(
      (c) => c.id === where
    )[0];
    var demoHour = eh;
    var hourlyCons;
    var hourlyProd;

    // Check if component produces energy or consumes it
    try {
      if (productive == false) {
        var consumptionData = outlineComponent.consumption_per_hour_kwh;
        consumptionData.forEach((h) => {
          h.startHour = new Date(h.startDate).getHours();
        });
        hourlyCons = consumptionData
          .filter((eh) => eh.startHour === demoHour)
          .map((eh) => eh.value)[0];

        if (hourlyCons < 0.001) {
          window.sessionStorage.setItem(where, "0.0");
        } else if (hourlyCons < 1) {
          window.sessionStorage.setItem(where, "0.5");
        } else {
          window.sessionStorage.setItem(where, "1.0");
        }
      } else if (where === "electric-board") {
        if (netConsumption.length === 24) {
          hourlyProd = netConsumption
            .filter((eh) => eh.startHour === demoHour)
            .map((eh) => eh.value)[0];
          if (hourlyProd < 0.001) {
            window.sessionStorage.setItem(where, "0.0");
          } else if (hourlyProd < 5) {
            window.sessionStorage.setItem(where, "0.5");
          } else {
            window.sessionStorage.setItem(where, "1.0");
          }
        }
      } else {
        var productionData = outlineComponent.production_per_hour_kwh;
        if (productionData.length > 0) {
          productionData.forEach((h) => {
            h.startHour = new Date(h.startDate).getHours();
          });
        }
        hourlyProd = productionData
          .filter((eh) => eh.startHour === demoHour)
          .map((eh) => eh.value)[0];
        if (hourlyProd < 0.001) {
          edge.style.opacity = "0.0";
        } else if (hourlyProd < 0.1) {
          edge.style.opacity = "0.5";
        } else {
          edge.style.opacity = "1.0";
        }
      }
    } catch (e) {
      // Issue encountered
      console.log(e.message, "hideOutlines has issues with:", where);
    }
  };

  const [open, setOpen] = useState(false);

  const handleReset = () => {
    // Reset all visibility to default
    setShowHeatPump(true);
    setShowElectricBoard(true);
    setShowElectricCar1(true);
    setShowElectricCar2(true);
    setShowFreezer(true);
    setShowHeater(true);
    setShowHotWaterHeater(true);
    setShowJacuzzi(true);
    setShowSolarPanel1(true);
    setShowSolarPanel2(true);
    setShowSolarPanel3(true);
    setShowSolarPanel4(true);
    setShowStove(true);
    setShowWashingMachine(true);
  };
  const handleClear = () => {
    // clearing all components
    setShowHeatPump(false);
    setShowElectricBoard(false);
    setShowElectricCar1(false);
    setShowElectricCar2(false);
    setShowFreezer(false);
    setShowHeater(false);
    setShowHotWaterHeater(false);
    setShowJacuzzi(false);
    setShowSolarPanel1(false);
    setShowSolarPanel2(false);
    setShowSolarPanel3(false);
    setShowSolarPanel4(false);
    setShowStove(false);
    setShowWashingMachine(false);
  };

  const handleClick = () => {
    setOpen(!open);
  };

  // values from visual component visibility
  const [showHeatPump, setShowHeatPump] = useSessionStorageState(
    "showHeatPump", true
  );
  const [showElectricBoard, setShowElectricBoard] = useSessionStorageState(
    "showElectricBoard", true
  );
  const [showElectricCar1, setShowElectricCar1] = useSessionStorageState(
    "showElectricCar1", true
  );
  const [showElectricCar2, setShowElectricCar2] = useSessionStorageState(
    "showElectricCar2", true
  );
  const [showFreezer, setShowFreezer] = useSessionStorageState(
    "showFreezer", true
  );
  const [showHeater, setShowHeater] = useSessionStorageState(
    "showHeater", true
  );
  const [showHotWaterHeater, setShowHotWaterHeater] = useSessionStorageState(
    "showHotWaterHeater", true
  );
  const [showJacuzzi, setShowJacuzzi] = useSessionStorageState(
    "showJacuzzi", true
  );
  const [showOptimizer] = useSessionStorageState("showOptimizer", true);
  const [showSolarPanel1, setShowSolarPanel1] = useSessionStorageState(
    "showSolarPanel1", true
  );
  const [showSolarPanel2, setShowSolarPanel2] = useSessionStorageState(
    "showSolarPanel2", true
  );
  const [showSolarPanel3, setShowSolarPanel3] = useSessionStorageState(
    "showSolarPanel3", true
  );
  const [showSolarPanel4, setShowSolarPanel4] = useSessionStorageState(
    "showSolarPanel4", true
  );
  const [showStove, setShowStove] = useSessionStorageState(
    "showStove", true
  );
  const [showWashingMachine, setShowWashingMachine] = useSessionStorageState(
    "showWashingMachine", true
  );

  const visibilityValues = [
    { id: "heat-pump", visibility: showHeatPump },
    { id: "electric-board", visibility: showElectricBoard },
    { id: "electric-car-1", visibility: showElectricCar1 },
    { id: "electric-car-2", visibility: showElectricCar2 },
    { id: "fridge&freezer", visibility: showFreezer },
    { id: "heater", visibility: showHeater },
    { id: "hot-water-heater", visibility: showHotWaterHeater },
    { id: "jacuzzi", visibility: showJacuzzi },
    { id: "optimizer", visibility: showOptimizer },
    { id: "solar-panel-1", visibility: showSolarPanel1 },
    { id: "solar-panel-2", visibility: showSolarPanel2 },
    { id: "solar-panel-3", visibility: showSolarPanel3 },
    { id: "solar-panel-4", visibility: showSolarPanel4 },
    { id: "stove", visibility: showStove },
    { id: "washing-machine", visibility: showWashingMachine },
  ];

  const visibleComponents = visibilityValues.filter(
    (c) => c.visibility === true
  );

  const componentData = energyComponents.components;
  const consumingComponents = componentData
    .filter((c) => c.consumption_per_hour_kwh.length > 0)
    .filter((c) => visibleComponents.findIndex((v) => v.id === c.id) !== -1);
  const producingComponents = componentData
    .filter((c) => c.production_per_hour_kwh.length > 0)
    .filter((c) => visibleComponents.findIndex((v) => v.id === c.id) !== -1);

  let totalConsumption = [];
  let totalProduction = [];
  let netConsumption = [];

  for (let i = 0; i <= 23; i++) {
    totalConsumption.push({ hour: i, value: 0 });
  }

  for (let i = 0; i <= 23; i++) {
    totalProduction.push({ hour: i, value: 0 });
  }

  for (let i = 0; i <= 23; i++) {
    netConsumption.push({ startHour: i, value: 0 });
  }

  consumingComponents.forEach((c) => {
    const data = c.consumption_per_hour_kwh;
    data.forEach((d) => {
      const hour = new Date(d.startDate).getHours();
      const consumptionHour = totalConsumption.find((obj) => obj.hour === hour);
      consumptionHour.value += d.value;
    });
  });

  producingComponents.forEach((c) => {
    const data = c.production_per_hour_kwh;
    data.forEach((d) => {
      const hour = new Date(d.startDate).getHours();
      const productionHour = totalProduction.find((obj) => obj.hour === hour);
      productionHour.value += d.value;
    });
  });

  netConsumption.forEach((h) => {
    const hourConsumption = totalConsumption.find(
      (obj) => obj.hour === h.startHour
    );
    const hourProduction = totalProduction.find(
      (obj) => obj.hour === h.startHour
    );
    h.value = (hourConsumption.value - hourProduction.value).toFixed(2);
  });

  const [download, setDownload] = useState(
    window.sessionStorage.getItem("download") || false
  );
  const [upload, setUpload] = useState(
    window.sessionStorage.getItem("upload") || false
  );
  const speed = window.sessionStorage.getItem("selectedSpeed");
  const isPaused = window.sessionStorage.getItem("isDemoPaused") === "true";
  const passedTime = window.sessionStorage.getItem("passedTime");
  const [nextDownloadIn, setNextDownloadIn] = useState(
    window.sessionStorage.getItem("nextDownloadIn") || 0
  );

  const hoursLeft = 23 - demoPassedHrs;
  const maxSeconds = (144 * speed) / 1000;
  const secondsPerHour = maxSeconds / 24;
  const timeLeft = hoursLeft * secondsPerHour;

  useEffect(() => {
    let intervalId;
    if (!isPaused && timeLeft > 0) {
      intervalId = setInterval(() => {
        if (passedTime === 0 || passedTime % 5 === 0) {
          setDownload(true);
          setUpload(false);
          window.sessionStorage.setItem("download", true);
          window.sessionStorage.setItem("upload", false);
          setNextDownloadIn(5);
          window.sessionStorage.setItem("nextDownloadIn", 5);
        } else if (passedTime === 1 || passedTime % 5 === 1) {
          setDownload(false);
          setUpload(true);
          window.sessionStorage.setItem("download", false);
          window.sessionStorage.setItem("upload", true);
          setNextDownloadIn(4);
          window.sessionStorage.setItem("nextDownloadIn", 4);
        } else {
          setDownload(false);
          setUpload(false);
          window.sessionStorage.setItem("download", false);
          window.sessionStorage.setItem("upload", false);
          setNextDownloadIn(parseInt(nextDownloadIn) - 1);
          window.sessionStorage.setItem(
            "nextDownloadIn",
            parseInt(nextDownloadIn) - 1
          );
        }
        window.sessionStorage.setItem("passedTime", parseInt(passedTime) + 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setDownload(false);
      setUpload(false);
      window.sessionStorage.setItem("download", false);
      window.sessionStorage.setItem("upload", false);
      window.sessionStorage.setItem("nextDownloadIn", 0);
      window.sessionStorage.setItem("passedTime", 0);
    }
    return () => clearInterval(intervalId);
  }, [isPaused, download, upload, passedTime, timeLeft, nextDownloadIn]);

  return (
    <div>
      <div
        style={{
          position: "relative",
          top: 20,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            position: "absolute",
            top: "-10px",
            left: "22px",
            zIndex: 1,
            fontWeight: "bold",
          }}
          >
          Energy Optimizer
        </Typography>
        <ThemeProvider theme={theme}>
          <Button
            variant="contained"
            color="water"
            startIcon={<ArrowLeftIcon />}
            sx={{ borderRadius: 2, left: "22px", marginTop: "25px" }}
            onClick={() => navigate("/")}
          >
            Back
          </Button>
        </ThemeProvider>
        <ThemeProvider theme={theme}>
          <Button
            variant="contained"
            color="water"
            sx={{
              borderRadius: 2,
              position: "absolute",
              marginTop: "25px",
              right: "23px",
              width: "130px",
            }}
            onClick={() => setOpenInformation(true)}
          >
            Information
          </Button>
        </ThemeProvider>
        <InformationPage
          openInformation={openInformation}
          setOpenInformation={setOpenInformation}
        />
        <Grid container spacing={4} columns={5} style={{ paddingRight: "3vh", paddingLeft: "3vh" }}>
          <Grid item xs={12} sm={3} minWidth={"77vh"}>
            <Box>
              <div
                style={{
                  position: "relative",
                  marginTop: "15px",
                  paddingBottom: "83%",
                  width: "100%",
                  height: 0,
                }}
              >
                <img
                  src={backgroundImage}
                  alt="Home yard"
                  className="background-image"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "94.4%",
                    objectFit: "cover",
                    border: "1px solid #DCDCDC",
                    borderRadius: "5px",
                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
                  }}
                />
                <div
                  className="overlay-content"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <img
                    src={roadImage}
                    alt="Road"
                    className="road-image"
                    style={{
                      position: "absolute",
                      top: "54%",
                      left: "47%",
                      width: "47.5%",
                      height: "40.655%",
                    }}
                  />
                  <img
                    src={cabinImage}
                    alt="Cabin"
                    className="cabin-image"
                    style={{
                      position: "absolute",
                      top: "67%",
                      left: "5%",
                      width: "30%",
                      height: "25%",
                    }}
                  />
                  <img
                    src={houseImage}
                    alt="House"
                    className="house-image"
                    style={{
                      position: "absolute",
                      top: "2%",
                      left: "5%",
                      width: "90%",
                      height: "55%",
                    }}
                  />
                  <div>
                    {/*Energy components inside the house*/}
                    {showHeatPump && (
                      <HeatPump
                        demoTime={demoTime}
                        demoStartTime={demoStartTime}
                      />
                    )}
                    {showElectricBoard && (
                      <ElectricBoard
                        demoTime={demoTime}
                        netConsumption={netConsumption}
                        visibleComponents={visibleComponents}
                        demoStartTime={demoStartTime}
                      />
                    )}
                    {showFreezer && (
                      <Freezer
                        demoTime={demoTime}
                        demoStartTime={demoStartTime}
                      />
                    )}
                    {showHeater && (
                      <Heater
                        demoTime={demoTime}
                        demoStartTime={demoStartTime}
                      />
                    )}
                    {showHotWaterHeater && (
                      <HotWaterHeater
                        demoTime={demoTime}
                        demoStartTime={demoStartTime}
                      />
                    )}
                    {showJacuzzi && (
                      <Jacuzzi
                        demoTime={demoTime}
                        demoStartTime={demoStartTime}
                      />
                    )}
                    {showStove && (
                      <Stove
                        demoTime={demoTime}
                        demoStartTime={demoStartTime}
                      />
                    )}
                    {showWashingMachine && (
                      <WashingMachine
                        demoTime={demoTime}
                        demoStartTime={demoStartTime}
                      />
                    )}
                    {showOptimizer && (
                      <Optimizer
                        demoTime={demoTime}
                        demoStartTime={demoStartTime}
                      />
                    )}
                  </div>
                  {/*Energy components outside the house*/}
                  {showSolarPanel1 && (
                    <SolarPanel1
                      demoTime={demoTime}
                      demoStartTime={demoStartTime}
                    />
                  )}
                  {showSolarPanel2 && (
                    <SolarPanel2
                      demoTime={demoTime}
                      demoStartTime={demoStartTime}
                    />
                  )}
                  {showSolarPanel3 && (
                    <SolarPanel3
                      demoTime={demoTime}
                      demoStartTime={demoStartTime}
                    />
                  )}
                  {showSolarPanel4 && (
                    <SolarPanel4
                      demoTime={demoTime}
                      demoStartTime={demoStartTime}
                    />
                  )}
                  {showElectricCar1 && (
                    <ElectricCar1
                      demoTime={demoTime}
                      demoStartTime={demoStartTime}
                    />
                  )}
                  {showElectricCar2 && (
                    <ElectricCar2
                      demoTime={demoTime}
                      demoStartTime={demoStartTime}
                    />
                  )}
                </div>
              </div>
            </Box>
          </Grid>
          <Grid item xs={2} style={{ position: "relative", marginTop: "15px", }}>
            <Grid container spacing={1.5} columns={1}>
              <Grid item xs={1} paddingBottom="50px">
                <Box>
                  <List
                    sx={{ width: "94.5%", bgcolor: "background.paper" }}
                    style={{
                      position: "absolute",
                      zIndex: 1000,
                      border: "1px solid #DCDCDC",
                      borderRadius: "5px",
                      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
                      paddingBottom: "0px",
                      paddingTop: "0px",
                    }}
                  >
                    <ListItemButton
                      onClick={handleClick}
                      sx={{ width: "100%" }}
                    >
                      <ListItemText
                        primary={
                          <Typography style={{ fontWeight: "bolder" }}>
                            Manage components
                          </Typography>
                        }
                      />
                      {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                      <List component="div">
                        <Grid container spacing={2}>
                          <Grid
                            sx={{ marginLeft: "40px", marginRight: "35px" }}
                          >
                            <FormGroup>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={showHeatPump}
                                    onChange={() =>
                                      setShowHeatPump(!showHeatPump)
                                    }
                                    id="heatPumpCheckbox"
                                    sx={{
                                      "&.Mui-checked": {
                                        color: theme.palette.water.main,
                                      },
                                    }}
                                  />
                                }
                                label="Heat pump"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={showElectricBoard}
                                    onChange={() =>
                                      setShowElectricBoard(!showElectricBoard)
                                    }
                                    id="electricBoardCheckbox"
                                    sx={{
                                      "&.Mui-checked": {
                                        color: theme.palette.water.main,
                                      },
                                    }}
                                  />
                                }
                                label="Electric board"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={showFreezer}
                                    onChange={() =>
                                      setShowFreezer(!showFreezer)
                                    }
                                    id="freezerCheckbox"
                                    sx={{
                                      "&.Mui-checked": {
                                        color: theme.palette.water.main,
                                      },
                                    }}
                                  />
                                }
                                label="Fridge & freezer"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={showHeater}
                                    onChange={() => setShowHeater(!showHeater)}
                                    id="heaterCheckbox"
                                    sx={{
                                      "&.Mui-checked": {
                                        color: theme.palette.water.main,
                                      },
                                    }}
                                  />
                                }
                                label="Heater"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={showHotWaterHeater}
                                    onChange={() =>
                                      setShowHotWaterHeater(!showHotWaterHeater)
                                    }
                                    id="hotWaterHeaterCheckbox"
                                    sx={{
                                      "&.Mui-checked": {
                                        color: theme.palette.water.main,
                                      },
                                    }}
                                  />
                                }
                                label="Hot water heater"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={showStove}
                                    onChange={() => setShowStove(!showStove)}
                                    id="stoveCheckbox"
                                    sx={{
                                      "&.Mui-checked": {
                                        color: theme.palette.water.main,
                                      },
                                    }}
                                  />
                                }
                                label="Stove"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={showWashingMachine}
                                    onChange={() =>
                                      setShowWashingMachine(!showWashingMachine)
                                    }
                                    id="washingMachineCheckbox"
                                    sx={{
                                      "&.Mui-checked": {
                                        color: theme.palette.water.main,
                                      },
                                    }}
                                  />
                                }
                                label="Washing machine"
                              />
                            </FormGroup>
                          </Grid>
                          <Grid
                            sx={{ marginLeft: "40px", marginRight: "35px" }}
                          >
                            <FormGroup>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={showElectricCar1}
                                    onChange={() =>
                                      setShowElectricCar1(!showElectricCar1)
                                    }
                                    id="electricCar1Checkbox"
                                    sx={{
                                      "&.Mui-checked": {
                                        color: theme.palette.water.main,
                                      },
                                    }}
                                  />
                                }
                                label="Electric car 1"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={showElectricCar2}
                                    onChange={() =>
                                      setShowElectricCar2(!showElectricCar2)
                                    }
                                    id="electricCar2Checkbox"
                                    sx={{
                                      "&.Mui-checked": {
                                        color: theme.palette.water.main,
                                      },
                                    }}
                                  />
                                }
                                label="Electric car 2"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={showSolarPanel1}
                                    onChange={() =>
                                      setShowSolarPanel1(!showSolarPanel1)
                                    }
                                    id="solarPanel1Checkbox"
                                    sx={{
                                      "&.Mui-checked": {
                                        color: theme.palette.water.main,
                                      },
                                    }}
                                  />
                                }
                                label="Solar panel 1"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={showSolarPanel2}
                                    onChange={() =>
                                      setShowSolarPanel2(!showSolarPanel2)
                                    }
                                    id="solarPanel2Checkbox"
                                    sx={{
                                      "&.Mui-checked": {
                                        color: theme.palette.water.main,
                                      },
                                    }}
                                  />
                                }
                                label="Solar panel 2"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={showSolarPanel3}
                                    onChange={() =>
                                      setShowSolarPanel3(!showSolarPanel3)
                                    }
                                    id="solarPanel3Checkbox"
                                    sx={{
                                      "&.Mui-checked": {
                                        color: theme.palette.water.main,
                                      },
                                    }}
                                  />
                                }
                                label="Solar panel 3"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={showSolarPanel4}
                                    onChange={() =>
                                      setShowSolarPanel4(!showSolarPanel4)
                                    }
                                    id="solarPanel4Checkbox"
                                    sx={{
                                      "&.Mui-checked": {
                                        color: theme.palette.water.main,
                                      },
                                    }}
                                  />
                                }
                                label="Solar panel 4"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={showJacuzzi}
                                    onChange={() =>
                                      setShowJacuzzi(!showJacuzzi)
                                    }
                                    id="jacuzziCheckbox"
                                    sx={{
                                      "&.Mui-checked": {
                                        color: theme.palette.water.main,
                                      },
                                    }}
                                  />
                                }
                                label="Jacuzzi"
                              />
                            </FormGroup>
                            <ThemeProvider theme={theme}>
                              <Button
                                style={{
                                  marginLeft: "15px ",
                                  marginBottom: "5px",
                                }}
                                onClick={handleReset}
                                variant="contained"
                                color="water"
                                id="selectAll"
                              >
                                Select all
                              </Button>
                            </ThemeProvider>
                            <ThemeProvider theme={theme}>
                              <Button
                                style={{
                                  marginLeft: "15px ",
                                  marginBottom: "5px",
                                }}
                                onClick={handleClear}
                                variant="contained"
                                color="water"
                                id="clearAll"
                              >
                                Clear all
                              </Button>
                            </ThemeProvider>
                          </Grid>
                        </Grid>
                      </List>
                    </Collapse>
                  </List>
                </Box>
              </Grid>
              <Grid item xs={1} minWidth="50vh">
                <Box
                  style={{
                    padding: "1vh",
                    border: "1px solid #DCDCDC",
                    borderRadius: "5px",
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                  }}
                  height="auto"
                  overflow="hidden"
                >
                  <Box>
                    <DemoClock
                      demoTime={demoTime}
                      demoPassedHours={demoPassedHrs}
                      onDemoTimeChange={handleDemoTimeChange}
                    />
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={1} minWidth="50vh">
                <Box
                  style={{
                    padding: "2vh",
                    border: "1px solid #DCDCDC",
                    borderRadius: "5px",
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                  }}
                  height="45vh"
                  overflow="hidden"
                >
                  <ElectricityPrice
                  demoTime={demoTime}
                  demoPassedHrs={parseInt(demoPassedHrs)}
                  totalConsumption={totalConsumption}
                  />
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Demo;
