"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorCatalog = exports.ErrorTypes = void 0;
var ErrorTypes;
(function (ErrorTypes) {
    ErrorTypes["EntityNotFound"] = "EntityNotFound";
    ErrorTypes["InvalidMongoId"] = "InvalidMongoId";
    ErrorTypes["uAlreadyHaveIt"] = "uAlreadyHaveIt";
})(ErrorTypes = exports.ErrorTypes || (exports.ErrorTypes = {}));
exports.errorCatalog = {
    EntityNotFound: {
        message: 'Object not found',
        httpStatus: 404,
    },
    InvalidMongoId: {
        message: 'Id must have 24 hexadecimal characters',
        httpStatus: 400,
    },
    uAlreadyHaveIt: {
        message: 'You already have this disc',
        httpStatus: 409,
    },
};
