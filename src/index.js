const  express = require('express');
const cors = require('cors');

 require('dotenv/config')
const app = express();

//require das rotas
const indexRota = require('./rotas/indexRota');
const transferenciaRota = require('./rotas/transferenciaRota');
const autorizacaoRota = require('./rotas/autorizacaoRota');
const correntistaRota = require('./rotas/correntistaRota');
const extratoRota = require('./rotas/extratoRota');
app.use(cors())

app.use(express.json());
app.use(express.urlencoded({extended: true}));

//rota de conexao
app.use('/', indexRota);
app.use('/transferencias',transferenciaRota);
app.use('/autorizacao',autorizacaoRota);
app.use('/conta', correntistaRota);
app.use('/extrato', extratoRota);

app.listen( process.env.PORT || 3000, ()=>{
   console.log("porta 3000");
})