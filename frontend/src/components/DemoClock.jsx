import { useState, useEffect } from "react";
import {
  Button,
  FormControl,
  MenuItem,
  Select,
  Box,
  Typography,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import RealtimeClock from "./RealtimeClock";

const theme = createTheme({
  palette: {
    water: {
      main: "#8BD4E2",
      light: "#a7dee7",
      dark: "#0eafc9",
      contrastText: "#000000",
    },
  },
  typography: {
    button: {
      textTransform: "none",
      fontWeight: "bolder",
    },
  },
});

function getDayName(date) {
  var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  var dayName = days[date.getDay()];
  return dayName;
}

function DemoClock({ demoTime, demoPassedHours, onDemoTimeChange }) {
  let now = new Date();
  const demoTimeDateObj = new Date(demoTime);
  const [demoPassedMinutes, setDemoPassedMinutes] = useState(0);

  const [isPaused, setIsPaused] = useState(
    window.sessionStorage.getItem("isDemoPaused") === "true" || true
  );

  // Default speed 1 hour/sec
  const [speed, setSpeed] = useState(
    window.sessionStorage.getItem("selectedSpeed") || 1000 / 6
  );
  const [start, setStart] = useState(
    window.sessionStorage.getItem("selectedStart") || "next"
  );

  const [passedTime, setPassedTime] = useState(
    window.sessionStorage.getItem("passedTime") || 0
  );

  // Time runs from demo start from 24 hours
  // speed depends on selected time value
  useEffect(() => {
    let intervalId;

    if (!isPaused) {
      intervalId = setInterval(() => {
        // initialize speed value to session storage
        setSpeed(speed);
        window.sessionStorage.setItem("selectedSpeed", speed);
        if (demoPassedHours === 0 && demoPassedMinutes === 0) {
          setPassedTime(0);
          window.sessionStorage.setItem("passedTime", 0);
        }
        // Increase hours while passed hours are low enough
        if (demoPassedHours < 24) {
          const newDemoTime = new Date(demoTime);
          if (demoPassedMinutes >= 50) {
            // add one hour to demotime object
            setDemoPassedMinutes(0);
            const newPassedHours = demoPassedHours + 1;
            newDemoTime.setHours(newDemoTime.getHours() + 1);
            onDemoTimeChange(newDemoTime, newPassedHours);
          } else {
            // Increase passed minutes by ten
            const newPassedMinutes = demoPassedMinutes + 10;
            setDemoPassedMinutes(newPassedMinutes);
          }
        } else {
          // stop the interval when demoPassedHours reaches 24
          setIsPaused(true);
          window.sessionStorage.setItem("isDemoPaused", true);
          setPassedTime(0);
          window.sessionStorage.setItem("passedTime", 0);
          window.sessionStorage.setItem("download", false);
          window.sessionStorage.setItem("upload", false);
        }
      }, speed);
    }

    return () => clearInterval(intervalId);
  }, [
    isPaused,
    speed,
    onDemoTimeChange,
    demoTime,
    demoPassedHours,
    demoPassedMinutes,
    passedTime,
  ]);

  const togglePause = () => {
    setIsPaused(!isPaused);
    window.sessionStorage.setItem("isDemoPaused", !isPaused);
  };

  const handleSpeedChange = (event) => {
    setSpeed(event.target.value);
    window.sessionStorage.setItem("selectedSpeed", event.target.value);
  };

  const handleResetClick = (selectedValue) => {
    // Create a new event object with the selected value
    const event = {
      target: { value: selectedValue },
    };

    // Call handleStartingChange with the new event object
    handleStartingChange(event);
    setPassedTime(0);
    window.sessionStorage.setItem("passedTime", 0);
    window.sessionStorage.setItem("download", false);
    window.sessionStorage.setItem("upload", false);
    setIsPaused(false);
    window.sessionStorage.setItem("isDemoPaused", false);
  };

  const handleStartingChange = (event) => {
    let selectedValue = event.target.value;
    setStart(selectedValue);
    window.sessionStorage.setItem("selectedStart", selectedValue);

    if (selectedValue === "next") {
      const newDemoTime = new Date();
      newDemoTime.setMinutes(0, 0);
      setDemoPassedMinutes(0);
      onDemoTimeChange(newDemoTime, 0);
      setIsPaused(true);
      window.sessionStorage.setItem("isDemoPaused", true);
    } else if (selectedValue === "last") {
      const newDemoTime = new Date();
      newDemoTime.setDate(now.getDate() - 1);
      newDemoTime.setMinutes(0, 0);
      setDemoPassedMinutes(0);
      onDemoTimeChange(newDemoTime, 0);
      setIsPaused(true);
      window.sessionStorage.setItem("isDemoPaused", true);
    }
  };


  // Select speed menu, demo time, pause button and real time
  return (
    <Box>
      <Typography
        style={{
          fontWeight: "bolder",
          marginLeft: "8px",
          marginTop: "8px",
          marginBottom: "8px",
        }}
      >
        Manage time
      </Typography>
      <div style={{ display: "flex" }}>
        <Box style={{ padding: "1vh" }}>
          Speed:
          <FormControl style={{ marginLeft: "10px " }}>
            <Select
              value={speed}
              onChange={handleSpeedChange}
              data-testid="speed"
              sx={{ width: "140px", height: "30px" }}
            >
              <MenuItem value={1000}>10 min / sec</MenuItem>
              <MenuItem value={1000 / 2}>20 min / sec</MenuItem>
              <MenuItem value={1000 / 3}>30 min / sec</MenuItem>
              <MenuItem value={1000 / 6}>1 hour / sec</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box style={{ padding: "1vh" }}>
          Time range:
          <FormControl style={{ marginLeft: "10px " }}>
            <Select
              value={start}
              onChange={handleStartingChange}
              data-testid="time_range"
              sx={{ width: "140px", height: "30px" }}
            >
              <MenuItem value={"next"}>Next 24 h</MenuItem>
              <MenuItem value={"last"}>Last 24 h</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>

      <Box style={{ padding: "1vh" }}>
        <RealtimeClock />
        <Box id="demotimebox">
          <b style={{ fontWeight: "normal" }}>Demo time:</b>{" "}
          {String(demoTimeDateObj.getHours()).padStart(2, "0")}:
          {String(demoPassedMinutes).padStart(2, "0")},{" "}
          {getDayName(demoTimeDateObj)} {demoTimeDateObj.getDate()}.
          {demoTimeDateObj.getMonth() + 1}. &#x1F4C5;
        </Box>
        <ThemeProvider theme={theme}>
          <Button
            variant="contained"
            color="water"
            sx={{ marginTop: "12px", borderRadius: 2 }}
            onClick={() => handleResetClick(start)}
            id="restart"
          >
            {demoPassedHours === 0 && demoPassedMinutes === 0 && isPaused ? "Start" : "Restart"}
          </Button>
        </ThemeProvider>
        {demoPassedHours < 24 && demoPassedHours > 0 || (demoPassedHours === 0 && demoPassedMinutes > 0) ? (
          <ThemeProvider theme={theme}>
            <Button
              variant="contained"
              color="water"
              sx={{ borderRadius: 2 }}
              style={{ marginLeft: "10px ", marginTop: "12px" }}
              onClick={togglePause}
              id="pause"
            >
              {isPaused ? "Continue" : "Pause"}
            </Button>
          </ThemeProvider>
        ) : null}
      </Box>
    </Box>
  );
}

export default DemoClock;
