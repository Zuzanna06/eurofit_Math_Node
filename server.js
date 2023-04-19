
const express = require('express');
const mysql = require('mysql');

const app = express();

app.use(express.json());

const port = process.env.PORT || 3000;


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rootroot',
    database: 'euro_fit_matthias'
});

module.exports = {app, port, connection};