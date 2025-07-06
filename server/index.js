import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/routes.js";
import DBConnection from "./database/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", router);

DBConnection();

app.listen(PORT, () => console.log(`🚀 Server is running on PORT ${PORT}`));
