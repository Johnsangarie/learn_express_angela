//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming
import express from "express"
import bodyParser from 'body-parser'
import { dirname } from 'path'
import { fileURLToPath } from "url"
import multer from "multer"
import morgan from "morgan"
//const {multer} = pkg
const upload = multer() 
const app = express()
const port = 3000

// morgan for logging incoming requests
app.use(morgan("common"))


let _dirname = dirname(fileURLToPath(import.meta.url))

app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

let result;
const verifyPassword= (req,res,next)=>{
   result=  req.body["password"] === "ILoveProgramming"
   next()
}

app.use(verifyPassword)

app.get('/', (req, res) => {
    res.sendFile(_dirname + ("/public/index.html") )
    //console.log(req.rawHeaders)
  })

  app.post('/check', (req, res) => {
    result ?
    res.sendFile(_dirname + ("/public/secret.html") ) : res.send("wrong password")
  })


  app.listen(port,(()=>{
     console.log(`running at ${port}`)
  }))