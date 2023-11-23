const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const User = require('./models/User');
const Book = require('./models/book');
const app = express();
const moment = require('moment-timezone');



app.use(express.json());

mongoose.connect('mongodb+srv://PROJECT:2277236944@cluster0.0cxwsd6.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('error', console.error.bind(console, 'MongoDB Connection error：'));


app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'your secret key', resave: false, saveUninitialized: false }));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    const currentTime = moment().tz('Asia/Shanghai').format('YYYY-MM-DD HH:mm:ss');

    res.render('login', { message: null, currentTime });

});

app.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            const currentTime = moment().tz('Asia/Shanghai').format('YYYY-MM-DD HH:mm:ss');
            return res.render('login', { message: 'User already exists', messageType: 'error', currentTime });
        }
        const newUser = new User({ username, password });
        await newUser.save();
        const currentTime = moment().tz('Asia/Shanghai').format('YYYY-MM-DD HH:mm:ss');
        res.render('login', { message: 'User registered successfully', messageType: 'register', currentTime });
    } catch (error) {
        console.error(error);
        const currentTime = moment().tz('Asia/Shanghai').format('YYYY-MM-DD HH:mm:ss');
        res.render('login', { message: 'Error occurred during registration', messageType: 'error', currentTime });
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
            const currentTimehome = moment().tz('Asia/Shanghai').format('YYYY-MM-DD HH:mm:ss');
            req.session.username = user.username;
            res.render('home', { username: user.username, books: [], currentTimehome });
        } else {
            res.render('login', { message: 'Invalid username or password', messageType: 'error' });
        }
    } catch (error) {
        console.error(error);
        res.render('login', { message: 'Error occurred during login', messageType: 'error' });
    }
});

app.get('/home', (req, res) => {
    const currentTimehome = moment().tz('Asia/Shanghai').format('YYYY-MM-DD HH:mm:ss');

    if (req.session.username) {
        res.render('home', { username: req.session.username, books: [], currentTimehome });
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
        const currentTimehome = moment().tz('Asia/Shanghai').format('YYYY-MM-DD HH:mm:ss');
        const books = await Book.find(query); // 假设这是你的查询逻辑
        res.render('home', { username: req.session.username, books: books, currentTimehome });
    } catch (error) {
        console.error(error);
        res.render('home', { username: req.session.username, books: [] });
    }
});


app.post('/add-book', async (req, res) => {
    try {
        const { id, name, author } = req.body;
        if (!id) {
            const currentTimehome = moment().tz('Asia/Shanghai').format('YYYY-MM-DD HH:mm:ss');
            return res.render('home', {
                username: req.session.username,
                books: [],
                message: 'Book ID is required.',
                currentTimehome
            });
        }
        const existingBook = await Book.findOne({ id });
        if (existingBook) {
            const currentTimehome = moment().tz('Asia/Shanghai').format('YYYY-MM-DD HH:mm:ss');
            return res.render('home', {
                username: req.session.username,
                books: [],
                message: 'Book ID already exists.',
                currentTimehome
            });
        }
        const currentTimehome = moment().tz('Asia/Shanghai').format('YYYY-MM-DD HH:mm:ss');
        const books = await Book.find({}); // 假设这是你的查询逻辑
        res.render('home', {
            username: req.session.username,
            books: books,
            currentTimehome // 确保添加了这一行
        });
    } catch (error) {
        console.error(error);
        const currentTimehome = moment().tz('Asia/Shanghai').format('YYYY-MM-DD HH:mm:ss');
        res.render('home', {
            username: req.session.username,
            books: [],
            message: 'Error occurred during book addition.',
            currentTimehome
        });
    }
    
});




app.post('/delete-book/:id', async (req, res) => {
    try {
        const currentTimehome = moment().tz('Asia/Shanghai').format('YYYY-MM-DD HH:mm:ss');
        await Book.deleteOne({ id: req.params.id });
        const books = await Book.find({});
        res.render('home', { username: req.session.username, books: books, currentTimehome });
    } catch (error) {
        console.error(error);
        res.render('home', { username: req.session.username, books: [] });
    }
});


app.post('/update-book/:id', async (req, res) => {
    try {
        const bookId = req.params.id;
        const { name, author } = req.body;
        const currentTimehome = moment().tz('Asia/Shanghai').format('YYYY-MM-DD HH:mm:ss');
        await Book.updateOne({ id: bookId }, { name, author });

        const books = await Book.find({});
        res.render('home', { username: req.session.username, books: books, currentTimehome });
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

