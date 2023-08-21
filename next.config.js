/** @type {import('next').NextConfig} */
const nextConfig = {
  exportPathMap: function () {
    return {
      "/": { page: "/login" },
    };
  },
};

module.exports = nextConfig;
