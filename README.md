# Full Stack Monolith: Rate a Restuarant

- PostrgeSQL Express Node React full-stack application, integrates a React frontend with a Node.js / Express.js Backend
  to create an application that allows users to view nearby locations as well as read and write reviews.

- [General Information](#general-information)
- [Application Previews](#application-previews)
- [Backend Technologies](#technologies---backend)
- [Frontend Technologies](#technologies---frontend)
- [Backend Setup](#app-setup---backend)
- [Frontend Setup](#app-setup---frontend)
- [Deployment](#deployment)
- [Features](#features)
- [Backend Routes](#backend-routes)
- [Frontend Routes](#frontend-routes)
- [Contributers](#contributors)
- [Database Diagram](#database-diagram)
- [Known Issues](#bugstechnical-issues)

## General Information

### Backend

-PostgreSQL needs to be installed and running prior to starting the application.
For ease of access, pgAdmin4 is recommended.

- Sequelize CLI used for database migration handling.
- Bcrypt used to hash user passwords into database.
- JWT (Json Web Tokens) used for secure information transmittion.
- Postman used to test backend routes without frontend.
- Utilizes migrations and seeder files to streamline database configuration

### Frontend

- React frontend including a map populated with nearby locations dependant on user location. Users and manage their own reviews,
  as well as view reviews left by other users.
- JavaScriptXML (JSX) used to write HTML elements in JavaScript
- SASS (Syntactically Awesome Style Sheets) and Bootstrap used to style webpages.

## Application Previews

-**_COMING SOON_**

## Technologies - Backend

-[PostgreSQL](https://www.postgresql.org)

- [pgAdmin4](https://www.pgadmin.org)(recommendation)
- [Express.js Middleware](https://expressjs.com/en/starter/installing.html)
- [Node.js](https://nodejs.org/docs/latest/api/)
- [Sequelize](https://sequelize.org)
- [Sequelize CLI](https://sequelize.org/docs/v7/cli/)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)
- [JWT](https://www.npmjs.com/package/jsonwebtoken)

## Technologies - Frontend

- [React](https://react.dev/learn/installation)
- [SASS](https://sass-lang.com/documentation/)
- [Bootstrap](https://getbootstrap.com/docs/5.3/getting-started/download/)

## App Setup - Backend

**Note: Gitbash is recommended and the following instructions will be made with gitbash commands**

- Install and Run PostgreSQL
- Change into the Backend directory `cd Backend`
- Install dependencies using `npm i`
- Install & run PostgreSQL
- Install `npm dotenv`
- Install Sequelize & Sequelize-cli `npm install sequelize sqlite3` || `npm install --save-dev sequelize-cli`
- Create a .env file and store **your** PostgreSQL connection information (username, password, default port) into the environmental variables used in the config.js file.
  Additionally, create a backend server `PORT` variable and assign it to a free port (3001), as well as a `JWT_SECRET` variable (assign any value)
- Run `npm start`

## App Setup - Frontend

- Change into the Frontend directory `cd Fronted`
- Install dependencies using `npm i`
- Run `npm start`

## Deployment

-**_COMING SOON_**

## Features
- **Map:** Integrated map that pulls locations from an API using currently logged in User data.
- **User Login:** Allows users to create and log into to personal accounts.
- **Reviews and Ratings:** Share and read reviews and ratings for various locations.

## Backend Routes

| Method | Path                                    | Purpose                         |
| ------ | --------------------------------------- | ------------------------------- |
| GET    | /reviews                                | Reviews index page              |
| GET    | /reviews/:location_id                   | Reviews for a specific location |
| GET    | /reviews/:location_id/review/:review_id | Find a specific review          |
| POST   | /reviews                                | Create a review                 |
| PUT    | /reviews/:location_id/review/:review_id | Edit a review                   |
| DELETE | /reviews/:location_id/review/:review_id | Delete a review                 |
| GET    | /users                                  | Users index page                |
| POST   | /users                                  | Create a user                   |
| GET    | /authentication/profile                 | User profile                    |
| POST   | /authentication/login                   | User Login                      |

## Frontend Routes

| Path  | Component                 | Purpose                                                     |
| ----- | ------------------------- | ----------------------------------------------------------- |
| /     | /components/user/login.js | User login page                                             |
| /home | /components/home.js       | User home page                                              |
| /map  | /components/Map.js        | Map page with nearby restuarants dependant on user location |

## Contributors

- Thomas McCullough | tamccullough88@gmail.com | ([GitHub Profile](https://github.com/tamccullough88))
- Benjamin Gilley | bengilley5@gmail.com | ([GitHub Profile](https://github.com/BenG2256))
- Zach Fountain | zach.fount@outlook.com | ([GitHub Profile](https://github.com/ZachFount))
- Mary Imarenezor | Maryimarenezor13@gmail.com | ([GitHub Profile](https://github.com/MaryImarenezor))

## Database Diagram

![Screenshot of the first database diagram](/Frontend/public/DatabaseDiagram.png)

## Bugs/Technical Issues

- **Frontend** 
- Map not showing markers for user location or restaurant locations