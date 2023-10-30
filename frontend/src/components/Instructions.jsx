import {
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  Button

} from '@mui/material';
//import { useState } from 'react';

const Instructions = ({openInstructions, setOpenInstructions}) => {

  const handleCloseInstructions = () => {
    setOpenInstructions(false);
  }

  return (
    {openInstructions} && 
      <Dialog open={openInstructions} maxWidth={'sm'} fullWidth={true}>
      
        <DialogTitle sx={{display: 'flex', justifyContent: 'left', marginX: 2, marginTop: 2}}
          >{"Liquid AI Demo"}
        </DialogTitle>
        <DialogContentText sx={{display: 'flex', justifyContent: 'center', marginX: 5}}>
          The purpose of this demo is to show how energy consumption can be optimized in a
          single-family house.
        </DialogContentText>
        <DialogTitle sx={{display: 'flex', justifyContent: 'left', marginX: 2, marginTop: 2}}
          >{"Instructions for use"}
        </DialogTitle>
        <DialogContentText sx={{display: 'flex', justifyContent: 'left', marginX: 5}}>
          You can select what components of the house are included in the demo from the Components
          dropdown menu. You can inspect individual components by hovering over the component and 
          clicking on it.<br/>
          The demo shows the consumption and production of energy for each component and the price
          of consumed energy by hour. The time range and speed of demo time can be changed from 
          the dropdown menus.
        </DialogContentText>
        <DialogTitle sx={{display: 'flex', justifyContent: 'left', marginX: 2, marginTop: 2}}
          >{"Source of the data"}
        </DialogTitle>
        <DialogContentText sx={{display: 'flex', justifyContent: 'left', marginX: 5}}>
          Consumption and production data is currently made-up test data for demonstrating purposes.<br/>
          The price data is fetched from Pörssisähkö API:
        </DialogContentText>
        <DialogContent sx={{display: 'flex', justifyContent: 'left', marginX: 2}}>
          <a href="https://porssisahko.net">Link to the price API (the site is in Finnish)</a>
        </DialogContent>
        <DialogActions sx={{display: 'flex', justifyContent: 'center', margin: 2}}>
          <Button variant='contained' onClick={handleCloseInstructions}>Back to demo</Button>
        </DialogActions>

    </Dialog>
  );
}

export default Instructions;