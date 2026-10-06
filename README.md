# 💰 Expense Splitter

A simple, fast web app to track group expenses and automatically calculate who owes whom. No signup, no backend — everything runs in your browser.

## 🌐 Live Demo
👉 **https://rj-expense-splitter.vercel.app**

## 💡 Why I Built This
Splitting expenses in hostels, group trips, and shared flats is a common headache in India. People either forget who paid what, or spend hours manually calculating settlements on paper or WhatsApp.

This tool solves that:
1. Add your group members once
2. Log every expense as it happens
3. Get an instant, accurate settlement plan — no manual math

## ✨ Features
- **Add Members** — build your group in seconds
- **Log Expenses** — description, amount, and who paid
- **Auto Settlement** — calculates the minimum number of transactions needed to settle up
- **Persistent Storage** — data saved in browser (localStorage), survives page refresh
- **No Signup, No Backend** — 100% client-side, privacy-friendly
- **Reset Anytime** — clear everything with one click

## 🛠️ Tech Stack
- HTML5
- CSS3
- JavaScript (Vanilla)
- localStorage (browser storage)
- Vercel (Deployment)

## 📂 Project Structure

expense-splitter/
├── index.html
├── style.css
├── script.js
└── README.md

## 🚀 How to Run Locally
1. Clone the repo:
   git clone https://github.com/ravirajhere/expense-splitter.git
2. Navigate into the folder:
   cd expense-splitter
3. Open index.html in your browser. That's it — no installation needed.

## 🧠 What I Learned From This Project
- Managing application state in vanilla JavaScript
- Using localStorage for data persistence
- Implementing a debt-settlement algorithm (minimizing transactions)
- Dynamic DOM rendering based on state changes
- Full deployment workflow: GitHub → Vercel

## 🔮 Future Improvements
- Unequal splits (some people pay for only part of an expense)
- Export settlement as PDF or image
- Multi-group support (switch between different trips/groups)
- Cloud sync so multiple people can edit the same group

## 👤 Author
**Raviraj**  
GitHub: [@ravirajhere](https://github.com/ravirajhere)
