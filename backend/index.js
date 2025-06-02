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
const port = process.env.PORT || 5000;
const mongoDB = require("./db");

// CORS Configuration
const allowedOrigins = [
  "http://localhost:3000",
  "https://your-netlify-app.netlify.app", // Replace with your Netlify URL
];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

// Database connection
mongoDB();

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.use('/api', require("./routes/CreateUser"));
app.use('/api', require("./routes/DisplayData"));
app.use('/api', require("./routes/OrdersData"));

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});