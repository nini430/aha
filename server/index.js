require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRouter=require("./routes/userRoutes")
const errorHandler=require("./middleware/errorHandler")


const app = express();

app.use(cors());

app.use(express.json());

 

app.use('/api/auth',userRouter);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log('database connected');
  })
  .catch(() => {
    console.log('data base unsuccesfull');
  });

app.use(errorHandler)
const server = app.listen(process.env.PORT, () => {
  console.log(`app is listening to the port ${process.env.PORT}`);
});


