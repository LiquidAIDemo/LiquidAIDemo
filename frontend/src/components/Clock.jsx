import { useState, useEffect } from 'react';

function Clock() {
  //Time starts at 0
  const [time, setTime] = useState(0);

  //Time runs from 0 to 24 continually
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime((time) => (time + 1) % 24);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  //Prints every hour
  return (
    <div>
      <p>{time}:00 time running</p>
    </div>
  );
}

export default Clock;