// importo il framework express
const express = require("express");

// creo una istanza di express
const app = express();

// imposto il numero della porta
const port = 3000;

// registro il body-parser per "application/json"
app.use(express.json());

// importo globalmente il middleware di checkTime
const checkTime = require("./middlewares/checkTime.js");

// importo globalmente il middleware che gestisce errore per rotta inesistente
const notFound = require("./middlewares/notFound.js");

// importo globalmente il middleware che gestisce l'errore del server
const errorServer = require("./middlewares/errorServer");

// importo il modulo del router per i posts
const postRouter = require("./routers/RouterPosts.js")

// uso il middleware static di express per rendere disponibile i file statici
app.use(express.static('public'));

//middleware chekTime registrato per tutte le rotte a livello globale
app.use(checkTime);

// rotte per i posts
app.use("/posts", postRouter);

// imposto la rotta di home
app.get("/", (req, res) => {
    res.send('<h1> Server del mio blog </h1>')
})

// richiamo middleware gestione errore per rotta non esistente
// deve essere richiamato dopo le rotte
app.use(notFound);

// richiamo middleware gestione errori del server
app.use(errorServer);

// metto in ascolto il server sulla porta definita
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});