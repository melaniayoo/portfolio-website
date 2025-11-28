// next.config.js
const nextConfig = {
  output: "export",
  experimental: {
    fontLoaders: [
      { loader: '@next/font/google', options: { subsets: ['latin'] } },
    ],
  },
};

module.exports = nextConfig;
