
export default {
    mysql: {
        connectionLimit: 10,
        user: process.env.DB_User,
        password: process.env.DB_Pass,
        host: process.env.DB_Host,
        database: process.env.DB_SCHEMA

    },
    auth: {
        secret: process.env.SECRET,
        sk_key: process.env.sk_key
    },
    apiKeys: {
        stripe: process.env.STRIPE,
        
    }
}