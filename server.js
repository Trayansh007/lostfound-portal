const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/lostfound")
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

const ItemSchema = new mongoose.Schema({
  itemName: String,
  description: String,
  location: String,
  imagePath: String
});
const Item = mongoose.model("Item", ItemSchema);

const FoundSchema = new mongoose.Schema({
  itemName: String,
  description: String,
  location: String,
  imagePath: String
});
const FoundItem = mongoose.model("FoundItem", FoundSchema);

const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

app.post("/report-lost", upload.single("itemImage"), async (req, res) => {
  const newItem = new Item({
    itemName: req.body.itemName,
    description: req.body.description,
    location: req.body.location,
    imagePath: req.file ? req.file.filename : null
  });
  await newItem.save();
  res.send("Lost item report saved successfully!");
});

app.post("/report-found", upload.single("itemImage"), async (req, res) => {
  const newFoundItem = new FoundItem({
    itemName: req.body.itemName,
    description: req.body.description,
    location: req.body.location,
    imagePath: req.file ? req.file.filename : null
  });
  await newFoundItem.save();
  res.send("Found item report saved successfully!");
});

app.use("/uploads", express.static("uploads"));

app.listen(3000, () => console.log("🚀 Server running on http://localhost:3000"));