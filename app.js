const createError = require("http-errors")
const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const logger = require("morgan")
const nconf = require("nconf")
const path = require("path")
const app = express()
const swaggerUi = require("swagger-ui-express")
const swaggerDocument = require("./swagger.json")

nconf.argv().env("__")
nconf.defaults({ conf: `${__dirname}/config.json` })
nconf.file(nconf.get("conf"))

app.use(cors())
app.use(logger("dev"))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static("public"))

app.use("/swagger/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
require("./app/routes/search.js")(app, nconf.get("es"))
// require('./app/routes/bundle.js')(app, nconf.get('es'))

// Serve any static files
app.use(express.static(path.join(__dirname, "client/build")))

// Handle React routing, return all requests to React app
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "client/build", "index.html"))
})


// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404))
})

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get("env") === "development" ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render("error")
})

module.exports = app
