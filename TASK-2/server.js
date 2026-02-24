const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// DATABASE CONNECTION
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'venky',
    database: 'university_db'
});

db.connect(err => {
    if (err) {
        console.log("DB Error:", err);
    } else {
        console.log("Database Connected");
    }
});


// ================= ROUTES =================

// GET ALL STUDENTS
app.get('/students', (req, res) => {
    db.query(
        "SELECT name,email,dept,DOB FROM student_records",
        (err, result) => {
            if (err) return res.json({ success:false, message:err.message });
            res.json({ success:true, data:result });
        }
    );
});

// SORT BY NAME
app.get('/students/sort/name', (req, res) => {
    db.query(
        "SELECT name,email,dept,DOB FROM student_records ORDER BY name ASC",
        (err, result) => res.json({ success:true, data:result })
    );
});

// SORT BY DOB
app.get('/students/sort/dob', (req, res) => {
    db.query(
        "SELECT name,email,dept,DOB FROM student_records ORDER BY DOB ASC",
        (err, result) => res.json({ success:true, data:result })
    );
});

// FILTER BY DEPARTMENT
app.get('/students/filter/:dept', (req, res) => {
    db.query(
        "SELECT name,email,dept,DOB FROM student_records WHERE dept=?",
        [req.params.dept],
        (err, result) => res.json({ success:true, data:result })
    );
});

// COUNT PER DEPARTMENT
app.get('/students/count', (req, res) => {
    db.query(
        "SELECT dept, COUNT(*) AS total FROM student_records GROUP BY dept",
        (err, result) => res.json({ success:true, data:result })
    );
});


// SERVER START
app.listen(3000, () => {
    console.log("Server running on port 3000");
});
