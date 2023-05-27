# Running a DELIVERY_APP Project

This README.md provides instructions on how to run a full-stack project that utilizes React for the frontend, Node.js for the backend, and MySQL for the database.


## Prerequisites

Before getting started, make sure you have the following installed on your computer:

Node.js (version 10 or above)
npm (automatically installed with Node.js)
MySQL (download and install MySQL Server)


## Database Configuration
1. Install and start the MySQL Server on your computer.
2. Open the command prompt or terminal and log into the MySQL Server using your credentials:
###    `mysql -u your_username -p` 
3. After logging into the MySQL Server, enter the following command to create a new database:
###    `CREATE DATABASE your_database;`
4. Open server.js file in a backend part of project and find the section related to the database configuration. Look for a line starting with const connection = mysql.createConnection...
In this line, modify the following values to match your database settings (replace 'your_user', 'your_password', and 'your_database' with your own values):

        const connection = mysql.createConnection({
        host: 'localhost',
        user: 'your_user',
        password: 'your_password',
        database: 'your_database'
        });
 

## Running the Frontend (React)
1. Open the command prompt or terminal and navigate to the frontend folder of your project.
2. Run the following command to install project dependencies:
###     `npm install`
3. After the dependencies are installed, execute the command:
###     `npm start`
This command will start the React development server and open it in your browser at http://localhost:3000.


## Running the Backend (Node.js)
1. Open the command prompt or terminal and navigate to the backend folder of your project.
2. Run the following command to install project dependencies:
###     `npm install`
3. After the dependencies are installed, execute the command:
###     `node server.js`
This command will start the Node.js server, listening on port 4000.


You should now have both the frontend and backend running, interacting with the MySQL database you configured earlier.

If everything was successful, you can open your project in your browser at http://localhost:3000 and observe it interacting with the backend and database.