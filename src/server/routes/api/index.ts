import * as express from 'express';
import booksRouter from './books';
import * as passport from 'passport';
import bookTagsRouter from './booktags';
import usersRouter from './users';

import { tokenCheckpoint } from '../../middleware/auth-checkpoints';


const router = express.Router();


router.use(tokenCheckpoint);
router.use('/books', booksRouter);
router.use('/booktags', bookTagsRouter )
router.use('/users', usersRouter)


  
export default router;