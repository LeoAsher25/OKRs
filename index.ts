import dotenv from "dotenv";
dotenv.config();

import express from "express";
import rootPath from "src/constants/root-path";
import mainRouter from "src/routes/index";
const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(rootPath + "/public"));
app.use("/api/v1", mainRouter);

app.listen(port, () => {
  console.log(`OKRs app is listening at http://localhost:${port}`);
});
