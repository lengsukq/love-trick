// db.js
import mysql2 from 'serverless-mysql';

const db = mysql2({
    config: {
        host: process.env.MYSQL_HOST,
        port: process.env.MYSQL_PORT,
        database: process.env.MYSQL_DATABASE,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD
    }
});
export default async function executeQuery({ query, values }) {
    try {
        console.log('executeQuery', query, values)
        const results = await db.query(query, values);
        await db.end();
        return results;
    } catch (error) {
        throw new Error("数据库报错:", error);
    }
}
