const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./src/db");
const app = express();
const PORT = 3000; 
const userProfileRoutes = require("./src/routes/userProfileRoutes");

app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }));
app.use("/api/user", userProfileRoutes);

// API to save image
app.post("/save-image", (req, res) => {
  const { imageName, imageData } = req.body;
  const savePath = path.join(__dirname, "src/assets/images", imageName);

  fs.writeFile(savePath, imageData, "base64", (err) => {
    if (err) {
      console.error("Error saving image:", err);
      return res.json({ success: false, error: err });
    }
    console.log("Image saved successfully:", savePath);
    res.json({ success: true });
  });
});

connectDB();
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
