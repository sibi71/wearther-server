const express = require("express")
const bodyParser = require("body-parser")

const app = express()
const http = require("https");

const port = process.env.PORT || 5000;

app.set("view engine","ejs")
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('public'))

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/html/index.html")
})
app.post("/",(req,res)=>{
    const city = req.body.cityname
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f3a419ab7ab02bcafdccf93381e74575`

    http.get(url,(response)=>{
        response.on("data",(data)=>{
            const weartherdata = JSON.parse(data)
           res.render("result",{
            name:weartherdata.name,
            temp:weartherdata.main.temp
           })
           console.log(weartherdata);
           
        })
    })
})

app.listen(port,()=>{
    console.log(`server is up and running on port ${port}`);
    
})
