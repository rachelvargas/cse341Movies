const { check } = require('express-validator');
 
exports.movieValidation = [
    check('director', 'Name of the director is requied').not().isEmpty(),
    check('yearRelease', 'Release year must be 4 digits').isLength({ max: 4 })
]
 
exports.directorValidation = [
    check('username', 'Name of the director is requied').not().isEmpty(),
    check('password', 'Password must be 6 or more characters').isLength({ min: 6 })
     
    
]

/**const { check } = require('express-validator');
 
exports.signupValidation = [
    check('name', 'Name is requied').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail().normalizeEmail({ gmail_remove_dots: true }),
    check('password', 'Password must be 6 or more characters').isLength({ min: 6 })
]
 
exports.loginValidation = [
     check('email', 'Please include a valid email').isEmail().normalizeEmail({ gmail_remove_dots: true }),
     check('password', 'Password must be 6 or more characters').isLength({ min: 6 })
 
] */