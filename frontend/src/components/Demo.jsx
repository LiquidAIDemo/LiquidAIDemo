import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";

const Demo = () => {
  const navigate = useNavigate();

  // replace return statement with demo page contents
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
          Demo page will be here
      </Typography>
      <Button 
        variant="contained"
        onClick={() => navigate("/")}
        >
        Go back
      </Button>
    </Box>
  )
}

export default Demo;