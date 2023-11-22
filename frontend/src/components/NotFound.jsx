import { Box, Typography, Button } from "@mui/material";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import WaterWave from "react-water-wave";
import backgroundImage from "./../assets/water.jpg";

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

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="welcome">
      <Typography
        variant="h5"
        sx={{
          position: "absolute",
          top: "30px",
          left: "30px",
          zIndex: 1,
          fontWeight: "bold",
        }}
      >
        Energy Optimizer
      </Typography>

      <WaterWave
        imageUrl={backgroundImage}
        style={{
          backgroundSize: "cover",
          width: "100%",
          height: "100vh",
          zIndex: 0,
        }}
        dropRadius={20}
        resolution={500}
      >
        {() => (
          <div
            style={{
              width: "100%",
              height: "100%",
              position: "relative",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                display: "flex",
                transform: "translate(-50%, -50%)",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "20px",
                background: "rgba(255, 255, 255, 0.9)",
                textAlign: "center",
                zIndex: 2,
                borderRadius: 2,
              }}
            >
              <Typography variant="h4" sx={{ margin: 2, fontWeight: "bold" }}>
                Page not found
              </Typography>
              <Typography variant="text" sx={{ margin: 2, fontSize: 18 }}>
                Demo component pages can be accessed by <br/>
                clicking on the visual demo components.
              </Typography>
              <ThemeProvider theme={theme}>
                <Button variant="contained" color="water" sx={{ borderRadius: 2}} onClick={() => navigate("/demo")}>
                  Back to demo
                </Button>
              </ThemeProvider>

              <Typography variant="body2" sx={{ margin: 2, color: "black" }}>
                <a
                  href="https://www.freepik.com/free-photo/blue-swimming-pool-rippled-water-detail_1238770.htm#query=blue-swimming-pool-rippled-water-detail&position=0&from_view=search&track=sph"
                  style={{ color: "black" }}
                >
                  Image by benzoix
                </a>{" "}
                on Freepik
              </Typography>
            </Box>
          </div>
        )}
      </WaterWave>
    </div>
  );
};

export default NotFound;
