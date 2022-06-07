/** @type {import('next').NextConfig} */
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

const nextConfig = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      reactStrictMode: true,
      env: {
        BASE_URL: 'http://localhost:3000',
        // DATABASE_URL: "postgresql://postgres:mikkolmillo@localhost:5432/pos-3d-planner?schema=public"
      }
    }
  }

  return {
    reactStrictMode: true,
    env: {
      BASE_URL: 'https://next-pos-sable.vercel.app',
      // DATABASE_URL: "postgresql://akjfpsejleqfjq:50fa1a6864319e6c0dd6d65cc6e9720bce3154a9ab72250fcb93e1a444fa2e3d@ec2-34-203-182-172.compute-1.amazonaws.com:5432/dbreb5muhc905b?schema=public"
    }
  }
}

module.exports = nextConfig
