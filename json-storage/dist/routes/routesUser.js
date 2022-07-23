"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllersUser_1 = require("../controllers/controllersUser");
const router = (0, express_1.Router)();
router.post('/*[A-Za-z0-9_]', controllersUser_1.createReq);
router.get('/*[A-Za-z0-9_]', controllersUser_1.getRes);
exports.default = router;
