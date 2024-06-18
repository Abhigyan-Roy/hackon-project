const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const port = 5000;
const User = require('./models/User');
const bcrypt = require('bcryptjs');
app.use(express.json());
app.use(cors());
mongoose.connect('mongodb://0.0.0.0:27017/yourDatabase', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("We're connected to the database!");
});
app.post('/api/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });
        await user.save();

        res.status(201).send('User registered successfully');
    } catch (error) {
        res.status(500).send('Error registering new user');
    }
});

app.post('/api/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user && await bcrypt.compare(req.body.password, user.password)) {
            res.send('User logged in successfully');
        } else {
            res.status(400).send('Invalid credentials');
        }
    } catch (error) {
        res.status(500).send('Error logging in user');
    }
});
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
