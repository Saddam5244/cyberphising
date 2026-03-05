const express = require('express');
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const app = express();
const cors = require('cors');
const path = require("path");
const AuthRouter = require('./Routes/AuthRouter')
require('dotenv').config();
require('./Models/db');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


function detectPhishing(message) {
    const phishingKeywords = [
        "urgent",
        "verify your account",
        "click here",
        "login now",
        "password",
        "bank",
        "otp",
        "win money",
        "free gift"
    ];

    let score = 0;

    phishingKeywords.forEach(keyword => {
        if (message.toLowerCase().includes(keyword)) {
            score++;
        }
    });

    if (score >= 2) {
        return {
            status: "PHISHING",
            confidence: 85,
            action: "Message Quarantined",
            warning: "Suspicious content detected!"
        };
    } else {
        return {
            status: "SAFE",
            confidence: 95,
            action: "No Action Needed",
            warning: "Message appears safe."
        };
    }
}


app.post("/scan", (req, res) => {
    try {
        const message = req.body?.message;

        if (!message) {
            return res.status(400).json({ error: "Message is required" });
        }

        const result = detectPhishing(message);
        res.json(result);

    } catch (error) {
        console.error("Scan Error:", error);
        res.status(500).json({ error: "Server Error" });
    }
});

const PORT = process.env.PORT || 8080;
const SECRET_KEY = "mysecretkey";
let users = [];


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));



app.use('/api/auth',AuthRouter)
app.use(express.static(path.join(__dirname, "../Frontend")));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "../Frontend/Phising.html"));
});
app.get("/Register", (req, res) => {
    res.sendFile(path.join(__dirname, "../Frontend/Register.html"));
});
app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "../Frontend/login.html"));
});
app.get("/cyber", (req, res) => {
    res.sendFile(path.join(__dirname, "../Frontend/cyber.html"));
});

app.listen(PORT, () =>{
    console.log(`Server is running on http://localhost:${PORT}`)
})

