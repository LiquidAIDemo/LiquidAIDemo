import { useState, useEffect } from 'react';
import { Button, FormControl, MenuItem, Select, Box } from '@mui/material';


let demoTime = new Date();
let demoPassedHours = 0;


function getDayName(date) {
  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var dayName = days[date.getDay()];
  return dayName;
}

function Clock() {
  let now = new Date();
  
  const [demoHour, setTime] = useState(now.getHours());
  const [demoDate, setDate] = useState(now.getDate());
  const [demoMonth, setMonth] = useState(now.getMonth() + 1);
  const [demoYear, setYear] = useState(now.getFullYear());

  const [isPaused, setIsPaused] = useState(false);

  // Default speed 1 sec
  const [speed, setSpeed] = useState(1000);
  const [start, setStart] = useState("next");

  // Support for real-time clock
  let now = new Date();

  let hh = now.getHours();
  let mm = now.getMinutes();
  let ss = now.getSeconds();

  // Units below 10 must have zero added to front
  if (hh < 10) {
    hh = "0" + hh;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  if (ss < 10) {
    ss = "0" + ss;
  }
  
  const realdate =  now.getDate() + "." + (now.getMonth() + 1) + "." + now.getFullYear();
  const realtime = hh + ":" + mm + ":" + ss;


  // Time runs from demo start fro 24 hours
  // speed depends on selected time value
  useEffect(() => {
    let intervalId;

    if (!isPaused) {
    
      intervalId = setInterval(() => {
        if (demoPassedHours < 24) {
          // add one hour to demotime object
          demoTime.setHours(demoTime.getHours() + 1);
          setDemoTime();
          demoPassedHours = demoPassedHours + 1;
        } 
        
        else {
          // stop the interval when demoPassedHours reaches 24
          togglePause();
        }
      }, speed);
    }

    return () => clearInterval(intervalId);

  }, [isPaused, speed, demoHour, demoDate]);


  const setDemoTime = () => {
    setTime(demoTime.getHours())
    setDate(demoTime.getDate())
    setMonth(demoTime.getMonth()+1)
    setYear(demoTime.getFullYear())
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
      setIsPaused(false)
    } 
    
    else if (selectedValue === "last") {
      demoTime = now
      demoTime.setDate(now.getDate() - 1)
      demoTime.setMinutes(0)
      demoPassedHours = 0
      setIsPaused(false)
    }

    setDemoTime();

  }

  // Select speed menu, demo time, pause button and real time
  return (
    <div>

      
        <p>
        Select speed:
        <null style={{ marginRight: '10px '}}/>
        <FormControl>
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
      
      <br/>
      <p/>
        Select time range: 
        <null style={{ marginRight: '10px '}}/>
        <FormControl>
          <Select
            
            value={start}
            onChange={handleStartingChange}
            sx={{width: '140px', height: '30px'}}
          >
            <MenuItem value={"next"}>Next 24h</MenuItem>
            <MenuItem value={"last"}>Last 24h</MenuItem>
          </Select>
        </FormControl>
      
      </p>

      <p>
      <b>Demo: </b>  {demoHour}:00, {getDayName(demoTime)}  {demoDate}.{demoMonth} &#x1F4C5;
      <br/>

      <Button 
        sx={{ height: '30px'}}
        variant="contained" 
        onClick={() => handleResetClick(start)}
      >
        {'Reset'}
      </Button>

      {
        demoPassedHours < 24 ? (
          <Button 
          sx={{ height: '30px'}}
          style={{ marginLeft: '10px '}}
          variant="outlined" onClick={togglePause}
          >
            {isPaused ? 'Continue' : 'Pause'}
          </Button>
        ) : null
      }
        
      </p>

      <b>Current : </b>  {realtime}, {getDayName(now)}  {now.getDate()}.{now.getMonth()+1} &#x1F4C5;

    </div>
  );
}

export default Clock;