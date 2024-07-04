const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const router = express.Router();
const User = require('../models/User.js');
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

router.post("/createuser", [
    body('email').isEmail().withMessage("Incorrect Email"),
    body('password').isLength({ min: 5 }).withMessage("Password must be of at least 5 letters"),
    body('name').isLength({ min: 5 }).withMessage("Name must be of at least 5 letters")],
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, message: "Enter valid credentials", errors: errors.array() })
        }

        const existing = await User.exists({ email: req.body.email });
        if (existing) {
            res.json({ success: false, message: "Email is already in use" });
            return;
        }
        
        const salt = await bcrypt.genSalt(10);
        try {
            let securedPassword = await bcrypt.hash(req.body.password, salt);
            await User.create({
                name: req.body.name,
                password: securedPassword,
                email: req.body.email,
                location: req.body.location
            });
            res.json({
                success: true,
                message: "User Successfully Added!",
            }
            )
        } catch (error) {
            console.log(error);
            res.json({ success: false, message: "Some Error Occurred" })
        }

    })


router.post("/loginuser", [
    body('email').isEmail(),
    body('password').isLength({ min: 5 })],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const email = req.body.email;
        const password = req.body.password;
        try {
            const userData = await User.findOne({ email }).select("+password");
            if (!userData) {
                return res.status(400).json({ error: "Wrong email or password!" })
            }

            const comparePassword = await bcrypt.compare(password, userData.password);
            if (!comparePassword) {
                return res.status(400).json({ error: "Wrong email or password!" })
            }

            const data = {
                user: {
                    id: userData.id
                }
            }
            const authToken = jwt.sign(data, jwtSecret);
            return res.json({ success: true, authToken: authToken });

        } catch (error) {
            console.log(error);
            res.json({ success: false, message: "Some Error Occurred" })
        }
    }
);

module.exports = router;