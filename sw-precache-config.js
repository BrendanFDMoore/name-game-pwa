module.exports = {
  staticFileGlobs: [
    'build/**.html',
    'build/**.js',
    'build/**.css',
    'build/assets/images/*',
    'build/assets/icons/*',
    'build/static/css/*',
    'build/static/js/*',
    'build/static/media/*'
  ],
  root: 'build',
  stripPrefix: 'build/',
  navigateFallback: '/index.html'
};