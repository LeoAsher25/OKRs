import dotenv from "dotenv";
dotenv.config();

import express from "express";
import connectDB from "src/config/mongodb";
import rootPath from "src/constants/root-path";
import ErrorHandler from "src/middleware/error-handler";
import mainRouter from "src/routes/index";
const port = process.env.PORT || 3000;

connectDB();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(rootPath + "/public"));

app.use("/api/v1", mainRouter);
app.use(ErrorHandler);

app.listen(port, () => {
  console.log(`OKRs app is listening at http://localhost:${port}`);
});
