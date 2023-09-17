const express = require('express')
const router = express.Router();
const ExerciceModel = require('../models/exercice.model');
const UserModel = require('../models/user.model');

const formateDate = (param) => {
    var moment = require('moment'); // require
    let day = moment(param);
    return day.toLocaleString().substring(0, 15);
}

router.post('/:_id/exercises', (req, res) => {

    // console.log(req.body);
    const userId = req.params._id;
    UserModel.find({ _id: userId }, (err, user) => {
        if (err) {
            res.send({ error: 'ID utilisateur incorrect' });
        } else {
            let date = '';
            if ((typeof req.body.date === 'undefined')) {
                let d = new Date().toISOString().substring(0, 10);
                date = d;
                // date = d.getFullYear() + '-' + d.getMonth() + '-' + d.getDay();
                //console.log(date);
            } else {
                date = req.body.date;
            }

            let newExercice = new ExerciceModel({
                id: user[0]._id,
                description: req.body.description,
                duration: req.body.duration,
                date: date
            });


            newExercice.save((err, mExercice) => {
                if (err)
                    res.send(err);
                else {

                    let r = {};

                    r['description'] = mExercice.description;
                    r.duration = mExercice.duration;
                    r.date = formateDate(mExercice.date);
                    r._id = mExercice.id;
                    r.username = user[0].username;

                    console.log(r);


                    res.json({
                        r
                    });
                }
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
                            return { duration: el.duration, description: el.description, date: formateDate(el.date) };
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
                        resultat.from = formateDate(from);
                        resultat.to = formateDate(to);
                        const t = resp.map(el => {
                            return { duration: el.duration, description: el.description, date: formateDate(el.date) };
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