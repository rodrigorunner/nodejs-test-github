if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const PORT = process.env.PORT || 8000
const userRoute = require('./route/userRoute')
const petRoute = require('./route/petRoute')
const petById = require('./route/petById')
const cors = require('cors')
const ejs = require('ejs')
const path = require('path')
const AppError = require('./utils/AppError')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use('/users', userRoute)
app.use('/pet', petRoute)
app.use('/pet/edit', petById)

app.all('*', (req, res, next) => {
    next(new AppError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
    const { status = 500 } = err 
    if(!err.message) err.message = 'Something went wrong.'
    res.status(status).render('error', { err })
})

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))