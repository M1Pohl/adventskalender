import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

let bookings = {};

app.get("/api/bookings", (req, res) => {
res.json(bookings);
});

app.post("/api/bookings", async (req, res) => {
const { day, name } = req.body;

if (bookings[day]) {
return res.json({ success: false, error: "Tag bereits gebucht!" });
}

bookings[day] = name;

try {
const transporter = nodemailer.createTransport({
service: "gmail",
auth: {
user: process.env.MAIL_USER,
pass: process.env.MAIL_PASS,
},
});

await transporter.sendMail({
from: process.env.MAIL_USER,
to: process.env.MAIL_RECEIVER,
subject: `Neue Buchung für den ${day}. Dezember`,
text: `${name} hat sich für den ${day}. Dezember eingetragen.`,
});
} catch (error) {
console.error("E-Mail Fehler:", error);
}

res.json({ success: true });
});

app.listen(3000, () => console.log("Backend läuft auf Port 3000"));