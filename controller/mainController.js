const {validateUser} = require("../middleware/validate.js")
const controller = require('../controller/mainController')
const ExpressError = require("../utils/expressError.js")
const catchAsync = require("../utils/catchAsync")
const DB = require('../database/connection.js')
const session = require("express-session")
const Prevention = require('sqlstring')
const express = require('express')
const bcrypt = require('bcrypt')


module.exports.index = (req, res) => {
    DB.query(`SELECT * FROM flixers ORDER BY id ASC LIMIT 8 OFFSET 0` , (err, movies) => {
        
        if(err) {
           return console.log(err)
        } else {
            
            return res.render('home.ejs', {movies})
       
    
        }
    })   
}


module.exports.index2=  (req, res) => {
    DB.query(`SELECT * FROM flixers ORDER BY id ASC LIMIT 8 OFFSET 8` , (err, movies) => {
        
        if(err) {
            return console.log(err)
        } else {
            return res.render('home.ejs', {movies})
    
        }
    })   
}


module.exports.index3 = (req, res) => {
    DB.query(`SELECT * FROM flixers ORDER BY id ASC LIMIT 8  OFFSET 16` , (err, movies) => {
        
        if(err) {
            return console.log(err)
        } else {
            return res.render('home.ejs', {movies})
    
        }
    })   
}



module.exports.show  = (req, res) => {
    
    let id = req.params.id  
        DB.query(`SELECT * FROM flixers WHERE id = "${id}" LIMIT 1`, (err, movie) => {
            if(err || movie.length === 0 ) {
             
                return res.render("error.ejs", {err})
               
            }  else {
                return res.render("show.ejs", {movie})
            }
        }) 
}



module.exports.store =  catchAsync( async (req, res, next) => {
    const {user} = req.body
    const password = await bcrypt.hash(user.password, 12)
    DB.query(`INSERT INTO users(f_name, l_name, email, password)
    VALUES (${Prevention.escape(user.f_name)},
            ${Prevention.escape(user.l_name)},
            ${Prevention.escape(user.email)},
            ${Prevention.escape(password)})`, catchAsync( async (err, account) => {
                if(err) {
                 return res.render('error.ejs', {err})
                } else {
                    req.flash("success", 'Welcome to flixers!')
                    return res.redirect("/")
                }
            }))
})


module.exports.login =   (req, res) => {
    const {user} = req.body
    DB.query(`SELECT * FROM users WHERE email = "${user.email}"`, async (err, account) => {
        try {
            if(account[0].email === user.email) {
                const validPassword = await bcrypt.compare(user.password, account[0].password)

                if(validPassword === true) {
                    req.session.user = account[0].id
                    req.flash("success", 'Welcome back to flixers!')
                   return res.redirect("/")
                } else {
                    req.flash('error', 'incorrect password or email')
                    return res.redirect('/login')
                }           
            } 
        } catch (e) {
            req.flash('error', 'inncorect password or email')
            return res.redirect('/login')
        }   
    })    
}