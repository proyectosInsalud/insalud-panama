/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://inb2b.com',
    generateRobotsTxt: true, // crea robots.txt automáticamente
    robotsTxtOptions: {
        policies: [
          { userAgent: '*', disallow: ['/api'] },  // bloquea todas las URLs que empiecen con /api
          { userAgent: '*', allow: '/' },          // permite el resto del sitio
        ],
    },
    changefreq: 'weekly',
    priority: 0.7,
  };
  