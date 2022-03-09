require("dotenv").config();
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Routes
app.use("/api/auth", require("./routes/authRouter"));
app.use("/api/task", require("./routes/taskRouter"));

const URI = process.env.MONGODB_URL;

mongoose.connect(
  URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log(`Connected to mongodb.`);
  }
);

const isProduction = process.env.PRODUCTION == "true" || process.env.PRODUCTION == true
const port = process.env.PORT || 3123;

app.listen(port, () =>
  console.log(`Prueba Colpatria | Sophos Solutions Backend Running on ${isProduction ? process.env.PROD_BASE_URL : process.env.LOCAL_BASE_URL + ':' + port}`)
);
