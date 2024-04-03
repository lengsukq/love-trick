/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    webpack: (config, {isServer}) => {
        // 禁用代码压缩
        config.optimization.minimize = false;
        return config;
    },
    reactStrictMode: true,
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
