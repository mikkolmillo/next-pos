/** @type {import('next').NextConfig} */
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

const nextConfig = (phase) => {
  if (PHASE_DEVELOPMENT_SERVER) {
    return {
      reactStrictMode: true,
      env: {
<<<<<<< HEAD
        BASE_URL: 'http://localhost:3000'
=======
        DEV_URL: 'http://localhost:3000'
>>>>>>> ef26cca77cc363e330673ead7da36589beb1c658
      }
    }
  }

  return {
    reactStrictMode: true,
<<<<<<< HEAD
    env: {
      BASE_URL: 'https://next-pos-sable.vercel.app'
    }
=======
    // env: {
    //   PRODUCTION_URL: 'http://localhost:3000'
    // }
>>>>>>> ef26cca77cc363e330673ead7da36589beb1c658
  }
}

module.exports = nextConfig
