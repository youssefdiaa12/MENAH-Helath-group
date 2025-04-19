const express = require("express");
const connectDB = require('./config/db');
const cors = require("cors");

const babyRoutes = require('./routes/babyRoutes');
const motherRoutes = require('./routes/motherRoutes');
const adminRoutes = require('./routes/adminRoutes');
const nurseRoutes = require('./routes/nurseRoutes');
const parentRoutes = require('./routes/parentRoutes');
const facePhotoRoutes = require('./routes/facePhotoRoutes');
const footPrintRoutes = require('./routes/footPrintRoutes');
const retinaPrintRoutes = require('./routes/retinaPrintRoutes');
const motherFingerPrintRoutes = require('./routes/motherFingerPrintRoutes');
const motherIDRoutes = require('./routes/motherIDRoutes');
const qrCodeRoutes = require('./routes/qrCodeRoutes');

connectDB();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/babies", babyRoutes);
app.use("/api/mothers", motherRoutes);
app.use("/api/admins", adminRoutes);
app.use("/api/nurses", nurseRoutes);
app.use("/api/parents", parentRoutes);
app.use("/api/facephotos", facePhotoRoutes);
app.use("/api/footprints", footPrintRoutes);
app.use("/api/retinaprints", retinaPrintRoutes);
app.use("/api/motherfingerprints", motherFingerPrintRoutes);
app.use("/api/motherids", motherIDRoutes);
app.use("/api/qrcodes", qrCodeRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running successfully.");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
