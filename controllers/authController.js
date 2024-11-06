    const User = require("../models/User");
    const jwt = require("jsonwebtoken");
    const bcrypt = require("bcrypt");

    exports.register = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = new User({ username, password });
        await user.save();
        res.status(201).json({ message: "User registered" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    };

    exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(404).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
        return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
        });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    };
