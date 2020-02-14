const express = require("express");
const { cpf } = require('cpf-cnpj-validator');
const autorizacaoControllers = require('../controllers/autorizacaoControllers');
const router = express.Router();


require('dotenv/config')

//rota para autenticacao
router.post('/', async (req, res) => {

    console.log(req.body)
    const _cpf = req.body.cpf;
    const senha = req.body.senha;
    console.log(senha.length);
    if (req.body.senha.length != 6)
        return res.status(400).json({
            msg: "Senha Invalida."
        });

    if (cpf.isValid(req.body.cpf) == false)
        return res.status(400).json({
            msg: "Cpf não é Valido."
        });

    autorizacaoControllers.autorizacao(req, res);
})

//token validacao
router.post('/validacao', async (req, res) => {
    console.log(req.body);
    if (req.body.validacao.length != 4 && req.body.validacao.match("[0-9]+").index == 4) {
        return res.status(400).json({
            msg: "token não valido."
        });
    }
    autorizacaoControllers.validacao(req, res);
})

module.exports = router;