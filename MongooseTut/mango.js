const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/students');


const kittySchema = new mongoose.Schema({
  name: String
});
kittySchema.methods.speak = function speak() {
  const greeting = "my name is "+this.name
  // console.log(greeting);
};

const Kitten = mongoose.model('naikitty', kittySchema);
const nanikitty = new Kitten({ name: 'nanikitten' });
const nanikitty2=new Kitten({name:"mohanreddy"})
// console.log(nanikitty.name); 
// nanikitty.speak()
await nanikitty.save();
await nanikitty2.save();
// nanikitty.speak();
const kittens = await Kitten.find({name:"mohanreddy"});
console.log(kittens);
}
main()