const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

/* DATABASE CONNECTION */
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'venky',          // your mysql password
    database: 'login_system'    // correct database
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to MySQL Database');
});


/* LOGIN API */
app.post('/login', (req, res) => {

    const { username, password } = req.body;

    if (!username || !password) {
        return res.json({
            success: false,
            message: "All fields are required"
        });
    }

    const query = `
        SELECT username
        FROM users
        WHERE username = ? AND password = ?
    `;

    db.query(query, [username, password], (err, results) => {

        if (err) {
            console.error("SQL Error:", err);
            return res.json({
                success: false,
                message: "Database error"
            });
        }

        if (results.length === 0) {
            return res.json({
                success: false,
                message: "Invalid username or password"
            });
        }

        res.json({
            success: true,
            message: "Login successful"
        });
    });
});


/* SERVER */
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
