const { validationResult } = require('express-validator');

function validate(validations) {
  return async (req, res, next) => {
    await Promise.all(validations.map((v) => v.run(req)));
    const errors = validationResult(req);
    if (errors.isEmpty()) return next();
    const first = errors.array()[0];
    return res.status(400).json({
      success: false,
      message: first.msg || 'Validation failed',
      statusCode: 400,
    });
  };
}

module.exports = { validate };
