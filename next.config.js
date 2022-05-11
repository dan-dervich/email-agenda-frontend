/** @type {import('next').NextConfig} */
const nextConfig = {
      reactStrictMode: true,
      env: {
            JWT_SECRET: "078fcc13c}84$f6c923c89394{bbd0#e"
      },
      eslint: {
            ignoreDuringBuilds: true,
      },
}

module.exports = nextConfig