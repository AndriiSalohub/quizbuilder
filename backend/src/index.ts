import express from "express";
import sequelize from "../models";
import dotenv from "dotenv";
import cors from "cors";
import quizRouter from "./routes/quiz.routes";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("", quizRouter);

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("Database connection established successfully.");

    await sequelize.sync({ force: false });
    console.log("All models synchronized.");

    const PORT = parseInt(process.env.PORT || "3000", 10);
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to start server:", error);
  }
}

startServer();
