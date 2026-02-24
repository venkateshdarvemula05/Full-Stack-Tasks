const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

/* ---------- DATABASE CONNECTION ---------- */
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'venky',              // your mysql password
    database: 'order_managements'   // <-- your schema name
});

db.connect((err) => {
    if (err) {
        console.log("Database connection failed ❌");
        console.log(err);
        return;
    }
    console.log("Connected to order_managements database ✅");
});


/* ---------- 1. CUSTOMER ORDER HISTORY ---------- */
app.get('/orders', (req, res) => {

    const query = `
        SELECT 
            c.name AS customer,
            p.name AS product,
            o.quantity,
            p.price,
            (o.quantity * p.price) AS total_amount,
            o.order_date
        FROM orders o
        JOIN customers c ON o.customer_id = c.id
        JOIN products p ON o.product_id = p.id
        ORDER BY o.order_date DESC
    `;

    db.query(query, (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
});


/* ---------- 2. HIGHEST VALUE ORDER ---------- */
app.get('/highest-order', (req, res) => {

    const query = `
        SELECT 
            c.name,
            p.name AS product,
            (o.quantity * p.price) AS total_amount
        FROM orders o
        JOIN customers c ON o.customer_id = c.id
        JOIN products p ON o.product_id = p.id
        ORDER BY total_amount DESC
        LIMIT 1
    `;

    db.query(query, (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
});


/* ---------- 3. MOST ACTIVE CUSTOMER ---------- */
app.get('/most-active', (req, res) => {

    const query = `
        SELECT c.name
        FROM customers c
        JOIN orders o ON c.id = o.customer_id
        GROUP BY c.id
        ORDER BY COUNT(*) DESC
        LIMIT 1
    `;

    db.query(query, (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
});


/* ---------- SERVER ---------- */
app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
