/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://movie-lust.vercel.app',
  generateRobotsTxt: true, // (optional)
  generateIndexSitemap: false,
};
