const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const passport = require('passport')
const path = require('path')



const app = express()


app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(passport.initialize())
require('./passport')(passport)



app.use('/api/users', require('./router/userRoute'))
app.use('/api/transactions', require('./router/transactionRoute'))


if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

app.get('/', (req, res) => {
    res.json({
        message: 'Wellcome to our Application'
    })
})


const PORT = process.env.PORT || 4000


//Database for online Mongodb

mongoose.connect(`mongodb+srv://${process.env.dbUsername}:${process.env.dbPassword}@test-project-vdjiz.gcp.mongodb.net/moneyManagementApp?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Database Connected')
        app.listen(PORT, () => {
            console.log((`server is running on PORT ${PORT}`))
        })

    })
    .catch(e => {
        return console.log(e)
    })
