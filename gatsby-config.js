module.exports = {
  siteMetadata: {
    title: "Departures",
    siteUrl: "https://departureboard.netlify.app/",
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
    `gatsby-plugin-sitemap`,
  ],
};
