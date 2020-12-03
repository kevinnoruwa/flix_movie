
const {validateUser} = require("../middleware/validate.js")
const controller = require('../controller/mainController')
const ExpressError = require("../utils/expressError.js")
const catchAsync = require("../utils/catchAsync")
const DB = require('../database/connection.js')
const session = require("express-session")
const Prevention = require('sqlstring')
const express = require('express')
const bcrypt = require('bcrypt')
const route = express.Router()




// all movies
route.get('/', controller.index )

route.get('/page=2', controller.index2)

route.get('/page=3', controller.index3)




// show movies

route.get('/movie/:id',controller.show)

// sign up


route.get('/signup', (req, res) => {
    const auth = req.session.user
    res.render('sign_up.ejs')
})


route.post("/signup", validateUser, controller.store)

// log in

route.get('/login', (req, res) => {
    
    res.render('log_in.ejs')
})


route.post('/login',controller.login)



// log out 


// route.post("/logout", (req, res) => {
//     req.session.user = null;
//     res.redirect("/login")
// })





// route.get("/secret", async (req, res) => {
//     try {
//         if( !req.session.user) {
//            return res.redirect("/")
            
//         }
//         res.render("secret.ejs")
//     } catch(e) {
//         console.log(e)
    
//     }
  
   
// })







route.all("*", (req, res, next) => {
    next(new ExpressError("page not found", 404))
})

route.use((err, req, res, next) => {
   
    const {statusCode = 500} = err
    if(!err.message) {
      err.message = "something went wrong"
    }
    res.status(statusCode).render("error.ejs", {err})
  
  })



module.exports = route