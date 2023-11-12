import { useState, useEffect } from 'react';
import { Button, FormControl, MenuItem, Select, Box } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    water: {
      main: '#8BD4E2',
      light: '#a7dee7',
      dark: '#0eafc9',
      contrastText: '#000000',
    },
  },
  typography: {
    button: {
      textTransform: 'none',
      fontWeight: 'bolder',
    }
  }
});

function getDayName(date) {
  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var dayName = days[date.getDay()];
  return dayName;
}

function DemoClock({demoTime, demoPassedHours, onDemoTimeChange}) {
  let now = new Date();
  const demoTimeDateObj = new Date(demoTime)

  const [isPaused, setIsPaused] = useState(false);
  
  // Default speed 1 sec
  const [speed, setSpeed] = useState(1000);
  const [start, setStart] = useState("next");
  
  // Time runs from demo start fro 24 hours
  // speed depends on selected time value
  useEffect(() => {
    let intervalId;

    if (!isPaused) {
    
      intervalId = setInterval(() => {
        if (demoPassedHours < 24) {
          // add one hour to demotime object
          const newDemoTime = new Date(demoTime);
          const newPassedHours = demoPassedHours + 1;
          newDemoTime.setHours(newDemoTime.getHours() + 1);
          onDemoTimeChange(newDemoTime, newPassedHours);
        }
        else {
          // stop the interval when demoPassedHours reaches 24
          togglePause();
        }
      }, speed);
    }

    return () => clearInterval(intervalId);
    

  }, [isPaused, speed, onDemoTimeChange, demoTime, demoPassedHours]);

  const togglePause = () => {
    setIsPaused((isPaused) => !isPaused)
  };

  const handleSpeedChange = (event) => {
    setSpeed(event.target.value);
  };

  const handleResetClick = (selectedValue) => {
    // Create a new event object with the selected value
    const event = {
      target: { value: selectedValue },
    };
  
    // Call handleStartingChange with the new event object
    handleStartingChange(event);
  };

  const handleStartingChange = (event) => {
    let selectedValue = event.target.value;
    setStart(selectedValue);

    if (selectedValue === "next") {
      const newDemoTime = new Date();
      newDemoTime.setMinutes(0, 0);
      onDemoTimeChange(newDemoTime, 0);
      setIsPaused(false);
    } 
    
    else if (selectedValue === "last") {
      const newDemoTime = new Date();
      newDemoTime.setDate(now.getDate() - 1);
      newDemoTime.setMinutes(0, 0);
      onDemoTimeChange(newDemoTime, 0);
      setIsPaused(false);
    }
  }

  // Select speed menu, demo time, pause button and real time
  return (
    <Box>
      <Box style={{padding: '1vh'}}>
        Select speed:
        <FormControl style={{ marginLeft: '10px '}}>
          <Select
            defaultValue={1}
            value={speed}
            onChange={handleSpeedChange}
            sx={{width: '140px', height: '30px'}}
          >
            <MenuItem value={1000}>1 sec / hour</MenuItem>
            <MenuItem value={2000}>2 secs / hour</MenuItem>
            <MenuItem value={3000}>3 secs / hour</MenuItem>
            <MenuItem value={4000}>4 secs / hour</MenuItem>
            <MenuItem value={5000}>5 secs / hour</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box style={{padding: '1vh'}}>
        Select time range:
        <FormControl style={{ marginLeft: '10px '}}>
          <Select
            value={start}
            onChange={handleStartingChange}
            sx={{width: '140px', height: '30px'}}
          >
            <MenuItem value={"next"}>Next 24h</MenuItem>
            <MenuItem value={"last"}>Last 24h</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box style={{padding: '1vh'}}>
        <b>Demo: </b> {demoTimeDateObj.getHours()}:00, {getDayName(demoTimeDateObj)} {demoTimeDateObj.getDate()}.{demoTimeDateObj.getMonth()+1}. &#x1F4C5;
        <br/>

        <ThemeProvider theme={theme}>
          <Button variant="contained" color="water" sx={{ borderRadius: 2}} onClick={() => handleResetClick(start)}>
            restart
          </Button>
        </ThemeProvider>
        {
          demoPassedHours < 24 ? (
            <ThemeProvider theme={theme}>
              <Button variant="contained" color="water" sx={{ borderRadius: 2}} 
                      style={{ marginLeft: '10px '}} onClick={togglePause}>
                {isPaused ? 'continue' : 'pause'}
              </Button>
            </ThemeProvider>
          ) : null
        }
      </Box>
    </Box>
  );
}

export default DemoClock;
