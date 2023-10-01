import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh'
    }}>
      <Typography 
        variant="h5"
        sx={{
          margin: 5
        }}>
        Welcome to Liquid AI demo!
      </Typography>
      <Button variant="contained"
        onClick={() => navigate("/demo")}
        >
        Start demo
      </Button>
    </Box>
  );
}

export default Home;