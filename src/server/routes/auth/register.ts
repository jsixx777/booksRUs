import * as express from 'express';
import DB from '../../db';
import { HashPassword } from '../../utils/security/passwords';
import { CreateToken } from '../../utils/security/tokens';


const router = express.Router();





router.post('/', async (req, res) => {
	try {
		let [user] = await DB.Users.findOneByEmail(req.body.email) 
		if (user && user.email.length > 0) {
			res.json('Email already exists!');
			
		} else {
			req.body.password = HashPassword(req.body.password);
			let result = await DB.Users.insert(req.body);
			let token = await CreateToken({ userid: result.insertId});
			res.json({
				token,
				role: 'guest',
				userid: result.insertId
			});
		}
	} catch (e) {
		console.log(e);
		res.sendStatus(500);
	}
});






export default router;