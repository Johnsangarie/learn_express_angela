
import express from "express"
import multer from "multer"
import morgan from "morgan"
//import pkg from 'multer';
//const {bodyParser} = pkg;
//const {express, multer, bodyParser} = pkg;
import bodyParser from 'body-parser'
import { dirname } from 'path'
import { fileURLToPath } from "url"
//const {multer} = pkg
const upload = multer() 
const app = express()
const port = 3000

// morgan for logging incoming requests
app.use(morgan("common"))

//for finding path when code is not local
let _dirname = dirname(fileURLToPath(import.meta.url))

// bodypaser and multer need for post requests coming in

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


//customMiddlerware 
// the next() is what tells the middleware to move to the next middleware so  do not forget to add it.
const logger = ((req,res, next)=>{
  console.log(req.method)
  console.log(req.url)
  next()
})



app.use(logger)
let name = ""

const combineUserName = ((req,res, next)=>{
 name =  req.body["fname"] +" "+ req.body["lname"]
  next()
})


app.use(combineUserName)

app.use(logger)






app.get('/about', (req, res) => {
  res.send('<h1>About</h1>')
  console.log(req.rawHeaders)
})

app.get('/contact', (req, res) => {
  res.send('<h1>Contact</h1>')
  console.log(req.rawHeaders)
})

app.post('/form', (req, res) => {
  console.log(req.body.name)
  res.json(req.body)
})

app.get('/', (req, res) => {
  console.log(req.body)
  res.sendFile( _dirname 
  + ("/public/index.html"))
})
//  you can do this or use middleware 
// app.post('/submit', upload.array(), (req, res) => {
//   console.log(req.body)
//  // console.log(req.body)
//  res.send(`thank you for submiting ${req.body.fname +" "+ req.body.lname }`)
// })

//using custommiddleware
app.post('/submit', upload.array(), (req, res) => {
  console.log(req.body)
 // console.log(req.body)
 res.send(`thank you for submiting ${name}`)
})

app.listen(port,()=>{
  console.log(`running at port ${port}`)
})