// importo il framework express
const express = require("express");

// attivo il router
const router = express.Router();

// importo il controller della risorsa posts
const postsController = require('../controllers/postsController');

// Rotta /index che restituisca un oggetto json con la lista dei post filtrati o non.
router.get('/', postsController.index);

// Rotta /show/:id che restituisca un singolo post
router.get('/:id', postsController.show);

// store
router.post('/', postsController.store);

// update
router.put('/:id', postsController.update);

// modify
router.patch('/:id', postsController.modify);

// destroy
router.delete('/:id', postsController.destroy);


module.exports = router;