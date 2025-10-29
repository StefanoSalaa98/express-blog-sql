// importo i dati della risorsa
const posts = require('../data/posts');


// Importo il file di connessione al database
const connection = require('../data/db');

function index(req, res) {

    // preparo la query
    const sql = 'SELECT * FROM posts';

    // eseguo la query
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        res.json(results);
    });
}

function show(req, res) {

    // recupero l'id dall' URL della richiesta
    const id = req.params.id;

    //eseguo la query
    const sql = 'SELECT * FROM posts WHERE id = ?';
    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        if (results.length === 0) return res.status(404).json({ error: 'Post not found' });
        res.json(results[0]);
    });
}

function store(req, res) {

    // Leggo il valore dell'header Content-Type
    const contentType = req.get('Content-Type');
    console.log(contentType);

    // Creo un nuovo id incrementando l'ultimo id presente (soluzione deprecabile, successivamente saranno i database a gestire gli id per noi)
    const newId = posts[posts.length - 1].id + 1;

    // Creo un nuovo oggetto post
    const newPost = {
        id: newId,
        title: req.body.title,
        content: req.body.content,
        image: req.body.image,
        tags: req.body.tags
    }

    // Aggiungo il nuova post alla lista dei posts
    posts.push(newPost);

    // controllo che sia stato inserito stampando l'intera lista
    console.log(posts);


    // Controllo se ho letto il post inviato
    res.send(newPost);
}

function update(req, res) {
    // recupero l'id dall' URL e lo converto in numero per poterlo confrontare con gli altri id
    const id = parseInt(req.params.id)

    // cerco il post tramite l'id che mi è stato inviato
    const post = posts.find(post => post.id === id);

    // controllo se il post è stato trovato, altrimenti comunico l'errore
    if (!post) {
        res.status(404);

        return res.json({
            error: "Not Found",
            message: "Post non trovato"
        })
    }

    // Aggiorno il post
    post.title = req.body.title;
    post.content = req.body.content;
    post.image = req.body.image;
    post.tags = req.body.tags;

    // Controllo la lista dei posts
    console.log(posts)

    // Restituisco il post aggiornato
    res.json(post);
}

function modify(req, res) {
    // recupero l'id dall' URL e lo converto in numero per poterlo confrontare con gli altri id
    const id = parseInt(req.params.id)

    // cerco il post tramite l'id che mi è stato inviato
    const post = posts.find(post => post.id === id);

    // controllo se il post è stato trovato, altrimenti comunico l'errore
    if (!post) {
        res.status(404);

        return res.json({
            error: "Not Found",
            message: "post non trovato"
        })
    }

    // Aggiorno il post
    // Se un certo campo è stato inviato, allora aggiorno il nuovo valore, altrimenti mantengo quello originale
    req.body.title ? post.title = req.body.title : post.title = post.title;
    req.body.content ? post.content = req.body.content : post.content = post.content;
    req.body.image ? post.image = req.body.image : post.image = post.image;
    req.body.tags ? post.tags = req.body.tags : post.tags = post.tags;

    // Controllo la lista dei posts
    console.log(posts)

    // Restituisco il post aggiornato
    res.json(post);
}

function destroy(req, res) {

    // recupero l'id dall' URL della richiesta
    const id = req.params.id;

    // eseguo la query
    const sql = 'DELETE FROM posts WHERE id = ?';
    connection.query(sql, [id], (err) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        res.sendStatus(204)
    });
}

// esporto le funzioni che ho creato
module.exports = { index, show, store, update, modify, destroy }