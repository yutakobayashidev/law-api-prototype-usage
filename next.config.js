/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    APP_BASE_URL: process.env.APP_BASE_URL,
    NEXT_PUBLIC_API_SPECIFICATION_URL:
      process.env.NEXT_PUBLIC_API_SPECIFICATION_URL,
    API_URL: process.env.API_URL,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
        },
      ],
    });
    return config;
  },
  images: {
    disableStaticImages: true, // importした画像の型定義設定を無効にする
  },
};

module.exports = nextConfig;
