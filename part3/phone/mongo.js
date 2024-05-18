const mongoose = require('mongoose');
if(process.argv.length<3){
    console.log("password is required");
    process.exit(1);
}
const password = process.argv[2];
const url = process.env.MONGODB_URI;


mongoose.set('strictQuery',false);
mongoose.connect(url);

const phoneSchema = new mongoose.Schema({
    name: String,
    number: String,
})
const Person = mongoose.model("Person",phoneSchema);

// const person = new Person({
//       name: process.argv[3], 
//       number: process.argv[4],
// })



// person.save().then(result=>{
//     console.log('person saved');
//     mongoose.connection.close();
// })
phoneSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })
Person.find({}).then(result=>{
    result.forEach(person=>{
        console.log(person);
    })
    mongoose.connection.close();
})