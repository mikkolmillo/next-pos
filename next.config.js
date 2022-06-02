/** @type {import('next').NextConfig} */
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

const nextConfig = (phase) => {
  if (PHASE_DEVELOPMENT_SERVER) {
    return {
      reactStrictMode: true,
      env: {
        DEV_URL: 'http://localhost:3000'
      }
    }
  }

  return {
    reactStrictMode: true,
    // env: {
    //   PRODUCTION_URL: 'http://localhost:3000'
    // }
  }
}

module.exports = nextConfig
