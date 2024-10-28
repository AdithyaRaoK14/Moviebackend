"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleInputError = void 0;
var express_validator_1 = require("express-validator");
var handleInputError = function (req, res, next) {
    var errors = (0, express_validator_1.validationResult)(req);
    console.log("errors: ", errors);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() }).end();
    }
    next();
};
exports.handleInputError = handleInputError;
//# sourceMappingURL=middlewares.js.map