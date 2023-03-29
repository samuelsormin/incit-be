module.exports = {
    HOST: process.env.dbHost,
    USER: process.env.dbUser,
    PASSWORD: process.env.dbPassword,
    DB: process.env.dbName,
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
