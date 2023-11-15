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
let demoPassedMinutes = 0;

function getDayName(date) {
  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var dayName = days[date.getDay()];
  return dayName;
}

function DemoClock({demoTime, demoPassedHours, onDemoTimeChange}) {
  let now = new Date();
  const demoTimeDateObj = new Date(demoTime)
  const [demoHour, setTime] = useState(now.getHours());
  const [demoMinute, setTimeMinutes] = useState(now.getMinutes());
  const [demoDate, setDate] = useState(now.getDate());
  const [demoMonth, setMonth] = useState(now.getMonth() + 1);
  // const [demoYear, setYear] = useState(now.getFullYear());

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
        // Increase hours while passed hours are low enough
        if (demoPassedHours < 24) {
          const newDemoTime = new Date(demoTime);
          if (demoPassedMinutes >= 59) {
            // add one hour to demotime object
            const newPassedHours = demoPassedHours + 1;
            newDemoTime.setHours(newDemoTime.getHours() + 1);
            onDemoTimeChange(newDemoTime, newPassedHours);
          } else {
            // Increase minutes by ten
            const newPassedMinutes = demoPassedMinutes + 10;
            demoTime.setMinutes(demoTime.getMinutes() + 10);
            newDemoTime.setMinutes(newDemoTime.getMinutes() + 10);
            onDemoTimeChange(newDemoTime, newPassedMinutes);
            
            // This line should be necessary, but on the contrary, it breaks the function
            //demoPassedMinutes = demoPassedMinutes + 10; 
          }
        }
        else {
          // stop the interval when demoPassedHours reaches 24
          togglePause();
        }
      }, (speed));
    }

    return () => clearInterval(intervalId);

  }, [isPaused, speed, demoHour, demoDate, onDemoTimeChange]);

  /*
  const setDemoTime = () => {
    var chour = demoTime.getHours();
    var cmin = demoTime.getMinutes();
  
    setTimeMinutes(cmin);
    
    if (chour < 10) {
      setTime("0" + chour);
    } else {
      setTime(chour);
    }
    
    if (cmin < 10) {
      setTimeMinutes("0" + cmin);
    } else {
      setTimeMinutes(cmin);
    }
    
    setDate(demoTime.getDate())
    setMonth(demoTime.getMonth()+1)
    // setYear(demoTime.getFullYear())
    
  }
  
  const addZeroes = () => {
    var chour = demoTime.getHours();
    if (chour < 10) {
      demoHour = 1;
    }
    
    demominute = 200;
  }
  */

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
            <MenuItem value={1000}>10 min / sec</MenuItem>
            <MenuItem value={500}>20 min / sec</MenuItem>
            <MenuItem value={150}>30 min / sec</MenuItem>
            <MenuItem value={100}>1 hour / sec</MenuItem>
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
        <b>Demo: </b> {demoTimeDateObj.getHours()}:{demoTimeDateObj.getMinutes()}, {getDayName(demoTimeDateObj)} {demoTimeDateObj.getDate()}.{demoTimeDateObj.getMonth()+1}. &#x1F4C5;
          <br/>
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
} //<b>DEBUG phours, pmin: </b> {demoPassedHours}, {demoPassedMinutes} &#x1F4C5;

export default DemoClock;
