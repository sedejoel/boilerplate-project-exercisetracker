const express = require('express')
let mongoose = require("mongoose");
const app = express()
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoute = require('./routes/user');
const exerciceRoute = require('./routes/exercice');

require('dotenv').config()

app.use(cors())
app.use(express.static('public'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use('/api', userRoute);
app.use('/api/users', exerciceRoute);
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send(err);
});




mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB using MongooseJS");
})


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});


const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
