<<<<<<< HEAD
// const express = require('express')
// const app = express()
// const port = 5000
// const mongoDB=require("./db")
=======
const express = require('express')
const app = express()
const port = 5000
const mongoDB=require("./db")
>>>>>>> 733d020a283932d867b02ac221e712f38d1ccb47

// app.use((req,res,next)=>{
//   res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-with, Content-Type, Accept"
//   );
//   next();
// })

<<<<<<< HEAD
// mongoDB();
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })
// app.use(express.json())
// app.use('/api',require("./routes/CreateUser"));
// app.use('/api',require("./routes/DisplayData"));
// app.use('/api',require("./routes/OrdersData"));
// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })


const express = require('express');
const app = express();
const mongoDB = require("./db");

// Middleware for CORS (Replace "http://localhost:3000" with your Netlify frontend URL)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://golden-stroopwafel-2ae514.netlify.app/");
=======
app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","*");
>>>>>>> 733d020a283932d867b02ac221e712f38d1ccb47
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
<<<<<<< HEAD
  next();
});

// Initialize MongoDB
mongoDB();

// Routes
app.use(express.json());
app.use('/api', require("./routes/CreateUser"));
app.use('/api', require("./routes/DisplayData"));
app.use('/api', require("./routes/OrdersData"));

// Vercel expects a serverless export (remove app.listen)
module.exports = app;
=======
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
})

mongoDB();
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use(express.json())
app.use('/api',require("./routes/CreateUser"));
app.use('/api',require("./routes/DisplayData"));
app.use('/api',require("./routes/OrdersData"));
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
>>>>>>> 733d020a283932d867b02ac221e712f38d1ccb47
