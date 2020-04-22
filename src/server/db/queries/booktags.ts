import { Query } from '../index';

const getBookTags = (id:number)=> Query (`CALL spGetBookTags(${id})`);





export default {
    getBookTags
}