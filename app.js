const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Manu@042002',
    database: 'store',
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database');
});
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html' );
  });
  
app.post('/', (req, res) => {
    const {name,email,message } = req.body;    
    const sql = 'INSERT INTO users (name,email,message) VALUES (?,?,?)';
    connection.query(sql, [name, email, message], (err, result) => {
        if (err) throw console.error();
            console.log('submission added to database');
           
                const sql = 'SELECT * FROM users';
                connection.query(sql, (err, results) => {
                    if (err) throw err;
                    res.send(`<html><body><table>${renderData(results)}</table></body></html>`);
                });

                
function renderData(data) {
    let tableHTML = '<thead><tr><th>Name</th><th>Email</th><th>Message</th></tr></thead><tbody>';
  
    data.forEach(row => {
        tableHTML += `<tr><td>${row.name}</td><td>${row.email}</td><td>${row.message}</td></tr>`;
    });
  
    tableHTML += '</tbody>';
    return tableHTML;
  }
  
             
     });
});



app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
