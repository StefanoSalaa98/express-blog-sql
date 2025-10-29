function notFound(req, res, next) {
    console.log("non ho trovato niente")
    res.status(404)
    res.json({
        error: "Not Found",
        message: "Pagina non trovata"
    });
};

module.exports = notFound;