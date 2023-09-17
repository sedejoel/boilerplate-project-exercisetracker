
let mongoose =require("mongoose");

//console.log(process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on("connected",()=>{
  console.log("Connected to MongoDB using MongooseJS");
})



const createAndSavePerson = (done) => {
  let p = new Person({
    name:"Sede",
    age:35,
    favoriteFoods:['igname','frite'],
    email: 'sede.joel@gmail.com',

  });
  p.save((err, data)=> {
    if (err) return console.error(err);
    done(null, data)
  });
  //done(null /*, data*/);
};


  /** 4) Create many People with `Model.create()` */
  var arrayOfPeople = [
    {name: "Frankie", age: 74, favoriteFoods: ["Del Taco"]},
    {name: "Sol", age: 76, favoriteFoods: ["roast chicken"]},
    {name: "Robert", age: 78, favoriteFoods: ["wine"]}
  ];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function (err, people) {
    if (err) return console.log(err);
    done(null, people);
  });
  
};

const findPeopleByName = (personName, done) => {
  Person.find({name:personName},(err,personFound)=>{
    if (err) return console.log(err);
    done(null ,personFound);
  })
  
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods:food},(err,found)=>{
    if (err) return console.log(err);
    done(null ,found);
  })
};

const findPersonById = (personId, done) => {
  Person.findById({_id:personId},(err,id)=>{
    if (err) return console.log(err);
    done(null ,id);
  })
  
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  
  // .findById() method to find a person by _id with the parameter personId as search key. 
  Person.findById(personId, (err, person) => {
    if(err) return console.log(err); 
  
    // Array.push() method to add "hamburger" to the list of the person's favoriteFoods
    person.favoriteFoods.push(foodToAdd);

    // and inside the find callback - save() the updated Person.
    person.save((err, updatedPerson) => {
      if(err) return console.log(err);
      done(null, updatedPerson)
    })
  })
};

//Effectuer de nouvelles mises à jour sur un document à l'aide de model.findOneAndUpdate()
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, updatedDoc) => {
    if(err) return console.log(err);
    done(null, updatedDoc);
  })
  
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove({_id:personId},(err,person)=>{
    if(err) return console.log(err);
    done(null, person);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove({name:nameToRemove},(err,person)=>{
    if(err) return console.log(err);
    done(null, person);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person
    .find({favoriteFoods:foodToSearch})
    .sort({name:"asc"})
    .limit(2)
    .select('-age')
    .exec((err,person)=>{
      if(err) return console.log(err);
      done(null,person);
  
    });
  
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
