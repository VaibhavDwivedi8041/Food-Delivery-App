// const express = require('express')
// const app = express()
// const port = 5000
// const mongoDB=require("./db")

// app.use((req,res,next)=>{
//   res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-with, Content-Type, Accept"
//   );
//   next();
// })

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
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
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
