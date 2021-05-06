import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios'
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: theme.spacing(20),
        marginLeft: theme.spacing(20),
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.primary,
    },
}));

export default function Transaccion() {
    const classes = useStyles();
    const [origen, setOrigen] = React.useState('')
    const [destino, setDestino] = React.useState('')
    const [monto, setMonto] = React.useState(0)

    const hadleClick = async (event) => {
        var tiempoTranscurrido = Date.now();
        var hoy = new Date(tiempoTranscurrido);
        console.log(hoy);
        var response2 = await axios.post('http://localhost:8080/lol', { 
                dpi: origen,
                monto: monto,
                descripcion: 'Debito',
                fecha: hoy.toISOString()
            })
        
        const response = await axios.post('http://localhost:8080/lol', {
            dpi: destino,
            monto: monto,
            descripcion: 'Credito',
            fecha: hoy.toISOString()
        })
        if(response.data.valid && response2.data.valid){
            setOrigen('')
            setDestino('')
            setMonto(0)
        }
            
        
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <Container >
                <Paper>
                    <div className={classes.root}>
                        <Grid container spacing={2}>
                            <Grid container item xs={12} spacing={3} justify="center"
                                alignItems="center">
                                <Grid item xs={8}>
                                    <Typography variant="h1" component="h1" gutterBottom>
                                        Transacciones
                            </Typography>
                                </Grid>
                            </Grid>
                            <Grid container item xs={12} spacing={3} justify="center"
                                alignItems="center">
                                <Grid item xs={4}>
                                    <div className={classes.paper}>Cuenta origen</div>
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField id="filled-basic" value={origen} onChange={(event) => setOrigen(event.target.value)} label="Cuenta origen" variant="filled" />
                                </Grid>
                            </Grid>
                            <Grid container item xs={12} spacing={3} justify="center"
                                alignItems="center">
                                <Grid item xs={4}>
                                    <div className={classes.paper}>Cuenta destino</div>
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField id="filled-basic" value={destino} onChange={(event) => setDestino(event.target.value)} label="Cuenta destino" variant="filled" />
                                </Grid>
                            </Grid>
                            <Grid container item xs={12} spacing={3} justify="center"
                                alignItems="center">
                                <Grid item xs={4}>
                                    <div className={classes.paper}>Monto</div>
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField id="filled-basic" label="Monto" variant="filled" value={monto} onChange={(event) => setMonto(event.target.value)} />
                                </Grid>
                            </Grid>
                            <Grid container item xs={12} spacing={3} justify="center"
                                alignItems="center">
                                <Grid item xs={4} >
                                    <Button variant="contained" color="primary" onClick={hadleClick}>
                                        Guardar
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </div>
                </Paper>
            </Container>
        </React.Fragment>
    );
}