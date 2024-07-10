const express = require('express')
const path = require('path')
const methodOverride = require('method-override')
const bodyParser = require('body-parser')
const flash = require('express-flash')
const cookieParser = require('cookie-parser')
const session = require('express-session')
require('dotenv').config()

const systemConfig = require("./config/system")

const database = require("./config/database")
const route = require("./routes/client/index.route")
const routeAdmin = require("./routes/admin/index.route")
database.connect()
const app = express()
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({extended: false}))
const port = process.env.PORT

app.set("views", `${__dirname}/views`)
app.set("view engine", "pug")

app.use(cookieParser('keyweb cat'))
app.use(session({cookie: {maxAge: 60000}}))
app.use(flash())
// TinyMce
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')))
// End TinyMce

app.locals.prefixAdmin = systemConfig.prefixAdmin
app.use(express.static(`${__dirname}/public`))

route(app)
routeAdmin(app)
app.listen(port, ()=>{
    console.log(`Đã chạy trên cổng ${port}`)
})