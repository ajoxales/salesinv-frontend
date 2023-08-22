/** @type {import('next').NextConfig} */
const dotenv = require("dotenv");
dotenv.config();

const nextConfig = {
  exportPathMap: function () {
    return {
      "/": { page: "/login" },
    };
  },
};

module.exports = nextConfig;
