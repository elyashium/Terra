const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

// Load env vars
dotenv.config();

// Route files
const auth = require("./routes/auth");
const carbonFootprint = require("./routes/carbonFootprint");

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('MongoDB Connection Error:', err));

// Mount routers
app.use("/api/auth", auth);
app.use("/api/carbon", carbonFootprint);

// Basic route
app.get("/", (req, res) => {
  res.send("Terra API is running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
