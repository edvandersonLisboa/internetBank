const express = require("express");
const validacaoToken = require('../service/validacao');
const transferenciaControllers = require('../controllers/transferenciaControllers');
const router = express.Router();

//transferencia da lista
router.get('/lista/:numeroConta', async (req, res, next) => {
  validacaoToken.authorize(req, res, next);
  transferenciaControllers.listaTranferencia(req, res, next)
})

//transferencia de Update
router.post('/cadastro', async (req, res, next) => {

  validacaoToken.authorize(req, res, next);
console.log(req.body)
  const descricao_env = req.body.descricao;
  const descricao_receb = "Você acabou de receber um deposito, no valor de R$ " + req.body.valor;

  const data_transferencia = new Date();
  const hashTranferencia = req.body.conta_env + "" + req.body.conta_receb + "" + new Date();

  const valorTransferencia = req.body.valor;
console.log(req.body)
  if (await transferenciaControllers.vericarPossivelTransferencia(req.body.conta_env, valorTransferencia) == true) {
    var resultado = transferenciaControllers.cadastroTransferencia(true, descricao_receb, valorTransferencia, data_transferencia, hashTranferencia, req.body.conta_env, req.body.conta_receb);
    if (resultado == false) {

    return  res.status(200).json({

        msg: "transferencia não realizada"
      })
    }
    resultado = transferenciaControllers.cadastroTransferencia(false, descricao_env, valorTransferencia, data_transferencia, hashTranferencia, req.body.conta_receb, req.body.conta_env);
    if (resultado == false) {

     return res.status(400).json({
        msg: "transferencia não realizada"
      })
    } else {
     return res.status(200).json({
        msg: "Transferencia Realizada com Sucesso"
      })
    }
  } else {

   return res.status(400).json({

      msg: "Saldo Insuficiente"
    })
  }
})

module.exports = router;