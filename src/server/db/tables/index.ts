export interface UsersTable {
	
    id: number;
    email: string;
	first_name: string;
	last_name: string;
	password: string;
	role: string;
	_created: Date;
}

export interface BooksTable {
	
    id: number;
    title: string;
    firstName: string;
    lastName: string;
	_created: Date;
}


export interface ResultObject {
	insertId: number;
	message: string;
	changedRows: number;
	affectedRows: number;
}