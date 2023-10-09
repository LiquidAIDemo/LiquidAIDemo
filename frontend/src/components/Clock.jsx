import { useState, useEffect } from 'react';
import {Button} from '@mui/material';

function Clock() {
  //Time starts at 0
  const [time, setTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  let now = new Date();
  let hh = now.getHours();
  let mm = now.getMinutes();
  let ss = now.getSeconds();
  
  const realtime = hh + ":" + mm + ":" + ss;
  
  //Time runs from 0 to 24 continually
  useEffect(() => {
    let intervalId;

    if (!isPaused) {
      intervalId = setInterval(() => {
        setTime((time) => (time + 1) % 24);
        }, 1000);
    }
    

    return () => clearInterval(intervalId);
  }, [isPaused]);

  const togglePause = () => {
    setIsPaused((isPaused) => !isPaused)
  }

  //Prints every hour and a button that pauses the time
  return (
    <div>
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