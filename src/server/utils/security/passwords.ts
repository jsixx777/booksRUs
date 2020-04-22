import * as bcrypt from 'bcrypt';

export const HashPassword = (password:string) =>{
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password,salt);
    return hash;
     
};

console.log(HashPassword("password123"));


export const ComparePassword = (password:string, hash:string) =>{
    return bcrypt.compareSync(password,hash);
}