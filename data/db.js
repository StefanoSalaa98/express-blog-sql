//importo il pacchetto mysql2
const mysql = require('mysql2');

// uso il metodo di creazione oggetto di connessione
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'db_posts'
});

// avvio la connesione tramite il metodo connect
connection.connect((err) => {
    if (err) throw err;
    console.log('Connessione riuscita!');
});

// esporto il modulo CJS
module.exports = connection;