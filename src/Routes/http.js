const { Router } = require('express');
const router = Router();
const fs = require('fs');
const json_books = fs.readFileSync('src/books.json ', 'utf-8');
let books = JSON.parse(json_books);

router.get('/', (req,res) => {
    res.render('index.ejs', {
        books
    });
});

router.get()