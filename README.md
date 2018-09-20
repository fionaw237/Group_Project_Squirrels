This is a single page, full-stack Javascript application, which uses data on red squirrel sightings in the UK to illustrate population trends and educate the user about conservation.

Use the following steps to get the app up and running.

1. Install dependencies:

   >npm install

2. Run a mongodb server (leave running):

   >mongod

3. Seed the database:

   >mongoimport --db squirrels --collection sightings --file server/db/seeds_json.js --jsonArray

4. Run webpack (leave running):

   >npm run build

5. Run express (leave running):

   >npm run server:dev
