const validator = require('validator')


const validate = user => {
    error = {}

    if (!user.name) {
        error.name = 'Plese Provide Your Name'
    }

    if (!user.email) {
        error.email = 'Please Provide Your Email'
    } else if (!validator.isEmail(user.email)) {
        error.email = 'Please Provide a valid Email'
    }

    if (!user.password) {
        error.password = 'Please provide a password'
    } else if (user.password.length < 6) {
        error.password = 'password must be greater or equal six Character'
    }

    if (!user.confirmPassword) {
        error.confirmPassword = 'Please provide your comfirmPassword'
    } else if (user.password !== user.confirmPassword) {
        error.confirmPassword = 'password Doesn\'t match'
    }
    return {
        error,
        isValid: Object.keys(error).length === 0
    }
}
module.exports = validate
