# HIHI
Week 6 project

## Project description
We have worked on the SRVVRS app from last week, adding authentication functionality.

## Set up instructions
1. Clone this repo
2. Run `$ npm install` on your terminal
3. Run `npm run dev` to check server runs
4. Run these commands in your terminal to set up user, app database and test database

```
$ psql -c "CREATE USER myuser WITH PASSWORD 'mypassword'"
$ psql -c "ALTER USER myuser WITH SUPERUSER"
$ psql -c "CREATE DATABASE srvvrs_db WITH OWNER myuser"
$ psql -c "CREATE DATABASE hihi_test_db WITH OWNER myuser"
```

5. Create a `.env` file in the root folder with the following inside

```
PGDATABASE=srvvrs_db
PGUSER=myuser
PGPASSWORD=mypassword
```
6. Comment out the following line on your `connection.js` file which connects to the Heroku database

```
// connectionString: process.env.DATABASE_URL,
```
7. Run `psql` to enter Postgres CLI
8. Connect to database `# \c srvvrs_db`
9. Initialise database `# \i source/database/init.sql`
10. Run `$ npm run dev` to run app on localhost
11. Run `psql` and connect to test database `# \c hihi_test_db`
12. Run `$ npm test` to run tests

## Database Schema

```
CREATE TABLE user_input (
  id SERIAL PRIMARY KEY,
  category TEXT NOT NULL,
  tool_name VARCHAR(50),
  tool_description VARCHAR(280),
  tool_link VARCHAR(75),
  added_by VARCHAR(50)
  love INTEGER 
);
```

```
CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  username VARCHAR(2000),
  password VARCHAR(2000)
);
```