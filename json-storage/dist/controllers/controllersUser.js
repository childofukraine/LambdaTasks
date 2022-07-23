"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRes = exports.createReq = void 0;
const modelsUser_1 = require("../models/modelsUser");
let USERINFO = [];
const createReq = (req, res, next) => {
    const info = req.body;
    const newReq = new modelsUser_1.UserInfo(info);
    USERINFO.push(newReq);
    res.status(201).json({ message: 'Created response.', yourResponse: newReq });
};
exports.createReq = createReq;
const getRes = (req, res, next) => {
    res.json({ response: USERINFO });
    USERINFO = [];
};
exports.getRes = getRes;
