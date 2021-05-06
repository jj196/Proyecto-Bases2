var assert = require('assert');
//”cassandra-driver” is in the node_modules folder. Redirect if necessary.
var cassandra = require('cassandra-driver');
const { log } = require('console');
const client = new cassandra.Client({
  contactPoints: ['127.0.0.1', '127.0.0.1'],
  localDataCenter: 'datacenter1'
});
var idTransaccion = 102020;
client.connect(function (err) {
  console.log(err)
  assert.ifError(err);
});
//Ensure all queries are executed before exit
function execute(query, params, callback) {
  return new Promise((resolve, reject) => {
    console.log('entro')
    console.log(query)
    client.execute(query, params, (err, result) => {
      if (err) {
        callback(err, result)
        console.log(err)
        reject()
      } else {
        callback(err, result);
        resolve()
      }
    });
  });
}

//Execute the queries 
var query = 'SELECT * FROM proyecto.cuentahabiente;';
//var q1 = execute(query, ['oranges'], (err, result) => { assert.ifError(err); console.log('The cost per orange is')})
// client.execute(query, function (err, result) {
//     var user = result.first();

//     //The row is an Object with column names as property keys. 
//     console.log(user.dpi);
//   });
let respuesta = {
  error: false,
  data: [],
  mensaje: ''
};

exports.postTransaccion = async function (req, res) {
  var query = 'select * from proyecto.cuentahabiente where dpi = ' + req.body.dpi + ' allow filtering;'
  execute(query, [], (err, result) => {
    try {
      query = 'insert into proyecto.transaccion (idtransaccion, cuiCliente, nombreCliente, tipoCuenta, monto, descripcion, fechaTransferencia) values(' + idTransaccion + ',' + req.body.dpi + ',' +
        ' \'' + result.rows[0].nombre + '\', \'Monetaria en Q\', ' + req.body.monto + ', \'' + req.body.descripcion + '\', \'' + req.body.fecha + '\');'
        idTransaccion += 1;
      console.log(query);
      execute(query, [], (err, result) => {
        try {
          return res.send({ valid: true, data: result });
        } catch (error) {
          return res.send({ valid: false, data: error })
        }
      })
    } catch (error) {
      return res.send({ valid: false, data: error })
    }
  })
}


exports.getReporte = async function (req, res) {
  respuesta = {
    error: false,
    data: 'siuuu',
    mensaje: 'siuuu'
  };
  console.log(req.query)
  var query = ''
  switch (req.query.consulta) {
    case '0':
      query = 'select cuiCliente, nombreCliente, tipoCuenta, monto, descripcion, fechaTransferencia from proyecto.transaccion where cuiCliente = ' + req.query.params[0] + ' allow filtering;';
      break;
    case '1':
      query = 'select nombreInstitucion, sum(monto) as totalCredito from proyecto.transaccion where nombreInstitucion = \'' + req.query.params[0] + '\' and descripcion = \'' + req.query.params[1] + '\' allow filtering;'
      break;
    case '2':
      query = 'select * from proyecto.cuentahabiente;'
      break;
    case '3':
      query = 'select * from proyecto.institucion;'
      break;
    case '4':
      query = 'select cuicliente, nombreCliente, tipoCuenta, monto, descripcion, fechaTransferencia from'
        + ' proyecto.transaccion where cuiCliente = ' + req.query.params[0] + ' and fechaTransferencia >= \'' + req.query.params[1] + '-01\' and fechaTransferencia <= \'' + req.query.params[1] + '-31\' allow filtering;'
      break;
    default:
      break;
  }

  console.log(query); 
  execute(query, [], (err, result) => {
    try {
      return res.send({ valid: true, data: result.rows });
    } catch (error) {
      return res.send({ valid: false, data: error })
    }
  })
}

