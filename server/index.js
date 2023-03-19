const express = require('express');
const cors = require('cors');
const dotenv = require("dotenv");
const shopRouter = require('./routes/index');
const mongoose = require("mongoose");
const Shop = require('./models/Shop');

const app = express();

// middleware
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

// connect mongodb
const URL = process.env.MONGODB_URL || "mongodb://localhost:27017/nearby-shops";
mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, err => {
  if(err) 
      throw err;
  console.log('Connected to mongodb')
})

app.use('/api/shop', shopRouter);

app.get('/', (req, res) => {
    res.status(200).json("Wellcome home")
});



const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
