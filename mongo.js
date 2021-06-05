// ***testing playground***

// const mongoose = require("mongoose");

// if (process.argv.length < 3) {
//   console.log(
//     "Please provide the password as an argument: node mongo.js <password>"
//   );
//   process.exit(1);
// }

// const password = process.argv[2];

// const url = `mongodb+srv://fullstack:${password}@phonebook-cluster.eclug.mongodb.net/phonebook?retryWrites=true&w=majority`;

// mongoose.connect(url, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false,
//   useCreateIndex: true,
// });

// const contactSchema = new mongoose.Schema({
//   name: String,
//   number: Number,
// });

// const Contact = mongoose.model("Contact", contactSchema);

// const contact = new Contact({
//   name: `${process.argv[3]}`,
//   number: +`${process.argv[4]}`,
// });

// contact.save().then((result) => {
//   mongoose.connection.close();
// });

// if (!process.argv[4]) {
//   Contact.find({}).then((result) =>
//     result.forEach((res) => {
//       console.log(res);
//       mongoose.connection.close();
//     })
//   );
// }
