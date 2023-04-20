"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const catalog_1 = require("./catalog");
const errorHandler = (err, _req, res, 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
_next) => {
    if (err instanceof zod_1.ZodError) {
        const { message } = err.issues[0];
        return res.status(400).json({ message });
    }
    const messageAsErrorType = err.message;
    const mappedError = catalog_1.errorCatalog[messageAsErrorType];
    if (mappedError) {
        const { httpStatus, message } = mappedError;
        return res.status(httpStatus).json({ error: message });
    }
    const { message } = err;
    const noMessage = message || 'Internal Error';
    if (err.status) {
        const { status } = err;
        return res.status(status).json({ message: noMessage });
    }
    const status = 500;
    return res.status(status).json({ message: noMessage });
};
exports.default = errorHandler;
