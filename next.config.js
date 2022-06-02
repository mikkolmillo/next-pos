/** @type {import('next').NextConfig} */
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

const nextConfig = (phase) => {
  if (PHASE_DEVELOPMENT_SERVER) {
    return {
      reactStrictMode: true,
      env: {
        BASE_URL: 'http://localhost:3000'
      }
    }
  }

  return {
    reactStrictMode: true,
    env: {
      BASE_URL: 'https://next-pos-sable.vercel.app'
    }
  }
}

module.exports = nextConfig
