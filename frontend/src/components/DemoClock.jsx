import { useState, useEffect } from 'react';
import { Button, FormControl, MenuItem, Select, Box } from '@mui/material';

let demoTime = new Date();
let demoPassedHours = 0;
let demoPassedMinutes = 0;

function getDayName(date) {
  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var dayName = days[date.getDay()];
  return dayName;
}

function DemoClock({onDemoTimeChange}) {
  let now = new Date();
  
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
        if (demoPassedHours < 24) {
          // add one hour to demotime object
          // But only if minutes are high enough
          if (demoPassedMinutes >= 59) {
            // Increase hour by one, set minute back to zero
            demoTime.setHours(demoTime.getHours() + 1);
            demoTime.setMinutes(0);
            setDemoTime();
            onDemoTimeChange(demoTime);
            
            demoPassedHours = demoPassedHours + 1;
            demoPassedMinutes = 0;
          } else {
            // Increase minute by one
            demoTime.setMinutes(demoTime.getMinutes() + 1);
            setDemoTime();
            onDemoTimeChange(demoTime);
            
            demoPassedMinutes = demoPassedMinutes + 1;
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


  const setDemoTime = () => {
    setTime(demoTime.getHours())
    setTimeMinutes(demoTime.getMinutes())
    setDate(demoTime.getDate())
    setMonth(demoTime.getMonth()+1)
    // setYear(demoTime.getFullYear())
  }


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
      demoTime = now
      demoTime.setMinutes(0)
      
      demoPassedHours = 0
      demoPassedMinutes = 0
      setIsPaused(false)
    } 
    
    else if (selectedValue === "last") {
      demoTime = now
      demoTime.setDate(now.getDate() - 1)
      demoTime.setMinutes(0)

      demoPassedHours = 0
      demoPassedMinutes = 0
      setIsPaused(false)
    }

    setDemoTime();
    onDemoTimeChange(demoTime);

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
            <MenuItem value={20}>30 min / sec</MenuItem>
            <MenuItem value={5}>40 min / sec</MenuItem>
            <MenuItem value={2}>50 min / sec</MenuItem>
            <MenuItem value={1}>60 min / sec</MenuItem>
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
        <b>Demo: </b> {demoHour}:{demoMinute}, {getDayName(demoTime)} {demoDate}.{demoMonth}. &#x1F4C5;
        <br/>
        
        <b>DEBUG phours, pmin: </b> {demoPassedHours}, {demoPassedMinutes} &#x1F4C5;
        <br/>

        <Button
          sx={{ height: '30px' }}
          variant="contained"
          onClick={() => handleResetClick(start)}
        >
          {'Restart'}
        </Button>
        {
          demoPassedHours < 24 ? (
            <Button
              sx={{height: '30px'}}
              style={{ marginLeft: '10px '}}
              variant="outlined" onClick={togglePause}
            >
              {isPaused ? 'Continue' : 'Pause'}
            </Button>
          ) : null
        }
      </Box>
    </Box>
  );
}

export default DemoClock;
