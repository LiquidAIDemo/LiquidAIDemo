import {
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  Button

} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

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

const Instructions = ({openInstructions, setOpenInstructions}) => {

  const handleCloseInstructions = () => {
    setOpenInstructions(false);
  }

  return (
    {openInstructions} && 
      <Dialog open={openInstructions} maxWidth={'sm'} fullWidth={true}>
        <DialogTitle sx={{display: 'flex', justifyContent: 'left', marginX: 2, marginTop: 2, fontWeight: 'bold'}}
          >{"Energy Optimizer"}
        </DialogTitle>
        <DialogContentText sx={{display: 'flex', justifyContent: 'center', marginX: 5, fontSize: 14}}>
          The purpose of this demo is to show how energy consumption can be optimized in a
          single-family house.
        </DialogContentText>
        <DialogTitle sx={{display: 'flex', justifyContent: 'left', marginX: 2, fontSize: 18}}
          >{"Instructions for use"}
        </DialogTitle>
        <DialogContentText sx={{display: 'flex', justifyContent: 'left', marginX: 5, fontSize: 14}}>
          The demo shows the consumption and production of energy during a time frame of 24 hours. 
          The time range can be selected to show data from last 24 hours or predictions for next 24 hours. 
          The speed of the demo can also be changed from the dropdown menu.<br/><br/>
          You can select what components of the house are included in the demo from the Components
          dropdown menu. You can inspect individual components by hovering over the component and 
          clicking it. Energy consuming components are marked with red border and producing components 
          with green border. <br/><br/>
          Consumption / production and the price of consumed energy by hour are shown for for each
          component individually, as well as the total consumption and price. 
          The demo also shows how the use of energy can be optimized and how much money could be saved
          by consuming when electricity price is the lowest, compared to &quot;real&quot; consumption. <br/>
        </DialogContentText>
        <DialogTitle sx={{display: 'flex', justifyContent: 'left', marginX: 2, fontSize: 18}}
          >{"Source of the data"}
        </DialogTitle>
        <DialogContentText sx={{display: 'flex', justifyContent: 'left', marginX: 5, fontSize: 14}}>
          Consumption and production data is currently made-up test data for demonstrating purposes.
          The price data is fetched from Pörssisähkö API:
        </DialogContentText>
        <DialogContent sx={{display: 'flex', justifyContent: 'left', marginX: 2, fontSize: 14}}>
          <a href="https://porssisahko.net" style={{ color: "black" }}>Link to the price API (the site is in Finnish)</a>
        </DialogContent>
        <DialogActions sx={{display: 'flex', justifyContent: 'center', margin: 2}}>
          <ThemeProvider theme={theme}>
            <Button variant="contained" color="water" sx={{ borderRadius: 2}} onClick={handleCloseInstructions}>
              Back
            </Button>
          </ThemeProvider>
        </DialogActions>
      </Dialog>
  );
}

export default Instructions;