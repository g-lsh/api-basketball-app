# Intro

'The Big O' is a website that provides easy access to NBA player's statistic. Players are order by teams.

Note: this project is not a final product.

## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information
3. Obtain 7-day free API Key from www.probasketballapi.com. Other api : fantasyBasketballNerd.com, free.
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Run migrations: `npm run knex migrate:latest`
  - Check the migrations folder to see what gets created in the DB
6. Seed: The seed file for each  tables are indenpendent. DB must be seeded in the correct sequential order by uncommenting the approproate line in server.js ('Waterfall to be implented eventually.').
Seeding order: A) STATS:
                1) Seed teams.
                2) Seed players.
                3) Seed player boxscores.
                4) Seed games.
                5) Seed home scoring.
                6) Seed away scoring.
                7) Seed Home internal Ids.
                8) Seed away internal Ids.
                9) Seed home NBA code.
                10) Seed away nba code.

              B) Additional team info:
                1) Seed twitters.
                Seed all following one at a time, in no particular order:
                 - Seed teams twitter.
                 - Seed teams website
                 - Seed teams logos (scrape ran through route)
                 - Seed teams background (scrape ran through route)

              C) Additional player info
              Seed in no particular order, one a time
              - Seed additional info from FantasybasketballNerd
              - Seed player individual headshot (scrape ran through route)

7. Install react front end server from: https://github.com/g-lsh/client-side-basketball-app.
8. Run the server: `npm run local` or `npm start` (cors option not necessary when running from localhost to localhost.)

## Dependencies

- Node 5.10.x or above
- NPM 3.8.x or above
