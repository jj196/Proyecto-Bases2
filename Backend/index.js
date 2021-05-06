const express = require('express'); // inicializa la apliacion
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
//const db = require('./DB/Connection')
// Inicializacion 
const app = express();
app.set('views', path.join(__dirname, 'views'));
//Settigns
app.set('port',process.env.PORT || 8080);
// codificacion de las urls
app.use(express.urlencoded())
//WiddleWares
app.use(morgan('dev')); // muestra mensajes y procesos por consola 
// enabling CORS for all requests
app.use(cors());
// habilitando json
app.use(express.json());

// end points
app.use((req,res,next)=>{

    next();
  });
// inicio del servidor

app.get('/', (req, res) => {
    res.send('Servidor Iniciado !!!');
  
  });

 //rutas
 
app.use('/lol',require('./Routes/index')); 
app.listen(app.get('port'),()=>{
    console.log('Server on port',app.get('port'));
})

