const express = require("express");
const router = express.Router();
const multer = require("multer");
const pdfParse = require("pdf-parse");
const fs = require("fs");
const db = require("../db");

// File storage config
const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("resume"), async (req, res) => {
    try {
        const dataBuffer = fs.readFileSync(req.file.path);
        const pdfData = await pdfParse(dataBuffer);

        const resumeText = pdfData.text;

        // Dummy AI parsing (we improve next step)
        const skills = "Python, Java, SQL";
        const experience = "Fresher";

        const query = `
            INSERT INTO resumes (user_id, resume_text, skills, experience)
            VALUES (?, ?, ?, ?)
        `;

        db.query(query, [
            req.body.user_id,
            resumeText,
            skills,
            experience
        ]);

        res.json({ message: "Resume uploaded and parsed successfully" });
    } catch (err) {
        res.status(500).json({ error: "Resume processing failed" });
    }
});

module.exports = router;
