import { Card, CardContent, CardActions, Typography } from '@mui/material';
import { Button } from '@mui/material'; 

const EnergyComponent = (props) => {
  const { name, icon } = props;
  return (
    <Card sx={{
      maxWidth: '500px',
      minWidth: '250px',
      minHeight: '20%',
      padding: '2vh',
      margin: '1vh'}}>
      {icon} 
      <Typography variant='body1' margin='1vh'>{name}</Typography>
      <CardContent>
        <Typography variant='body2'>
          Energy consumption:
          {/*or some other basic info about the component 
          passed to the component as props*/}
        </Typography>
      </CardContent>
      <CardActions>
        {/*this will open a bigger view of the energy component with more info*/}
        <Button size='small'>Show more</Button>
      </CardActions>
    </Card>
  )
}

export default EnergyComponent;