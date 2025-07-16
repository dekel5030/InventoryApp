# 🧾 Inventory Management App

A simple inventory management system built with **Node.js**, **Express**, **PostgreSQL**, and **EJS** using a **RESTful architecture**.

🔗 **Live Demo**: [InventoryApp on Render](https://inventoryapp-jeg9.onrender.com/categories)

---

## 🚀 Features

- View, create, update, and delete **categories** and **items**
- Upload and preview images for both categories and items
- Form validation using **express-validator**
- Responsive UI with **light/dark mode** toggle
- Admin password prompt (via JavaScript) for secure edit/delete actions
- Fully **RESTful routes** following best practices

---

## 🛠️ Built With

- **Node.js** & **Express** – backend and routing
- **PostgreSQL** – relational database
- **EJS** – server-side rendering and templating
- **Multer** – file/image upload middleware
- **Express-Validator** – request body and parameter validation
- **Vanilla JavaScript** – front-end interactions
- **CSS** – custom styles with theme variables
- **Neon.tech** – free managed PostgreSQL hosting
- **Render.com** – free deployment platform for the app

---

## 🌐 RESTful Routing

The app follows RESTful conventions for clean and maintainable routes:

| Action          | Route                          | HTTP Verb |
|-----------------|--------------------------------|-----------|
| View all items  | `/items`                       | GET       |
| View item       | `/items/:id`                   | GET       |
| New item form   | `/items/new`                   | GET       |
| Create item     | `/items`                       | POST      |
| Edit item form  | `/items/:id/edit`              | GET       |
| Update item     | `/items/:id`                   | PATCH     |
| Delete item     | `/items/:id`                   | DELETE    |
| (Same for categories) | `/categories/...`        | ...       |

---

## 📂 Project Structure

