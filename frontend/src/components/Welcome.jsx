import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import WaterWave from "react-water-wave";
import backgroundImage from "./../assets/water.jpg";

const Welcome = () => {
  const navigate = useNavigate();


    // localStorage.removeItem('showHeatPump');
    // localStorage.removeItem('showElectricBoard');


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
        LiquidAI Demo
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
              }}
            >
              <Typography variant="h4" sx={{ margin: 2, fontWeight: "bold" }}>
                Welcome to Liquid AI demonstrator!
              </Typography>
              <Typography
                variant="text"
                sx={{ margin: 2, fontWeight: "bold", fontSize: 18 }}
              >
                Experience the power of liquid software with intelligent energy
                optimization.
              </Typography>
              <Typography variant="text" sx={{ margin: 2, fontSize: 18 }}>
                This demo shows you how energy consumption can be optimized in a
                single-family house.
                <br />
                <br />
                You can read more about liquid software{" "}
                <a
                  href="https://webpages.tuni.fi/liquid/"
                  style={{ color: "black" }}
                >
                  here
                </a>
                .
                <br />
                <br />
                This project is licensed under MIT. For more info and
                documentation, take a look in{" "}
                <a
                  href="https://github.com/LiquidAIDemo/LiquidAIDemo"
                  style={{ color: "black" }}
                >
                  Git
                </a>
                .
              </Typography>

              <Button variant="contained" onClick={() => navigate("/demo")}>
                Start demo
              </Button>

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

export default Welcome;
