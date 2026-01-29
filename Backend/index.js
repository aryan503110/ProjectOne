import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./Routes/authRoutes.js";
import mongoose from "mongoose";
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(cookieParser());
app.use("/api/auth", router);

mongoose.connect(
  "mongodb+srv://aryan_3110:%40ryan503110@clusterone.wzoecrf.mongodb.net/ProjectOne?appName=ClusterOne",
);

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
