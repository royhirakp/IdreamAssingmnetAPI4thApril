
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
require('dotenv/config');
const app = express();
app.use(express.json())
app.use(cors())
mongoose.set('strictQuery', false);

// //conected to database
// console.log('>>>',process.env.MongoUrl)
async function conntectDtabase(){
    try {
        await mongoose.connect(process.env.MongoUrl);
        console.log('DatabaseConnected!')
    } catch (error) {
        console.log(error)
    }
}
conntectDtabase()
//************************************** */

// app.use(express.urlencoded())
//ROUTES
const imageRoute = require('./src/routes/ImageRoute')
// const UserRoute = require("./src/routes/UserRoute");
// const RecipiRoute = require("./src/routes/RecipiRoute")
// const teokenvalidation = require("./src/medelware/Tokenvarification")

app.get("/",(req,res)=>{
    res.json({
        status:"working.............................."
    })
})
app.use("/image",imageRoute);
// app.use("/reci",teokenvalidation,RecipiRoute);

app.use('*',(req,res)=>{
    res.status(404).json({
        status:"worong url! 404 not found"
    })
});

app.listen(process.env.port, () => {
    console.log(`server runging.... at:${process.env.port}`)
  })