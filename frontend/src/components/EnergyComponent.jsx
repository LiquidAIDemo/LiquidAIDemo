import { Card, CardContent, CardActions, Typography } from '@mui/material';
import { Button } from '@mui/material'; 
import { useNavigate } from 'react-router-dom';

const EnergyComponent = (props) => {
  const { id, name, type, description } = props;
  const navigate = useNavigate();
  const component = {
    id: id,
    name: name,
    type: type,
    description: description
  }
  return (
    <Card sx={{
      maxWidth: '500px',
      minWidth: '250px',
      minHeight: '20%',
      padding: '2vh',
      margin: '1vh'}}>
      <Typography variant='body1' margin='1vh'>{name}</Typography>
      <CardContent>
        <Typography variant='body2'>
          Energy {type}
          {/*or some other basic info about the component 
          passed to the component as props*/}
        </Typography>
      </CardContent>
      <CardActions>
        {/*this will open a bigger view of the energy component with more info*/}
        <Button 
          size='small'
          onClick={() => navigate(`/component/${id}`, 
              {
                state: {component: component},
                replace: true
              }
            )}>
            Show more
        </Button>
      </CardActions>
    </Card>
  )
}

export default EnergyComponent;