const db = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const SECRET = "interview_secret_key";

/**
 * REGISTER USER
 */
exports.registerUser = (req, res) => {
    const { full_name, email, password } = req.body;

    if (!full_name || !email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const password_hash = bcrypt.hashSync(password, 10);

    const query = `
        INSERT INTO users (full_name, email, password_hash)
        VALUES (?, ?, ?)
    `;

    db.query(query, [full_name, email, password_hash], (err) => {
        if (err) {
            return res.status(400).json({ error: "Email already exists" });
        }
        res.json({ message: "User registered successfully" });
    });
};

/**
 * LOGIN USER
 */
exports.loginUser = (req, res) => {
    const { email, password } = req.body;

    const query = "SELECT * FROM users WHERE email = ?";

    db.query(query, [email], (err, results) => {
        if (results.length === 0) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const user = results[0];
        const isMatch = bcrypt.compareSync(password, user.password_hash);

        if (!isMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign(
            { user_id: user.user_id, role: user.role },
            SECRET,
            { expiresIn: "1h" }
        );

        res.json({
            token,
            user: {
                user_id: user.user_id,
                full_name: user.full_name,
                email: user.email,
                role: user.role
            }
        });
    });
};
