const validator = require('validator')


const validate = user => {
    error = {}

    if (!user.email) {
        error.email = 'Please Provide Your Email'
    } else if (!validator.isEmail(user.email)) {
        error.email = 'Please Provide a valid Email'
    }

    if (!user.password) {
        error.password = 'Please provide a password'
    }


    return {
        error,
        isValid: Object.keys(error).length === 0
    }
}



module.exports = validate
