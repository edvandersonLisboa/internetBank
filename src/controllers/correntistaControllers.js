const Correntista = require('../models/correntista');
exports.cadastro = async (req, res) => {
    //verifica se o email já está cadastrado
    try {
        const { conta } = req.body;
        const { agencia } = req.body;
        if (await Correntista.findOne({ conta, agencia }))
            return res.status(400).send({ msg: 'Cliente Já Existe Cadastrado!' });

        const contaCadastrada = await Correntista.create(req.body);
        // userAgregatio();
        // nao retorna o password
        contaCadastrada.senha = undefined;
        contaCadastrada.cpf = undefined;
        contaCadastrada.saldo = undefined;
        return res.status(200).json({ msg: "Usuario Casdastrado Com Sucesso" });
    } catch (err) {
        return res.status(400).send({ msg: err });
    }
}


exports.listaDadosCliente = async (req, res) => {

    const contaCadastrada = await Correntista.findOne({ conta: req.body.conta });    
    if (contaCadastrada) {
        return res.status(200).json({
            agencia: contaCadastrada.agencia,
            conta: contaCadastrada.conta,
            saldo: contaCadastrada.saldo,
            nome: contaCadastrada.nome
        })
    } else {
        return res.status(400).json({
            msg: "Nenhuma Transfêrencia Encontrada"
        })
    }
}