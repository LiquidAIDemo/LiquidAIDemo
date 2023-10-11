import { useState, useEffect } from 'react';
import { Button, FormControl, MenuItem, Select, Box } from '@mui/material';

function Clock() {
  let now = new Date();
  let day = now.getDate();
  let month = now.getMonth() + 1;
  let year = now.getFullYear();
  let hh = now.getHours();
  let mm = now.getMinutes();
  let ss = now.getSeconds();

  // Time starts at 0
  const [time, setTime] = useState(hh);
  const [date, setDate] = useState(day);
  const [isPaused, setIsPaused] = useState(false);
  // Default speed 1 sec
  const [speed, setSpeed] = useState(1000);
  
  const realdate =  day + "." + month + "." + year;
  const realtime = hh + ":" + mm + ":" + ss;
  
  // Time runs from 0 to 24 continually,
  // speed depend on selected time value
  useEffect(() => {
    let intervalId;

    if (!isPaused) {
      intervalId = setInterval(() => {
        setTime((hh) => (hh + 1) % 24);
        }, speed);
    }

    return () => clearInterval(intervalId);
  }, [isPaused, speed]);

  const togglePause = () => {
    setIsPaused((isPaused) => !isPaused)
  };

  const handleSpeedChange = (event) => {
    setSpeed(event.target.value);
  };

  const handleStartingChange = (event) => {
    let selectedValue = event.target.value;
    if (selectedValue === 1) {
      setDate(day);
    } else if (selectedValue === 2) {
      setDate(day - 1);
    }
    setTime(hh);
  }

  // Select speed menu, demo time, pause button and real time
  return (
    <div>
      <Box display="flex" alignItems="center">
        <p style={{ marginRight: '10px '}}>Select speed: </p>
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
      </Box>

      <Box display="flex" alignItems="center">
        <p style={{ marginRight: '10px '}}>Select time range: </p>
        <FormControl>
          <Select
            
            value={time}
            onChange={handleStartingChange}
            sx={{width: '140px', height: '30px'}}
          >
            <MenuItem value={1}>Next 24h</MenuItem>
            <MenuItem value={2}>Last 24h</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <p>Demo date: {date}.{month}.{year} Demo time: {time}:00 <Button
        variant="text"
        onClick={togglePause}
        >
          {isPaused ? 'Continue' : 'Pause'}
        </Button>
        </p>
        
      <p>Date: {realdate} Time: {realtime}</p>
    </div>
  );
}

export default Clock;