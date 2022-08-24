const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "456456",
    database: "user_list",
    port: "8080",
});
const app = express();
app.use(express.json());
app.use(cors());
const port = 2222;
app.post("/create", (req, res) => {
    const name = req.body.name;
    const age = req.body.age;
    const email = req.body.email;
    try {
        db.query(
            "INSERT INTO users (name, age, email) VALUES (?, ?, ?)",
            [name, age, email]
        );
    } catch (e) {
        console.log(e);
    }
});
app.get("/get", (req, res) => {
    db.query("SELECT * FROM users", (err, result) => {
        if (err) return console.log(err);
        res.send(result);
    });
});
app.delete("/clear", (req, res) => {
    db.query("DELETE FROM users", (err, result) => {
        if (!err) {
            res.send(result);
        } else {
            console.log(err);
        }
    });
});
app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    const deleteUser = "DELETE FROM users WHERE id = ?;";
    db.query(deleteUser, id, (err, result) => {
        if (err) throw err;
    });
});
app.listen(port, () =>
    console.log(`Server is running on http://localhost:${port}...`)
);
app.get("/", (req, res) => {
    res.send("Everything is fine");
});
app.put("/update", (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const age = req.body.age;
    const email = req.body.email;
    if (id && name && age && email) {
        const updateUser =
            "UPDATE users SET name = ? , age = ?, email = ? WHERE id = ?";
        db.query(updateUser, [name, age, email, id], (err, result) => {
            if (err) throw err;
            console.log(result);
        });
    }
});
