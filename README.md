# 🌐 Sristi's Interactive REST API Portfolio

Welcome! This is not your typical portfolio. It's a fully interactive developer workspace modeled after modern API clients like Postman, Insomnia, and Swagger UI.

Here, you don't just read about my projects and skills—you **query** them! 🚀

---

## ⚡ Live Playground Overview

This portfolio is structured as an API sandbox that simulates a live backend engine:
* **Interactive URL Ingress Bar**: Toggle parameters and send mock HTTP calls.
* **Dual-Pane Response Dashboard**: Switch between a custom **Visualizer (UI)**, raw syntax-highlighted **JSON**, and **API Documentation**.
* **Mock stdout Console**: View live-updating terminal logs capturing database queries, ingress metrics, and routing latency.

---

## 🛠️ The Tech Stack

This project is built using:
* **Core**: React 19 + TypeScript + Vite 6
* **Styling**: Tailwind CSS v4 (providing glassmorphism and modern dark panel accents)
* **Icons & Motion**: Lucide React + Motion (framer-motion)
* **DevOps**: Automated CI/CD deployment to GitHub Pages via GitHub Actions

---

## 📂 API Endpoint Directory

Here are the endpoints you can inspect in the workspace:
* `GET /` — Welcome dashboard and hardware metrics telemetry
* `GET /about` — Biography, technical obsession stack, and design philosophy
* `GET /experience` — Stepper work timeline detailing achievements at **Amazon (Alexa & Music)** and **Microsoft**
* `GET /skills` — Interactive proficiency sliders and grouped libraries/infrastructure tags
* `GET /projects` — Deployed systems dataset and repository specs
* `POST /contact` — Asynchronous form dispatcher directly to my mailbox (and local session memory)
* `GET /stats` — Real-time virtual machine load factors and latency distribution charts

---

## 🚀 Setting Up Locally

If you want to run this sandbox environment on your local machine:

1. **Clone the repository**
   ```bash
   git clone https://github.com/judyhopps24/Portfolio.git
   cd Portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure local environment variables**
   Create a `.env` file in the root directory:
   ```env
   VITE_GA_ID="your_google_analytics_measurement_id" # Optional
   ```

4. **Launch the development server**
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser to play with it!

---

## 👋 A Note to Visitors

> "I build backend systems that are robust, highly observable, and engineered to scale gracefully. I hope this interactive API client interface gives you a transparent look into how I structure data and model interfaces."

Thanks for stopping by! If you'd like to schedule an interview or discuss a project, feel free to use the `POST /contact` endpoint inside the app to send a direct message, or email me at [emailsristi@gmail.com](mailto:emailsristi@gmail.com).

*Happy Querying!*
