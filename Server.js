// server.js — June's Sensation Backend
import express from "express";
import bodyParser from "body-parser";
import path from "path";
import fs from "fs";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(express.static("public")); // serve your HTML, CSS, JS from 'public' folder

// Simple in-memory data (replace later with database)
let totalBalance = 0;
let savings = 0;

// ===== ROUTES =====

// Homepage
app.get("/", (req, res) => {
  res.sendFile(path.resolve("public/index.html"));
});

// Handle booking submission
app.post("/api/book", (req, res) => {
  const { name, service, date, time } = req.body;
  console.log(`Booking received from ${name}: ${service} at ${date} ${time}`);
  res.json({ success: true, message: "Booking received successfully!" });
});

// Handle job enquiry
app.post("/api/enquiry", (req, res) => {
  const { name, email, message } = req.body;
  console.log(`Job enquiry from ${name} (${email}): ${message}`);
  res.json({ success: true, message: "Job enquiry received successfully!" });
});

// Handle daily earnings submission
app.post("/api/earnings", (req, res) => {
  const { amount } = req.body;
  const savePart = amount * 0.10;
  const dailyPart = amount - savePart;

  totalBalance += dailyPart;
  savings += savePart;

  res.json({
    success: true,
    message: "Earnings recorded successfully.",
    totalBalance,
    savings,
  });
});

// Withdraw daily earnings — anytime
app.post("/api/withdraw/daily", (req, res) => {
  if (totalBalance > 0) {
    const withdrawn = totalBalance;
    totalBalance = 0;
    res.json({ success: true, withdrawn, message: "Daily balance withdrawn." });
  } else {
    res.json({ success: false, message: "No daily balance to withdraw." });
  }
});

// Withdraw savings — only on 29th
app.post("/api/withdraw/savings", (req, res) => {
  const today = new Date();
  if (today.getDate() !== 29) {
    return res.json({
      success: false,
      message: "Savings withdrawals only allowed on 29th of each month.",
    });
  }

  if (savings > 0) {
    const withdrawn = savings;
    savings = 0;
    res.json({ success: true, withdrawn, message: "Savings withdrawn successfully!" });
  } else {
    res.json({ success: false, message: "No savings available to withdraw." });
  }
});

// ===== Payment Placeholder (for M-Pesa or Stripe later) =====
app.post("/api/pay", (req, res) => {
  const { amount } = req.body;
  console.log(`Simulated payment of KSh ${amount}`);
  res.json({ success: true, message: `Payment of KSh ${amount} processed.` });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});