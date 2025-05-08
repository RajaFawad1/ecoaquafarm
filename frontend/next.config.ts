/** next.config.js **/
module.exports = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['localhost', 'panelbackend.ecoaquafarm.es'],
  },
};
