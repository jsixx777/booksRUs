import * as mysql from 'mysql';
import config from '../config';
import Books from './queries/books';
import Users from './queries/users';
import AccessTokens from './queries/accesstokens';
import BookTags from './queries/booktags';



export const pool = mysql.createPool(config.mysql);

export const Query = <T = any>(query: string, values?: any[]) => {
	return new Promise<T>((resolve, reject) => {
		pool.query(query, values, (err, results) => {
			if (err) reject(err);
			return resolve(results);
		});
	});
};
export default{
    Books, 
    Users,
    AccessTokens,
    BookTags
}