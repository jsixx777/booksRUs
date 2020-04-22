import { Query } from '../index';
import { BooksTable, ResultObject } from '../tables';

const getAll = () => {
	return Query<BooksTable[]>('SELECT * FROM books');
};
const getSingleBook = async (id:number) => Query(`SELECT * FROM books WHERE id = ?`, [id]);

const postBook = (userId: number, title: string, firstName: string, lastName: string) => {
	return Query<ResultObject>(`INSERT INTO books (userid, title, firstName, lastName) VALUES(?)`,
[[userId, title, firstName, lastName]]);
};

const editBook = async (title:string, firstName: string, lastName: string, id:number) => Query(`UPDATE books 
SET title = ?, firstName = ?, lastName = ? WHERE id=?`, [title, firstName, lastName, id]);

const deleteBook = async (id:number) => Query(`DELETE FROM books WHERE id = ?`, [id]);

export default {
    getAll,
    getSingleBook,
    postBook,
    editBook,
    deleteBook
}
