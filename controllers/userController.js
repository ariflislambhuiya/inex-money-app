const registerValidator = require('../validator/registerValidator')
const loginValidator = require('../validator/loginValidator')
const { serverError, resourceError } = require('../utils/error')
const jwt = require('../node_modules/jsonwebtoken')
const User = require('../model/User')
const bcrypt = require('bcrypt')

module.exports = {

    login(req, res) {
        let { email, password } = req.body
        let validate = loginValidator({ email, password })

        if (!validate.isValid) {
            return res.status(400).json(validate.error)
        }

        User.findOne({ email })
            // Use Populate for transaction
            .then(user => {
                if (!user) {
                    return resourceError(res, 'User Not Found')
                }
                bcrypt.compare(password, user.password, (err, result) => {
                    if (err) {
                        return serverError(res, err)
                    }
                    if (!result) {
                        return resourceError(res, 'Password Doesn\'t Match')
                    }

                    let token = jwt.sign({
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        amount: user.amount,
                        income: user.income,
                        expense: user.expense,
                        transactions: user.transactions
                    }, 'SECRET', { expiresIn: '2h' })

                    res.status(200).json({
                        message: 'Login Successful',
                        token: `Bearer ${token}`
                    })

                })
            })
            .catch(error => serverError(res, error))

        // Generate Token and Response Back
    },

    register(req, res) {
        //Read user data
        let { name, email, password, confirmPassword } = req.body

        //Chack validate User Date with Custom validator
        let validate = registerValidator({ name, email, password, confirmPassword })

        if (!validate.isValid) {
            return res.status(400).json(validate.error)
        }

        else {
            User.findOne({ email })
                .then(user => {
                    if (user) {
                        return res.status(500).json({
                            message: 'Email Alrady exit'
                        })
                    }


                    bcrypt.hash(password, 11, (err, hash) => {
                        if (err) {
                            return res.status(500).json({
                                message: 'Server Error Occourd'
                            })
                        }
                        let user = new User({
                            name,
                            email,
                            password: hash,
                            balance: 0,
                            expense: 0,
                            income: 0,
                            transactions: []
                        })
                        user.save()
                            .then(user => {
                                res.status(201).json({
                                    message: 'Data create successfull',
                                    user
                                })

                            })
                            .catch(error => {
                                console.log(error)
                                res.status().json({
                                    message: 'Sever Error Occourd'
                                })
                            })
                    })
                })
                .catch(error => {
                    console.log(error)
                    res.status().json({
                        message: 'Sever Error Occourd'
                    })
                })

        }


    },
    allUser(req, res) {
        User.find()
            .then(users => {
                res.status(200).json(users)
            })
            .catch(error => serverError(res, error))
    }
}

//check for duplicate data
// create new user object 
// save data to databese
//response back with new data




