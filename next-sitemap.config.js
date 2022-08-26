/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://movielust.in',
  generateRobotsTxt: true, // (optional)
  generateIndexSitemap: false,
};
