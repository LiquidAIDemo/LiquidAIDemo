import { useState, useEffect } from 'react';
import { Button, FormControl, MenuItem, Select, Box } from '@mui/material';

function Clock() {
  // Time starts at 0
  const [time, setTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  // Default speed 1 sec
  const [speed, setSpeed] = useState(1000);

  let now = new Date();
  let hh = now.getHours();
  let mm = now.getMinutes();
  let ss = now.getSeconds();
  
  const realtime = hh + ":" + mm + ":" + ss;
  
  // Time runs from 0 to 24 continually,
  // speed depend on selected time value
  useEffect(() => {
    let intervalId;

    if (!isPaused) {
      intervalId = setInterval(() => {
        setTime((time) => (time + 1) % 24);
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

      <p>Demo time: {time}:00 <Button
        variant="text"
        onClick={togglePause}
        >
          {isPaused ? 'Continue' : 'Pause'}
        </Button>
        </p>
        
      <p>Real time: {realtime}</p>
    </div>
  );
}

export default Clock;