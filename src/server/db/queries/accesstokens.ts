import { Query } from '../index';

const findOne = async (id:number, token:string) => Query(`SELECT * FROM tokens WHERE id = ? AND value = ?`, [id, token]);

const insert = async (userid: number) => Query(`INSERT INTO tokens (userid) VALUES (${userid})`);

const update = async (id:number, token:string) => Query(`UPDATE tokens SET value = ? WHERE id = ?`, [token, id]);

export default {
    findOne,
    insert,
    update
}