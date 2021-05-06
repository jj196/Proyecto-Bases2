import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import InputBase from '@material-ui/core/InputBase';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import axios from 'axios'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

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
    table: {
        minWidth: 650,
    },
}));

const BootstrapInput = withStyles((theme) => ({
    root: {
        'label + &': {
            marginTop: theme.spacing(3),
        },
    },
    input: {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 26px 10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
}))(InputBase);

export default function Reportes() {
    const classes = useStyles();
    const [reporte, setReporte] = React.useState({ consulta: 8, nombre: '', descripcion: '', params: [] })
    const [inst, setInst] = React.useState({institucion: '', totalcredito: 0, totaldebito: 0})
    const [value, setValue] = React.useState('')
    const [value2, setValue2] = React.useState('')
    const [rows, setRows] = React.useState([])
    const consultas = [
        {
            consulta: 0,
            nombre: 'Consulta 1',
            descripcion: 'Reporte de operaciones realizadas por un cuentahabiente',
            params: []
        },
        {
            consulta: 1,
            nombre: 'Consulta 2',
            descripcion: 'Reporte de totales de créditos y débitos para una institución financiera.',
            params: []
        },
        {
            consulta: 2,
            nombre: 'Consulta 3',
            descripcion: 'Reporte de cuentahabientes.',
            params: []
        },
        {
            consulta: 3,
            nombre: 'Consulta 4',
            descripcion: 'Reporte de instituciones bancarias.',
            params: []
        },
        {
            consulta: 4,
            nombre: 'Consulta 5',
            descripcion: 'Reporte de movimientos por cuentahabiente por mes.',
            params: []
        }
    ]
    const hadleClick = async (event) => {
        reporte.params = []
        reporte.params.push(value)
        console.log(reporte)
        var response2 = null
        if(reporte.consulta === 1){
            reporte.params.push('Credito')
            response2 = await axios.get('http://localhost:8080/lol', {
                params: {
                    consulta: reporte.consulta,
                    params: reporte.params
                }
            })
            reporte.params = []
            reporte.params.push(value)
            reporte.params.push('Debito')
        }else{
            reporte.params.push(value2)
        }
        
        const response = await axios.get('http://localhost:8080/lol', {
            params: {
                consulta: reporte.consulta,
                params: reporte.params
            }
        })
        console.log(response.data);
        if(response.data.valid){
            switch(reporte.consulta){
                case 0:
                    setRows(response.data.data)
                    break;
                case 1:
                    setInst({institucion: value, totalcredito: response2.data.data[0].totalcredito, totaldebito: response.data.data[0].totalcredito})
                default:
                    setRows(response.data.data)
            }
            
        }
        
    }

    const handleChangeValue = (event) => {
        setValue(event.target.value);
    };

    const handleChangeValue2 = (event) => {
        setValue2(event.target.value);
    };

    const handleChange = (event) => {
        setRows([])
        var a = consultas[event.target.value]
        setReporte(a);
    };
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
                                        Reportes
                            </Typography>
                                </Grid>
                            </Grid>
                            <Grid container item xs={12} spacing={3} justify="center"
                                alignItems="center">
                                <Grid item xs={3}>
                                    <div className={classes.paper}>Seleccione la consulta</div>
                                </Grid>
                                <Grid item xs={3}>
                                    <Select
                                        labelId="demo-customized-select-label"
                                        id="demo-customized-select"
                                        input={<BootstrapInput />}
                                        value={reporte.consulta}
                                        onChange={handleChange}
                                    >
                                        <MenuItem id="c1" value={0}>Consulta1</MenuItem>
                                        <MenuItem id="c2" value={1}>Consulta2</MenuItem>
                                        <MenuItem id="c3" value={2}>Consulta3</MenuItem>
                                        <MenuItem id="c4" value={3}>Consulta4</MenuItem>
                                        <MenuItem id="c5" value={4}>Consulta5</MenuItem>
                                    </Select>
                                </Grid>
                            </Grid>
                            <Grid container item xs={12} spacing={3} justify="center"
                                alignItems="center">
                                <Grid item xs={4}>
                                    <div className={classes.paper}>Descripción consulta:</div>
                                </Grid>
                                <Grid item xs={4}>
                                    <TextareaAutosize aria-label="" rowsMin={5} placeholder="" value={reporte.descripcion} />;
                                    {/* <TextField id="filled-basic"  variant="filled"  disabled value={reporte.descripcion}/> */}
                                </Grid>
                            </Grid>
                            {
                                (reporte.consulta === 0 || reporte.consulta === 4) &&
                                <Grid container item xs={12} spacing={3} justify="center"
                                    alignItems="center">
                                    <Grid item xs={4}>
                                        <div className={classes.paper}>Ingrese el dpi:</div>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <TextField id="filled-basic" variant="filled" value={value} onChange={handleChangeValue} />
                                    </Grid>
                                </Grid>
                            }
                            {
                                reporte.consulta === 1 &&
                                <Grid container item xs={12} spacing={3} justify="center"
                                    alignItems="center">
                                    <Grid item xs={4}>
                                        <div className={classes.paper}>Ingrese la institución bancaria:</div>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <TextField id="filled-basic" variant="filled" value={value} onChange={handleChangeValue} />
                                    </Grid>
                                </Grid>
                            }
                            {
                                reporte.consulta === 4 &&
                                <Grid container item xs={12} spacing={3} justify="center"
                                    alignItems="center">
                                    <Grid item xs={4}>
                                        <div className={classes.paper}>Ingrese el numero del mes</div>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <TextField id="filled-basic" variant="filled" value={value2} onChange={handleChangeValue2} />
                                    </Grid>
                                </Grid>
                            }
                            {
                                reporte.consulta === 0 &&
                                <Grid container item xs={12} spacing={3} justify="center"
                                alignItems="center">
                                <TableContainer component={Paper}>
                                    <Table className={classes.table} size="small" aria-label="a dense table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="right">Cui</TableCell>
                                                <TableCell align="right">Nombre</TableCell>
                                                <TableCell align="right">Tipo Cuenta</TableCell>
                                                <TableCell align="right">Monto</TableCell>
                                                <TableCell align="right">Descripcion</TableCell>
                                                <TableCell align="right">Fecha transferencia</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {rows.map((row) => (
                                                <TableRow key={row.name}>
                                                    <TableCell component="th" scope="row">
                                                        {row.cuicliente}
                                                    </TableCell>
                                                    <TableCell align="right">{row.nombrecliente}</TableCell>
                                                    <TableCell align="right">{row.tipocuenta}</TableCell>
                                                    <TableCell align="right">{row.monto}</TableCell>
                                                    <TableCell align="right">{row.descripcion}</TableCell>
                                                    <TableCell align="right">{new Date(row.fechatransferencia).toLocaleString()}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                            }
                            {
                                reporte.consulta === 1 &&
                                <Grid container item xs={12} spacing={3} justify="center"
                                alignItems="center">
                                <TableContainer component={Paper}>
                                    <Table className={classes.table} size="small" aria-label="a dense table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="right">Institución</TableCell>
                                                <TableCell align="right">Total Credito</TableCell>
                                                <TableCell align="right">Total Debito</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                                <TableRow key={inst.institucion}>
                                                    <TableCell component="th" scope="row">
                                                        {inst.institucion}
                                                    </TableCell>
                                                    <TableCell align="right">{inst.totalcredito}</TableCell>
                                                    <TableCell align="right">{inst.totaldebito}</TableCell>
                                                </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                            }
                            {
                                reporte.consulta === 2 &&
                                <Grid container item xs={12} spacing={3} justify="center"
                                alignItems="center">
                                <TableContainer component={Paper}>
                                    <Table className={classes.table} size="small" aria-label="a dense table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="right">DPI</TableCell>
                                                <TableCell align="right">Nombre</TableCell>
                                                <TableCell align="right">Apellido</TableCell>
                                                <TableCell align="right">Email</TableCell>
                                                <TableCell align="right">Sexo</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {rows.map((row) => (
                                                <TableRow key={row.name}>
                                                    <TableCell component="th" scope="row">
                                                        {row.dpi}   
                                                    </TableCell>
                                                    <TableCell align="right">{row.nombre}</TableCell>
                                                    <TableCell align="right">{row.apellido}</TableCell>
                                                    <TableCell align="right">{row.email}</TableCell>
                                                    <TableCell align="right">{row.sexo}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                            }
                            {
                                reporte.consulta === 3 &&
                                <Grid container item xs={12} spacing={3} justify="center"
                                alignItems="center">
                                <TableContainer component={Paper}>
                                    <Table className={classes.table} size="small" aria-label="a dense table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="right">Institución</TableCell>
                                                <TableCell align="right">Abreviacion</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {rows.map((row) => (
                                                <TableRow key={row.name}>
                                                    <TableCell component="th" scope="row">
                                                        {row.nombre}   
                                                    </TableCell>
                                                    <TableCell align="right">{row.abreviacion}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                            }
                            {
                                reporte.consulta === 4 &&
                                <Grid container item xs={12} spacing={3} justify="center"
                                alignItems="center">
                                <TableContainer component={Paper}>
                                    <Table className={classes.table} size="small" aria-label="a dense table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="right">Cui</TableCell>
                                                <TableCell align="right">Nombre</TableCell>
                                                <TableCell align="right">Tipo cuenta</TableCell>
                                                <TableCell align="right">Monto</TableCell>
                                                <TableCell align="right">Transacción</TableCell>
                                                <TableCell align="right">Fecha</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {rows.map((row) => (
                                                <TableRow key={row.name}>
                                                    <TableCell component="th" scope="row">
                                                        {row.cuicliente}   
                                                    </TableCell>
                                                    <TableCell align="right">{row.nombrecliente}</TableCell>
                                                    <TableCell align="right">{row.tipocuenta}</TableCell>
                                                    <TableCell align="right">{row.monto}</TableCell>
                                                    <TableCell align="right">{row.descripcion}</TableCell>
                                                    <TableCell align="right">{new Date(row.fechatransferencia).toLocaleString()}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                            }
                            <Grid container item xs={12} spacing={3} justify="center"
                                alignItems="center">
                                <Grid item xs={4} >
                                    <Button variant="contained" color="primary" onClick={hadleClick}>
                                        Consultar
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