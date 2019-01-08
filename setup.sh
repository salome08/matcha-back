cp .env.sample .env
createdb sticker-mania
npm install
npx knex migrate:latest
npx knex seed:run
