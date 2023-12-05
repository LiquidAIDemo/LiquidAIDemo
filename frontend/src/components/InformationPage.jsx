import {
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    water: {
      main: "#8BD4E2",
      light: "#a7dee7",
      dark: "#0eafc9",
      contrastText: "#000000",
    },
  },
  typography: {
    button: {
      textTransform: "none",
      fontWeight: "bolder",
    },
  },
});

const InformationPage = ({ openInformation, setOpenInformation }) => {
  const handleCloseInformation = () => {
    setOpenInformation(false);
  };

  return (
    { openInformation } && (
      <Dialog open={openInformation} maxWidth={"sm"} fullWidth={true}>
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "left",
            marginX: 2,
            marginTop: 2,
            fontWeight: "bold",
          }}
        >
          {"Energy Optimizer"}
        </DialogTitle>
        <DialogContentText
          sx={{
            display: "flex",
            justifyContent: "center",
            marginX: 5,
            fontSize: 14,
          }}
        >
          The purpose of this demo is to show how energy consumption can be
          optimized in a single-family house.
        </DialogContentText>
        <DialogContentText
          sx={{
            display: "flex",
            justifyContent: "left",
            marginX: 5,
            marginBottom: 1,
            marginTop: 2,
            fontSize: 18,
            color: "black",
          }}
        >
          {"Instructions for use"}
        </DialogContentText>
        <DialogContentText
          sx={{
            display: "flex",
            justifyContent: "left",
            marginX: 5,
            marginY: 1,
            fontSize: 14,
          }}
        >
          The demo shows the consumption and production of energy during a time
          frame of 24 hours. The time range can be selected to show data from
          last 24 hours or predictions for next 24 hours. The speed of the demo
          can also be changed from the dropdown menu.
        </DialogContentText>
        <DialogContentText
          sx={{
            display: "flex",
            justifyContent: "left",
            marginX: 5,
            marginY: 1,
            fontSize: 14,
          }}
        >
          You can select what components of the house are included in the demo
          from the Components dropdown menu. Individual components can be
          inspected by hovering over the component and clicking it.
        </DialogContentText>
        <DialogContentText
          sx={{
            display: "flex",
            justifyContent: "left",
            marginX: 5,
            marginY: 1,
            fontSize: 14,
          }}
        >
          Energy consuming components are marked with red border and producing
          components with green border. When a component is not
          consuming/producing energy, the border is not shown. For energy
          consuming components, the border is stronger when the consumption is
          more than 1 kWh. For solar panels, the border is stronger when
          production is more than 0.1 kWh. The electric board component, that
          also has the green border, represents consumed energy that is not
          self-produced, i.e. comes from the electricity network. When electric
          board &quot;production&quot; is more than 5 kWh, it has stronger green
          border.
        </DialogContentText>
        <DialogContentText
          sx={{
            display: "flex",
            justifyContent: "left",
            marginX: 5,
            marginY: 1,
            fontSize: 14,
          }}
        >
          Consumption / production and the price of consumed energy by hour are
          shown for each component individually. Total consumption and prices
          for each hour are shown on the main view. The demo also shows how the
          use of energy can be optimized and how much money could be saved by
          consuming when electricity price is the lowest, compared to
          &quot;real&quot; consumption. Optimization is implemented for the two
          electric cars, heat pump and hot water heater. The optimizer component
          (marked with yellow border) represents the intelligent optimization:
          optimization rules and price data are downloaded periodically from the
          internet and sent to the energy consuming components. This is
          visualized with the animated download and upload icons.
        </DialogContentText>
        <DialogContentText
          sx={{
            display: "flex",
            justifyContent: "left",
            marginX: 5,
            marginY: 1,
            fontSize: 18,
            color: "black",
          }}
        >
          {"Source of the data"}
        </DialogContentText>
        <DialogContentText
          sx={{
            display: "flex",
            justifyContent: "left",
            marginX: 5,
            marginTop: 1,
            fontSize: 14,
          }}
        >
          Consumption and production data is currently made-up test data for
          demonstrating purposes. The price data is fetched from&nbsp;
        </DialogContentText>
        <DialogContentText
          sx={{
            display: "flex",
            justifyContent: "left",
            marginX: 5,
            fontSize: 14,
          }}
        >
          <a href="https://porssisahko.net" style={{ color: "black" }}>
            Pörssisähkö API (the site is in Finnish)
          </a>
        </DialogContentText>

        <DialogActions
          sx={{ display: "flex", justifyContent: "center", margin: 2 }}
        >
          <ThemeProvider theme={theme}>
            <Button
              variant="contained"
              color="water"
              sx={{ borderRadius: 2 }}
              onClick={handleCloseInformation}
            >
              Back
            </Button>
          </ThemeProvider>
        </DialogActions>
      </Dialog>
    )
  );
};

export default InformationPage;
