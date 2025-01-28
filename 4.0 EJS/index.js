import express from "express"
import bodyParser from 'body-parser'
import { dirname } from 'path'
import { fileURLToPath } from "url"
//import multer from "multer"
import morgan from "morgan"

const app = express()
const port = 3000
//const upload = multer()

// morgan for logging incoming requests
app.use(morgan("common"))

app.set('view engine', 'ejs')


let _dirname = dirname(fileURLToPath(import.meta.url))

let count

// const countName = ((req,res,next)=>{
     
//    count =   (req.body["fname"] + req.body["lname"]).length
   
//    next()
// })

// app.use(countName)

app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


const d = new Date();
let day = d.getDay();

//console.log(day)

let items =  ["hi", "hello"]

let dayofWeek = day == 0 || day == 6 ? "its weekends, relax a bit":  `its weekday, workhard` 



app.get('/', (req, res) => {
    res.render(('index.ejs'),{dayofWeek})
    //console.log(req.rawHeaders)
  })

  app.get('/items', (req, res) => {
    res.render(('index1.ejs'),{items})
    //console.log(req.rawHeaders)
  })

  app.get('/form', (req, res) => {
    res.render(('form.ejs'))
    //console.log(req.rawHeaders)
  })

  app.post('/submit', (req, res) => {
   let nameCount = ((req.body["fname"]) + (req.body["lname"])).length
   //res.locals.names = {firstname}
   //console.log(firstname)
    res.render(('form.ejs'),{nameCount})
  // console.log(firstname)
    //console.log(req.rawHeaders)
  })



  app.listen(port,()=>{
      console.log(`listening at ${port}`)
  })