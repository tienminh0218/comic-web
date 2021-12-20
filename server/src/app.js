import express from "express";
import helmet from "helmet";
import cors from "cors";
import "dotenv/config";
import createError from "http-errors";
import morgan from "morgan";

import route from "./routes";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(morgan("combined"));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin: process.env.ORIGIN_URL,
        optionsSuccessStatus: 200,
    })
);

route(app);
app.use((req, res, next) => {
    next(createError(404, "Not Found Bro"));
});
app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        status: error.status || 500,
        message: error.message,
    });
});

app.listen(PORT, () => {
    console.log(`Server running bủ bủ lmao on http://localhost:${PORT}`);
});
