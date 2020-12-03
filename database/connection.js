


const  mysql = require('mysql')
require('dotenv').config()



const DB = mysql.createConnection({
    host: process.env.HOST ,
    user: process.env.USER ,
    password: process.env.PW,
    database: process.env.DATABASE
  })

//   const DB = mysql.createConnection({
//     host: process.env.HOST || '127.0.0.1',
//     user: process.env.USER || 'root',
//     password: process.env.PASSWORD || 'root',
//     database: process.env.DATABASE || 'movie'
//   })




DB.connect((error) => {
    if(!error) {
        DB.query(`SELECT 1 FROM flixers`, (err, result) => {
            if(err){
                console.log('creating a table flixers')
                DB.query(`CREATE TABLE flixers(
                    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
                    description TEXT NOT NULL,
                    background_image TEXT NOT NULL,
                    genre VARCHAR(60) NOT NULL,
                    release_date varchar(150) NOT NULL,
                    cast VARCHAR(150) NOT NULL,
                    title VARCHAR(100) NOT NULL,
                    duration INT NOT NULL,
                    image TEXT NOT NULL,
                    imdb FLOAT NOT NULL,   
                    user_id INT)`)
            } else {
                console.log('table FLIXER already exist')
            }
        })

        DB.query(`SELECT 1 FROM users`, (err, result) => {
            if(err){
                console.log('creating a table users')
                DB.query(`CREATE TABLE users(
                    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY ,
                    f_name VARCHAR(100) NOT NULL,
                    l_name VARCHAR(100) NOT NULL,
                    email VARCHAR(100) NOT NULL,
                    password TEXT NOT NULL, 
                    flixers_id INT)`)
            } else {
                console.log('table users already exist')
                console.log('conneected to Data base')
            }
        })

        console.log('conneected to Data base')

    } else {
        console.log('failed to connect to database')
    }
})



module.exports = DB