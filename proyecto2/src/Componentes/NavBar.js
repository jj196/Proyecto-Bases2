import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Transaccion from './Transaccion'
import Reportes from './Reportes'
import Acceso from './Acceso'
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const [pantalla, setPantalla ] = React.useState(1)
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar> 
          <Typography variant="h6" className={classes.title}>
            Bases de datos 2
          </Typography>
          <Button color="inherit" onClick={() => setPantalla(1)}>Reportes</Button>
          <Button color="inherit" onClick={() => setPantalla(2)}>Transacciónes</Button>
          <Button color="inherit" onClick={() => setPantalla(3)}>Usuarios</Button>
          <Button color="inherit" onClick={() => setPantalla(4)}>Aceso</Button>
        </Toolbar>
      </AppBar>
      {
        pantalla===1 &&
        <Reportes/>
      }
      {
        pantalla===2 &&
        <Transaccion/>
      }
      {
        pantalla === 4 &&
         <Acceso/>
      }
      
    </div>
  );
}