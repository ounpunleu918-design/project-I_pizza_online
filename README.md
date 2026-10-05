# 🍕 D-Pizza Online Ordering Website

A full-stack online pizza ordering web application built with **Python Flask** for the backend and **ReactJS / Vite** for the frontend.

## 🛠️ Technologies

* **Frontend:** ReactJS, Vite, HTML, CSS, JavaScript
* **Backend:** Python, Flask
* **Database:** PostgreSQL
* **API:** REST API
* **Version Control:** Git & GitHub

---

## 📋 Prerequisites

Before running the project, make sure you have installed:

* [Node.js](https://nodejs.org/) — required for the frontend
* [Python](https://www.python.org/) — required for the backend
* [PostgreSQL](https://www.postgresql.org/) — required for the database
* Git — required to clone the repository

You can check whether they are installed by running:

```bash
node --version
npm --version
python --version
git --version
```

---

## 🚀 Getting Started

### 1. Clone the Repository

Open **PowerShell** or **Command Prompt** and run:

```bash
git clone https://github.com/ounpunleu918-design/project-I_pizza_online.git
cd project-I_pizza_online
```

---

### 2. Setup the Backend

Open a terminal and navigate to the `Backend` directory:

```bash
cd Backend
```

Install the required Python packages:

```bash
pip install -r requirements.txt
```

Then start the Flask backend server:

```bash
python main.py
```

The backend will run at:

```text
http://127.0.0.1:5000
```

> Keep this terminal running while using the website.

---

### 3. Setup the Frontend

Open a **new terminal window**.

Navigate to the project directory first:

```bash
cd project-I_pizza_online
```

Then enter the `Frontend` directory:

```bash
cd Frontend
```

Install the required Node.js packages:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

The frontend will normally run at:

```text
http://localhost:5173
```

Open the URL in your browser to access the website.

---

## 🗄️ Database Setup

This project uses **PostgreSQL** as the database.

Before running the backend, make sure:

1. PostgreSQL is installed and running.
2. The required database has been created.
3. The database connection settings in the backend are configured correctly.
4. The required tables have been created.

If the project contains a database initialization script, run it according to the project configuration.

---

## 📁 Project Structure

```text
project-I_pizza_online/
│
├── Backend/
│   ├── main.py
│   ├── requirements.txt
│   └── ...
│
├── Frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   └── ...
│
└── README.md
```

---

## ▶️ Running the Project

You need to run **both Backend and Frontend**.

### Terminal 1 — Backend

```bash
cd project-I_pizza_online
cd Backend
pip install -r requirements.txt
python main.py
```

### Terminal 2 — Frontend

```bash
cd project-I_pizza_online
cd Frontend
npm install
npm run dev
```

Then open:

```text
http://localhost:5173
```

---

## ✨ Main Features

* 👤 User Registration & Login
* 🍕 Browse Pizza Products
* 🔎 View Pizza Details
* 🛒 Add Products to Cart
* 📦 Place Orders
* 🧾 View Order History
* 👨‍💼 Admin Management
* 💳 Order & Payment Management
* 🗄️ PostgreSQL Database

---

## 👨‍💻 Author

**OUN PUNLEU**

Computer Science Student

GitHub:
https://github.com/ounpunleu918-design

---

## 📄 License

This project was developed for educational and academic purposes.
