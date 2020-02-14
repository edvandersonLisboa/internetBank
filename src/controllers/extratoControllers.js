const Transferencias = require('../models/transferencia');
exports.extrato = async (req, res) => {


    const hash_tranferencia = req.params.hash;


    const listaTransferencias = await Transferencias.findOne({ hash: hash_tranferencia });
    if (listaTransferencias == null) {
        return res.status(400).json({
            msg: "Não existe conta com esse hash"
        })
    } else {

        return res.status(400).json({
            extrato: listaTransferencias
        })
    }

}