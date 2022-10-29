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

router.get('/tablas', (req, res) => {
    res.render('tablas');
})

router.post('/tablas', (req, res) => {
    const{tabla} = req.body;
    let newBook = {
        tabla
    };
    books.push(newBook);
    const json_books = JSON.stringify(books)
    fs.writeFileSync('src/books.json', json_books, 'utf-8');
})
module.exports = router;