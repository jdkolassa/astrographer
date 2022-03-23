const settings = {
  "name": "astrographer",
  "state": {
    "frontity": {
      "url": "https://localhost",
      "title": "Astrographer",
      "description": "Frontity Frontend for Astrographer project"
    }
  },
  "packages": [
    {
      "name": "astro-theme"
    },
    {
      "name": "@frontity/wp-source",
      "state": {
        "source": {
          "url": "http://localhost:10004", // that port number changes because of Local, so this could be a problem
          "postTypes": [
            { 
              type: "astrog_star",
              endpoint: "stars",
              archive: "/"
            }
          ],
          "params": {
            per_page: 100,
            orderby: "distance",
            order: "asc",
            type: ["astrog_star"],
          },
        }
      }
    },
    "@frontity/tiny-router",
    "@frontity/html2react"
  ]
};

export default settings;
