const express=require("express")
const app=express()
const mongoose=require("mongoose")
const dotenv=require("dotenv").config()
const cors=require("cors")

const authRoutes=require("./routes/auth")

app.use(cors())
app.use(express.json())
app.use(express.static('public'))

//routes
app.use("/auth",authRoutes)

const PORT=3001;

const dbURI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.lqes229.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(dbURI, {
  useNewUrlParser: true, // Only if you're using a version older than 4.0.0
  useUnifiedTopology: true // Only if you're using a version older than 4.0.0
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });
