const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const bodyParser = require("body-parser")
const app = express()
const adminRoute = require("./routes/adminRoute.js")
const complainRoute = require("./routes/complainRoute.js")
const noticeRoute = require("./routes/noticeRoute.js")
const sclassRoute = require("./routes/sclassRoute.js")
const studentRoute = require("./routes/studentRoute.js")
const subjectRoute = require("./routes/subjectRoute.js")
const teacherRoute = require("./routes/teacherRoute.js")

const PORT = process.env.PORT || 5000

dotenv.config();

app.use(bodyParser.json({extended: true }))
app.use(bodyParser.urlencoded({extended: true }))
app.use(express.json())
app.use(cors())

mongoose
    .connect(process.env.MONGO_URL, {})
    .then(console.log("Connected to MongoDB"))
    .catch((err) => console.log("NOT CONNECTED TO NETWORK", err))

app.get('/',(req,res)=>{
    res.send(`API is running...`)
});
app.use('/Admin', adminRoute);
app.use('/Complain', complainRoute);
app.use('/Notice', noticeRoute);
app.use('/Sclass', sclassRoute);
app.use('/Student', studentRoute);
app.use('/Subject', subjectRoute);
app.use('/Teacher', teacherRoute);

app.listen(PORT, () => {
    console.log(`Server started at port no. ${PORT}`)
})