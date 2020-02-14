const Correntistas = require('../models/correntista');
const { cpf } = require('cpf-cnpj-validator');
const authenticacaoLogin = require('../service/auth-service');
const validacaoToken = require('../service/validacao');
const bcrypt = require('bcryptjs');

exports.autorizacao = async (req, res) => {
    const cpfUser = req.body.cpf;
    const senha = req.body.senha;

    var cpfFormat = await cpf.format(cpfUser);
    const customConta = await Correntistas.findOne({ cpf: cpfFormat });

    var data = new Date();

    if (customConta == null)
        return res.status(404).send({ msg: 'Usuario nao existe' });

    if (await bcrypt.compare(senha, customConta.senha)) {
        const token = await authenticacaoLogin.generateToken({ email: customConta.email, data, cpfFormat, senha });
        customConta.senha = undefined;
        customConta.transacao = undefined;
        var conta = customConta.conta
        return res.status(200).json({ token, conta });
    } else {
        return res.status(400).json({ msg: "Usuario não Encontrado!" });
    }

}
exports.validacao = async (req, res) => {
    const { conta } = req.body;
    const _validacao = req.body.validacao;
    const customConta = await Correntistas.findOne({ conta });

    if (customConta == null) {
        return res.status(400).json({
            msg: "conta incorreta"
        });

    }

    const data = new Date()
    if (await bcrypt.compare(req.body.validacao, customConta.validacao)) {
        const tokenValidacao = await validacaoToken.generateToken({ _validacao, conta, data });

        return res.status(200).json({
            msg: "Acesso Autorizado com Sucesso",
            token: tokenValidacao
        });

    } else {

        return res.status(401).json({
            msg: "Senha Invalida, tente outra vez?"
        });

    }

}

