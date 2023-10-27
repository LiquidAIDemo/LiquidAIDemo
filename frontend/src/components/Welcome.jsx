import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import WaterWave from "react-water-wave";
import backgroundImage from "./../assets/water.jpg";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="welcome">
      <WaterWave
        imageUrl={backgroundImage}
        style={{ backgroundSize: "cover", width: "100%", height: "100vh" }}
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
                background: "rgba(0, 0, 0, 0.7)",
                textAlign: "center",
              }}
            >
              <Typography variant="h3" sx={{ margin: 2, color: "white" }}>
                Welcome to Liquid AI Demo!
              </Typography>
              <Typography variant="h5" sx={{ margin: 2, color: "white" }}>
                Experience the power of liquid software with intelligent energy
                optimization.
              </Typography>
              <Typography variant="body1" sx={{ margin: 2, color: "white" }}>
                This demo shows you how energy consumption can be optimized in a
                single-family house.
                <br />
                <br />
                You can read more about liquid software{" "}
                <a
                  href="https://webpages.tuni.fi/liquid/"
                  style={{ color: "white", textDecoration: "underline" }}
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
                  style={{ color: "white", textDecoration: "underline" }}
                >
                  Git
                </a>
                .
              </Typography>
              <Button
                variant="contained"
                onClick={() => navigate("/demo")}
                sx={{ backgroundColor: "#007bff", color: "white" }}
              >
                Start demo
              </Button>
              <Typography variant="body2" sx={{ margin: 2, color: "white" }}>
                <a
                  href="https://www.freepik.com/free-photo/blue-swimming-pool-rippled-water-detail_1238770.htm#query=blue-swimming-pool-rippled-water-detail&position=0&from_view=search&track=sph"
                  style={{ color: "white", textDecoration: "underline" }}
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
