import * as React from 'react';
import * as passport from 'passport';
import { RequestHandler, Request } from 'express';
import { UsersTable } from '../db/tables';



export const tokenCheckpoint: RequestHandler = (req, res, next) => {
	return passport.authenticate('bearer', { session: false }, (err, user, info) => {
		if (user) req.user = user;
		return next();
	})(req, res, next);
};

export const isAdmin: RequestHandler = (req: RequestUser, res, next) => {
	if ( req.user && req.user.role === 'admin') {
		return next();
	} else {
		return res.sendStatus(401);
	}
};

export const isGuest: RequestHandler = (req: RequestUser, res, next) => {
	if ( req.user && req.user.role === 'guest') {
		return next();
	} else {
		return res.sendStatus(401);
	}
};

export interface RequestUser extends Request {
	user: UsersTable,

}

