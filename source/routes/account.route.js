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
    // 0 la admin , 1 la customer
    entity.role = 1;
    entity.dob = dob;

    delete entity.raw_password;


    const result = await userModel.add(entity);
    res.redirect('/');
});


router.get('/login', (req, res) => {
    res.render('vwAccount/login', { layout: false })
});

router.post('/login', async(req, res) => {


    const user = await userModel.singleByUsername(req.body.username);
    if (user === null)
        throw new Error('Invalid username or password,');
    const rs = bcrypt.compareSync(req.body.password, user.password);
    if (rs === false)
        return res.render('vwAccount/login', {
            layout: false,
            err_message: 'Login failed'
        });

    delete user.password;
    req.session.isAuthenticated = true;
    req.session.authUser = user;

    if (req.session.authUser.role === 0) {
        //admin
        res.redirect('http://localhost:3000/admin/categories')
    } else if (req.session.authUser.role === 1) {
        //customer
        res.redirect('/');
    }



})

module.exports = router;