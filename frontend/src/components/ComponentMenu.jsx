import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Grid } from '@mui/material';


export default function NestedList() {
    const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      sx={{width: '96%', bgcolor: 'background.paper'}}
      style={{position: 'absolute', zIndex: 1000}}
    >
      <ListItemButton onClick={handleClick} sx={{ width: '100%' }}>
        <ListItemText primary="Components" />
        {open ? <ExpandLess /> : <ExpandMore /> }
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" >
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <ListItem>
                        <FormControlLabel control={<Checkbox defaultChecked />} label="Car 1" />
                    </ListItem>
                    <ListItem>
                        <FormControlLabel control={<Checkbox defaultChecked />} label="Car 2" />
                    </ListItem> 
                </Grid>

                <Grid item xs={6}>
                    <ListItem>
                        <FormControlLabel control={<Checkbox defaultChecked />} label="Solar panel 1" />
                    </ListItem> 
                    <ListItem>
                        <FormControlLabel control={<Checkbox defaultChecked />} label="Solar panel 2" />
                    </ListItem> 
                </Grid>
            </Grid>
        </List>
      </Collapse>
    </List>
  );
}