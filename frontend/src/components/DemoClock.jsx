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

//let demoTime = new Date();
//let demoPassedHours = 0;

function getDayName(date) {
  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var dayName = days[date.getDay()];
  return dayName;
}

function DemoClock({onDemoTimeChange, onPassedHrsChange}) {
  let now = new Date();

  const [demoTime, setDemoTime] = useState(new Date())
  const [demoPassedHours, setDemoPassedHours] = useState(0)

  const [isPaused, setIsPaused] = useState(false);
  
  // Default speed 1 sec
  const [speed, setSpeed] = useState(1000);
  const [start, setStart] = useState("next");

  useEffect(() => {
    const savedDemoTime = window.sessionStorage.getItem('demoTime');
    const savedPassedHours = window.sessionStorage.getItem('demoPassedHours');
    //const savedIsPaused = window.sessionStorage.getItem('isPaused');

    if (savedDemoTime && savedPassedHours) {
      setDemoTime(new Date(savedDemoTime));
      setDemoPassedHours(parseInt(savedPassedHours));
      //setIsPaused(JSON.parse(window.sessionStorage.getItem('isPaused')));
    }
  }, []);
  
  //console.log(window.sessionStorage, JSON.parse(window.sessionStorage.getItem('isPaused')))
  //console.log(demoTime, demoPassedHours, isPaused)
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
          newDemoTime.setHours(demoTime.getHours() + 1);
          setDemoTime(newDemoTime);
          setDemoPassedHours(newPassedHours);
          //window.sessionStorage.setItem('demoTime', newDemoTime)
          //window.sessionStorage.setItem('demoPassedHours', JSON.stringify(newPassedHours))
          //window.sessionStorage.setItem('isPaused', JSON.stringify(isPaused))
          onDemoTimeChange(newDemoTime);
          onPassedHrsChange(newPassedHours)
        }
        else {
          // stop the interval when demoPassedHours reaches 24
          console.log("toggle toglle toggle")
          togglePause();
        }
      }, speed);
    }

    return () => clearInterval(intervalId);

  }, [isPaused, speed, demoTime, demoPassedHours, onDemoTimeChange, onPassedHrsChange]);

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
      setDemoTime(newDemoTime);
      setDemoPassedHours(0);
      setIsPaused(false);
      onDemoTimeChange(newDemoTime);
    } 
    
    else if (selectedValue === "last") {
      const newDemoTime = new Date();
      newDemoTime.setDate(now.getDate() - 1);
      demoTime.setMinutes(0);
      setDemoTime(newDemoTime);
      setDemoPassedHours(0);
      setIsPaused(false);
      onDemoTimeChange(newDemoTime);
    }

    //setDemoTime();
    onPassedHrsChange(0);

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
        <b>Demo: </b> {demoTime.getHours()}:00, {getDayName(demoTime)} {demoTime.getDate()}.{demoTime.getMonth()}. &#x1F4C5;
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
