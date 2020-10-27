const { check } = require('express-validator')
module.exports.validatorCategory = () => {
  return [
    check('name', 'Category is required').not().isEmpty(),
    check('name', 'name is at least 3 digits and max 32 digits').isLength({
      min: 3,
      max: 32,
    }),
  ]
}
module.exports.validatorSubCategory = () => {
  return [
    check('name', 'Sub category is required').not().isEmpty(),
    check('name', 'name is at least 3 digits and max 32 digits').isLength({
      min: 3,
      max: 32,
    }),
  ]
}
