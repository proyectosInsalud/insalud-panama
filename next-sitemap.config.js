/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://app.insalud.pa',    // ← aquí va tu dominio real
    generateRobotsTxt: true,
    robotsTxtOptions: {
      policies: [
        { userAgent: '*', disallow: ['/api'] }, // bloquea API
      ],
    },
    changefreq: 'weekly',
    priority: 0.7,
  };
  