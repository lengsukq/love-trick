/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    async redirects() {
        return [
            {
                source: '/trick/:path*',
                destination: '/',
                permanent: false,
                missing: [
                    {
                        type: 'header',
                        key: 'cookie',
                    },
                ],
            },
        ];
    },
}

module.exports = nextConfig
// next.config.js
