const express = require('express')
const router = express.Router();
const UserModel = require('../models/user.model');

router.post('/users', (req, res) => {

    if (!req.body.username) {
        res.status(400).send({ error: 'Renseignez un nom' });
    } else {
        const { username } = req.body;
        let newUser = new UserModel({ username });

        newUser.save((err, newUser) => {
            if (err)
                res.send(err);
            else
                res.send(newUser);
        });
    }
});

router.get('/users', (req, res) => {
    UserModel.find((err, newUser) => {
        if (err)
            res.send(err);
        else
            res.send(newUser);
    });
});


module.exports = router;