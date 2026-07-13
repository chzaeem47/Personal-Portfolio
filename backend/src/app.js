require("dotenv").config();

const express = require("express");
const cors = require("cors");
const emailRouter = require("./routers/email.router");

const app = express();

app.use(cors({
    origin: [
        "http://localhost:5500",
        "http://127.0.0.1:5500",
        "http://127.0.0.1:5501",

        // your live frontend URL
        "https://personal-portfolio-6fpg.vercel.app",
        "https://z-portfolio-nine-blond.vercel.app",
        "https://za-portfolio-orcin.vercel.app"
    ],
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Portfolio backend is running");
});

app.use("/api", emailRouter);

module.exports = app;