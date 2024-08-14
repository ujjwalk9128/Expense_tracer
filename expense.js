const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from "public" folder

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/expense-tracker', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Schema for Expense
const expenseSchema = new mongoose.Schema({
    text: String,
    amount: Number,
    date: { type: Date, default: Date.now }
});

const Expense = mongoose.model('Expense', expenseSchema);

// Routes
app.post('/add-expense', async (req, res) => {
    const { text, amount } = req.body;
    const expense = new Expense({ text, amount });
    await expense.save();
    res.send({ message: 'Expense added successfully!' });
});

app.get('/get-expenses', async (req, res) => {
    const expenses = await Expense.find();
    res.send(expenses);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
