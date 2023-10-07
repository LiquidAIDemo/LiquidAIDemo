import { useState, useEffect } from 'react';
import Button from '@mui/material';

function Clock() {
  //Time starts at 0
  const [time, setTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

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
    </div>
  );
}

export default Clock;