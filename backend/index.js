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
  "http://localhost:3000", // For local development
  "https://guileless-blini-b9248d.netlify.app", // Your Netlify frontend
];

// Enhanced CORS middleware
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Credentials", "true");
  }
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header(
    "Access-Control-Allow-Methods", 
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Database connection
mongoDB();

// Middleware
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api', require("./routes/CreateUser"));
app.use('/api', require("./routes/DisplayData"));
app.use('/api', require("./routes/OrdersData"));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});