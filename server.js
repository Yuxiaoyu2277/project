const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const User = require('./models/User'); 
const Book = require('./models/book');
const app = express();



app.use(express.json());

mongoose.connect('mongodb+srv://PROJECT:2277236944@cluster0.0cxwsd6.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('error', console.error.bind(console, 'MongoDB Connection error：'));


app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'your secret key', resave: false, saveUninitialized: false }));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('login', { message: null });
});

app.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.render('login', { message: 'User already exists', messageType: 'error' });
        }
        const newUser = new User({ username, password });
        await newUser.save();
        res.render('login', { message: 'User registered successfully', messageType: 'register' });
    } catch (error) {
        console.error(error);
        res.render('login', { message: 'Error occurred during registration', messageType: 'error' });
    }
});
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.render('login', { message: 'User not found', messageType: 'error' });
        }
        if (password === user.password) {
            req.session.username = user.username;
            res.render('home', { username: user.username, books: [] });
        } else {
            res.render('login', { message: 'Invalid username or password', messageType: 'error' });
        }
    } catch (error) {
        console.error(error);
        res.render('login', { message: 'Error occurred during login', messageType: 'error' });
    }
});

app.get('/home', (req, res) => {
    if (req.session.username) {
        res.render('home', { username: req.session.username, books: [] });
    } else {
        res.redirect('/login');
    }
});

app.get('/search-book', async (req, res) => {
    try {
        const { bookId, bookName, author } = req.query;
        let query = {};
        
        if (bookId) query.id = bookId;
        if (bookName) query.name = bookName;
        if (author) query.author = author;
        const books = await Book.find(query);
        res.render('home', { username: req.session.username, books: books });
    } catch (error) {
        console.error(error);
        res.render('home', { username: req.session.username, books: [] });
    }
});


app.post('/add-book', async (req, res) => {
    try {
        const { id, name, author } = req.body;
        if (!id) {
            return res.render('home', { 
                username: req.session.username, 
                books: [],
                message: 'Book ID is required.'
            });
        }
        const existingBook = await Book.findOne({ id });
        if (existingBook) {
            return res.render('home', { 
                username: req.session.username, 
                books: [], 
                message: 'Book ID already exists.' 
            });
        }
        const newBook = new Book({ id, name, author });
        await newBook.save();
        const books = await Book.find({});
        res.render('home', { 
            username: req.session.username, 
            books: books 
        });
    } catch (error) {
        console.error(error);
        res.render('home', { 
            username: req.session.username, 
            books: [], 
            message: 'Error occurred during book addition.' 
        });
    }
});

app.post('/delete-book/:id', async (req, res) => {
    try {
        await Book.deleteOne({ id: req.params.id });
        const books = await Book.find({});
        res.render('home', { username: req.session.username, books: books });
    } catch (error) {
        console.error(error);
        res.render('home', { username: req.session.username, books: [] });
    }
});


app.post('/update-book/:id', async (req, res) => {
    try {
        const bookId = req.params.id;
        const { name, author } = req.body;
        await Book.updateOne({ id: bookId }, { name, author });

        const books = await Book.find({});
        res.render('home', { username: req.session.username, books: books });
    } catch (error) {
        console.error(error);
        res.render('home', { username: req.session.username, books: [] });
    }
});

app.post('/api/books', async (req, res) => {
    try {
        const newBook = new Book(req.body);
        const savedBook = await newBook.save();
        res.status(201).json(savedBook);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
//get
app.get('/api/books', async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
app.put('/api/books/:id', async (req, res) => {
    try {
        const bookId = req.params.id; 
        const updatedBook = await Book.findOneAndUpdate({ id: bookId }, req.body, { new: true });
        
        if (!updatedBook) {
            return res.status(404).json({ message: "Books cannot find" });
        }
        
        res.json(updatedBook);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
app.delete('/api/books/:id', async (req, res) => {
    try {
        const deletedBook = await Book.findOneAndDelete({ id: req.params.id });
        if (!deletedBook) {
            return res.status(404).json({ message: "Books cannot find" });
        }
        res.json({ message: "Book is delete form database" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//logout
app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
           
        } else {
            res.redirect('/'); 
        }
    });
});



app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

