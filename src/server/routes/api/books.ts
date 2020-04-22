import * as express from 'express';

import DB from '../../db';
import { isAdmin } from '../../middleware/auth-checkpoints';
import { isGuest } from '../../middleware/auth-checkpoints';

const router = express.Router();

router.post('/', isAdmin, async (req, res) => {
	console.log('Got to Node server', req.user);
	const {title, firstName, lastName} = req.body;
	try {
		let result = await DB.Books.postBook(req.user.id, title, firstName, lastName);
		res.json(result);
	} catch (e) {
		console.log(e);
		res.sendStatus(500);
	}
});

router.delete('/:id', isAdmin, async (req, res) => {
    let id = req.params.id;
	try {
		let result = await DB.Books.deleteBook(id);
		res.json(result);
	} catch (e) {
		console.log(e);
		res.sendStatus(500);
	}
});

router.patch('/:id', isAdmin, async (req, res) => {
    let id = req.params.id;
    const {title, firstname, lastname} = req.body;
	try {
		let result = await DB.Books.editBook(title, firstname, lastname, id);
		res.json(result);
	} catch (e) {
		console.log(e);
		res.sendStatus(500);
	}
});

router.get('/', async(req, res, next) =>{
    try{
        let books = await DB.Books.getAll();
        res.send(books);
    }catch(e){
        console.log(e);
        res.sendStatus(500);  
    };
    
})

router.get('/:id',   async(req, res, next) =>{
    let id = req.params.id;
    try{
        let book = await DB.Books.getSingleBook(id);
        res.send(book);
    }catch(e){
        console.log(e);
        res.sendStatus(500);  
        
    };
    
})




  
export default router;