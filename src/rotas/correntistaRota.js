const express = require("express");
const validacaoToken = require('../service/validacao');
const { cpf } = require('cpf-cnpj-validator');
var validatorEmail = require("email-validator");
const router = express.Router();
const correntistaControllers = require('../controllers/correntistaControllers')

router.post('/cadastro', async (req, res) => {
    if (req.body.agencia.length != 4)
        return res.status(400).json({
            msg: "Agencia não é Valida"
        });
    if (req.body.conta.length != 12)
        return res.status(400).json({
            msg: "Conta Não é Valida."
        });

    if (cpf.isValid(req.body.cpf) == false)
        return res.status(400).json({
            msg: "Cpf não é Valido."
        });

    if (validatorEmail.validate(req.body.email) == false)
        return res.status(400).json({
            msg: "Email Nao e valido."
        });

    //verifica se o email já está cadastrado
    correntistaControllers.cadastro(req, res);

})

router.post('/buscarDados', async(req, res, next) =>{

    validacaoToken.authorize(req, res); 
    
    correntistaControllers.listaDadosCliente(req,res,next)
})

module.exports = router;

