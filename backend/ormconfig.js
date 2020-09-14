const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, '.env') });

console.log(process.env);

const databaseConfig = {
   development: {
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "test",
      password: "test",
      database: "test",
      synchronize: true,
      logging: false,
      entities: [
         "src/app/entity/**/*.ts"
      ],
      migrations: [
         "src/app/migration/**/*.ts"
      ],
      subscribers: [
         "src/app/subscriber/**/*.ts"
      ],
      cli: {
         "entitiesDir": "src/app/entity",
         "migrationsDir": "src/app/migration",
         "subscribersDir": "src/app/subscriber"
      }
   },

   production: {
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "test",
      password: "test",
      database: "test",
      synchronize: true,
      logging: false,
      entities: [
         "build/app/entity/**/*.js"
      ],
      migrations: [
         "build/app/migration/**/*.js"
      ],
      subscribers: [
         "build/app/subscriber/**/*.js"
      ],
      cli: {
         "entitiesDir": "build/app/entity",
         "migrationsDir": "build/app/migration",
         "subscribersDir": "build/app/subscriber"
      }
   }
}