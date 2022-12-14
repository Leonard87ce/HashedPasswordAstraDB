const PORT = 8000
require('dotenv').config()
const express = require('express')
const axios = require ('axios')
const cors = require('cors')
const {v4: uuidv4} = require('uuid')
const bcrypt = require('bcrypt')
const path = require('path')

const app = express()
app.use(express.json())
app.use(cors())





app.post('/signup', async (req, res) =>{
    const { userName, password } = req.body
    console.log(userName)
    console.log(password)

    const userId = uuidv4()
    const hashedPassword = await bcrypt.hash(password, 10)

    /* To check if hash pass is equal to  the password the user entered in the form
    const success = await bcrypt.compare("password", "hashedPassword")    -----> keep the "" just replace with the pass and has from db
    
    console.log('is sucess?', success);*/

    const options = {
        method: "POST",
        headers: {
            Accepts: "application/json",
            "X-Cassandra-Token": process.env.ASTRA_TOKEN,
            "Content-Type": "application/json"
        },
        data: {userName, userId, hashedPassword}
    }

    try {
        const response = await axios(process.env.ASTRA_URL, options)
        res.status(200).json(response.data)
    } catch (err) { 
        console.log(err)
        res.status(500).json({message: err})
    }

})
app.get('*', (req, res) =>{
    res.sendFile(path.resolver(__dirname, "build", "index.html"))
})

app.listen(PORT, () => console.log("Server is running in port: " + PORT))