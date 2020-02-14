"use strict"
const express = require('express');

const validacaoToken = require('../service/validacao');
const extratoControllers = require('../controllers/extratoControllers')
const router = express.Router()

//transferencia extrato 
router.get('/:hash', async(req, res,next) =>{
  validacaoToken.authorize(req, res, next); 
  extratoControllers.extrato(req, res);
})

module.exports = router;