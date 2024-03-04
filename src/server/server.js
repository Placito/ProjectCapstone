const express = require("express")
const app = express();
const cors = require("cors");

//read the json files coming to you
app.use(express.json())
app.use(express.static('dist'))

//require dotenv
require("dotenv").config()

//get the city function which get location from geoNames
const  {getCityLocation} = require("./getCityLoc")
const {getWeather} = require("./getTheWeather")
const {getCityPic} = require("./getCityPic")

//using cors
app.use(cors())

port = 8081

const username = process.env.USERNAME
const weather_key = process.env.WEATHER_KEY
const pixabay_key = process.env.PIXABAY_KEY


app.get("/", (req, res) => {
  res.render("index.html")
})

app.post("/getCity", async (req,res) => {
    const { city } = req.body;
    const Location = await getCityLocation(city, username)
    return res.send(Location)
   
})

app.post("/getWeather", async (req,res) => {
   const {lng, lat, remainingDays} = req.body
   const Weather = await getWeather(lng, lat, remainingDays, weather_key)
   return res.send(Weather)
})

app.post("/getCityPic", async (req,res) => {
  const {name} = req.body
  const picture = await getCityPic(name, pixabay_key)
  return res.send(picture)
})

app.listen(port, () => console.log(`server is listening on port ${port}`))