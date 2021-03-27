module.exports = {
  siteMetadata: {
    title: "Departures",
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/data/`,
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-csv`,
  ],
};
