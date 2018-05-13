
module.exports = {
  plugins: [
      'gatsby-plugin-emotion',
      {
          resolve: 'gatsby-plugin-google-analytics',
          options: {
              trackingId: 'UA-46874000-2',
              head: true
          }
      }
  ]
};
