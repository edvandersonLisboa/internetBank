const Correntista = require('../models/correntista');
const Transferencias = require('../models/transferencia');


exports.listaTranferencia = async (req, res) => {

   

console.log( req.params);
    const listaTransferencias = await Transferencias.find({ conta: req.params.numeroConta });
    
    if (listaTransferencias.length > 0) {
        return res.status(200).json(
            listaTransferencias
        )
    } else {
        return res.status(400).json({
            msg: "Nenhuma Transfêrencia Encontrada"
        })
    }

}

exports.cadastroTransferencia = async (deEnviar, descricao, valorTransferencia, data_transferencia, hashTranferencia, contaTitular, outraConta) => {

    const contaT = await Correntista.findOne({ conta: contaTitular });
   
    const outraC = await Correntista.findOne({ conta: outraConta })

    try {
        await Transferencias.create({
            nome: contaT.nome,
            conta: outraC.conta,
            outraConta:contaT.conta,
            cpf: contaT.cpf,
            agencia: contaT.agencia,
            status: deEnviar ? "recebido" : "enviado",
            descricao: descricao,
            valor: valorTransferencia,
            data: data_transferencia,
            hash: hashTranferencia
        })
        await Correntista.updateOne({ conta: contaT },
            {
                $set: {
                    saldo: (parseFloat(contaT.saldo) - parseFloat(valorTransferencia)).toString()
                }
            })

        return true;
    } catch (e) {
        return false;

    }
}

exports.vericarPossivelTransferencia = async (contaTitular, valorTransferencia) => {
    const contaT = await Correntista.findOne({ conta: contaTitular });

    if (parseFloat(contaT.saldo) >= parseFloat(valorTransferencia)) {
        return true;
    } else {
        return false;
    }
}