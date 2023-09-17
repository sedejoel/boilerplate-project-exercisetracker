const express = require('express')
const router = express.Router();
const ExerciceModel = require('../models/exercice.model');
const UserModel = require('../models/user.model');

router.post('/:_id/exercises', (req, res) => {
    const userId = req.params._id;
    UserModel.find({ _id: userId }, (err, response) => {
        if (err) {
            res.send({ error: 'ID utilisateur incorrect' });
        } else {
            let newExercice = new ExerciceModel({
                id: userId,
                description: req.body.description,
                duration: req.body.duration,
                date: (req.body.date === '') ? new Date() : req.body.date
            });

            console.log(newExercice);
            newExercice.save((err, newExercice) => {
                if (err)
                    res.send(err);
                else
                    res.send({
                        _id: userId,
                        username: response[0].username,
                        description: newExercice.description,
                        duration: newExercice.duration,
                        date: new Date(newExercice.date).toDateString()
                    });
            })

        }
    });

});

//GET /api/users/:_id/logs?[from][&to][&limit]
router.get('/:_id/logs', (req, res) => {
    const userId = req.params._id;
    const from = req.query.from;
    const to = req.query.to;
    const limit = req.query.limit;
    let resultat = {};
    console.log(from);


    UserModel.find({ _id: userId }, (err, response) => {
        if (err) {
            res.send({ error: 'ID utilisateur non trouvé' });
        } else {

            resultat._id = response[0]._id;
            resultat.username = response[0].username;
            //typeof myVar === 'undefined')
            if ((typeof from === 'undefined') || (typeof to === 'undefined')) {
                ExerciceModel
                    .find({ id: resultat._id })
                    .limit(parseInt(limit))
                    .exec((err, resp) => {
                        if (err)
                            res.send(err)
                        else
                            resultat.count = resp.length;
                        const t = resp.map(el => {
                            return { duration: el.duration, description: el.description, date: new Date(el.date).toDateString() };
                        });
                        resultat.log = t;

                        // resultat.log.map(el=>{});
                        res.send(resultat)
                    });

            } else {
                //{"$gte": start, "$lt": end}
                ExerciceModel
                    .find({ id: resultat._id })
                    .find({ date: { "$gte": from, "$lt": to } })
                    .limit(parseInt(limit))
                    .exec((err, resp) => {
                        if (err)
                            res.send(err)
                        else
                            resultat.count = resp.length;
                        resultat.from = new Date(from).toDateString();
                        resultat.to = new Date(to).toDateString();
                        const t = resp.map(el => {
                            return { duration: el.duration, description: el.description, date: new Date(el.date).toDateString() };
                        });
                        resultat.log = t;

                        // resultat.log.map(el=>{});
                        res.send(resultat)
                    });
                //{"$gte": start, "$lt": end}


            }


        }
    });

});




module.exports = router;