/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    async rewrites() {
      return [
        {
          source: '/ui/photo/:path*',
          destination: 'https://api.mindcity.co.kr/ui/photo/:path*',
        },
      ]
    },
}
export default nextConfig;