const express = require('express');
const bcrypt = require('bcryptjs');
const moment = require('moment');
const userModel = require('../models/account.model');

const router = express.Router();

router.get('/register', async(req, res) => {
    res.render('vwAccount/register', { layout: false })
});

router.post('/register', async(req, res) => {
    const N = 10;
    const hash = bcrypt.hashSync(req.body.raw_password, N);
    const dob = moment(req.body.dob, 'DD/MM/YYYY').format('YYYY-MM-DD');

    const entity = req.body;
    entity.password = hash;
    // 0 la admin , 1 la user
    entity.role = 1;
    entity.dob = dob;

    delete entity.raw_password;


    const result = await userModel.add(entity);
    res.redirect('/');
});

module.exports = router;