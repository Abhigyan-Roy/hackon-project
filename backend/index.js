const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const port = 5000;
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
app.use(express.json());
app.use(cors());
mongoose.connect('mongodb://0.0.0.0:27017/yourDatabase', {});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("We're connected to the database!");
});
const products = [
    { id: 1, category: 'Electronics', name: 'Laptop', price: 80000 },
    { id: 2, category: 'Electronics', name: 'Smartphone', price: 9990 },
    { id: 3, category: 'Electronics', name: 'Headphones', price: 3490 },
    { id: 4, category: 'Clothing', name: 'T-Shirt', price: 200 },
    { id: 5, category: 'Clothing', name: 'Jeans', price: 600 },
    { id: 6, category: 'Clothing', name: 'Sneakers', price: 900 },
    { id: 7, category: 'Home Appliances', name: 'Coffee Maker', price: 1290 },
    { id: 8, category: 'Home Appliances', name: 'Vacuum Cleaner', price: 5990 },
    { id: 9, category: 'Home Appliances', name: 'Toaster', price: 1790 }
];

app.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        console.log(username, email, password)
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, email, password: hashedPassword });
        res.json({ message: 'User registered successfully', user });
    } catch (error) {
        res.status(500).json({ error: 'Registration failed' });
    }
});


app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        console.log(user)
        if (!user) throw new Error('User not found');
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) throw new Error('Invalid password');
        const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });
        console.log(token)
        res.json({ message: 'Login successful', token });
    } catch (error) {
        res.status(401).json({ error: 'Login failed' });
    }
});
app.get('/current-user', async (req, res) => {
    try {
        const token = req.headers.authorization?.replace('Bearer ', '');
        if (!token) throw new Error('No token provided');

        const decoded = jwt.verify(token, 'your-secret-key'); // Replace with your actual secret key
        const user = await User.findById(decoded.userId);

        if (!user) throw new Error('User not found');
        res.json({ user });
    } catch (error) {
        res.status(401).json({ error: 'Authentication failed' });
    }
});
app.get('/products', async (req, res) => {
    res.json(products);
});
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
