import { Query } from '../index';
import { UsersTable, ResultObject } from '../tables';

const getAll = () => {
	return Query<UsersTable[]>('SELECT * FROM users');
};

const findOneByEmail = async (email:string) => Query(`SELECT * FROM users where email = ?`,[email]);

const findOneById = async (id:number) => Query(`SELECT * FROM users WHERE id = ?`, [id]);

const insert = (user: any) => {
    console.log('the user', user);
	return Query<ResultObject>(`INSERT INTO users (email, first_name, last_name, password, role) VALUES(?)`, 
[[user.email, user.firstName, user.lastName, user.password,'guest']]);
};

export default {
    getAll,
    findOneByEmail,
    findOneById,
    insert
} 