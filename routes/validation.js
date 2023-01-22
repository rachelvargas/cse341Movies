const { check } = require('express-validator');
 
exports.movieValidation = [
    check('director', 'Name of the director is requied').not().isEmpty(),
    check('yearRelease', 'Release year must be 4 digits').isLength({ max: 4 })
]
 
/*exports.directorValidation = [
    check('name', 'Name of the director is requied').not().isEmpty(),     
    check('nationality', 'nationality must 12 or less characters').isLength({ max: 12 })
 
]*/