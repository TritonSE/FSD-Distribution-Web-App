const { validationResult } = require('express-validator');

const isValidated = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
}

module.exports = { isValidated };