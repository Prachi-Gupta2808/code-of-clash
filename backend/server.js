const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { protect } = require("./src/middlewares/authMiddleware.js");

const app = express();

require("./src/libs/db.js");

const authRoutes = require("./src/routes/authRoutes");
const { uploadAvatar } = require("./src/controllers/uploadController.js");

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.post("/api/upload/avatar", protect, uploadAvatar);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
