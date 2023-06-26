import express from "express";
import cors from "cors";
import compressRoute from "./routes/compress.js";
// import next from "next"

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/compress", compressRoute);

export default app;
