import * as express from 'express';
import DB from '../../db';


const router = express.Router();

router.get('/', async (req, res) => {
	try {
		let users = await DB.Users.getAll();
		res.json(users);
	} catch (e) {
		console.log(e);
		res.sendStatus(500);
	}
});



export default router;