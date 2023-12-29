/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        DB_HOST: process.env.DB_HOST,
        DB_USER: process.env.DB_USER,
        DB_PASSWORD: process.env.DB_PASSWORD,
        DB_DATABASE: process.env.DB_DATABASE,
    },
}

module.exports = nextConfig
// next.config.js
