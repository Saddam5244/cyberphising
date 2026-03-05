const { registerValidation, loginValidation } = require('../Middlewares/AuthValidation');
const {register, login} = require('../Controllers/AuthController')
const router = require('express').Router();
const express = require("express");

router.post('/login', loginValidation, login);
router.post('/register', registerValidation, register);

module.exports = router;

